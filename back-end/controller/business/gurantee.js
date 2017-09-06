const _ = require('lodash');
const {assert, mongo: {GuranteeSeek, GuranteeOffer, GuranteeTransaction, Message, User, TimelineItem}} = require('../../lib');
const {ObjectId} = require('mongoose').Types;
const {fields} = require('../../config');

exports.seek = async (req, res) => {
  //  1. 生成借款实例、加到自己的业务消息
  //  2. 朋友圈推送
  const data = _.pick(
    req.body,
    ['city', 'project', 'cost', 'amount_gurantee', 'rate_gurantee', 'loan_ddl', 'reason', 'other_detail']
  );
  data.from = res.locals.user._id;
  const seekInstance = new GuranteeSeek(data);
  assert(!(seekInstance.validateSync() instanceof Error), 'invalid data');
  const timelineItem = new TimelineItem({
    from: res.locals.user._id,
    type: 'GuranteeSeek',
    info: {
      seekId: seekInstance._id
    }
  });
  const message = new Message({
    type: 'Publish-GuranteeSeek',
    info: {
      seekId: seekInstance._id
    }
  });
  await Promise.all([
    seekInstance.save(),
    res.locals.user.addTimeline(timelineItem),
    message.save(),
    res.locals.user.addMessage(message)
  ]);

  res.json(seekInstance._id);
};

exports.getSeek = async (req, res) => {
  const {id} = req.query;
  assert(id, 'seek-id required');
  assert(ObjectId.isValid(id), 'invalid id');
  const seekInstance = await GuranteeSeek
    .findById(id)
    .populate({
      path: 'from',
      select: fields.stranger
    });
  assert(seekInstance, 'seek-instance not exist');

  res.json(seekInstance);
};

exports.getOffer = async (req, res) => {
  const {id} = req.query;
  assert(id, 'offer-id required');
  assert(ObjectId.isValid(id), 'invalid id');
  const offerInstance = await GuranteeOffer
    .findById(id)
    .populate({
      path: 'from',
      select: fields.stranger
    });
  assert(offerInstance, 'offer-instance not exist');

  res.json(offerInstance);
};

exports.offer = async (req, res) => {
  //  1. 生成放款实例、加到自己的业务消息
  //  2. 朋友圈推送
  const data = _.pick(
    req.body,
    ['amount_gurantee', 'loan_ddl', 'min_rate']
  );
  data.from = res.locals.user._id;
  const offerInstance = new GuranteeOffer(data);
  assert(!(offerInstance.validateSync() instanceof Error), 'invalid data');
  const message = new Message({
    type: 'Publish-GuranteeOffer',
    info: {
      offerId: offerInstance._id
    }
  });
  await Promise.all([
    offerInstance.save(),
    message.save(),
    res.locals.user.addMessage(message)
  ]);

  res.json(offerInstance._id);
};

exports.getMySeek = async (req, res) => {
  const result = await GuranteeSeek.find({from: res.locals.user});
  res.json(result);
};

exports.getMyOffer = async (req, res) => {
  const result = await GuranteeOffer.find({from: res.locals.user});
  res.json(result);
};

exports.getRecommendSingle = async (req, res) => {
  // 根据借款实例id返回推荐的借款活动
  const {id} = req.query;
  assert(id, 'borrow-id required');
  assert(ObjectId.isValid(id), 'invalid id');
  const seekInstance = await GuranteeSeek.findById(id);
  assert(seekInstance, 'borrow-instance not exist');
  const result = await GuranteeOffer
    .find({
      'loan_ddl': {
        $gte: seekInstance.loan_ddl
      },
      'amount_gurantee': {
        $gte: seekInstance.amount_gurantee
      },
      from: { // exclude those from yourself
        $ne: res.locals.user._id
      }
    })
    .sort('-amount_gurantee')
    .limit(3); // only return top three
  res.json(result);
};

exports.getRecommendMulti = async (req, res) => {
  // 根据借款实例id返回推荐的借款活动
  const {id} = req.query;
  assert(id, 'borrow-id required');
  assert(ObjectId.isValid(id), 'invalid id');
  const seekInstance = await GuranteeSeek.findById(id);
  assert(seekInstance, 'borrow-instance not exist');

  const result = await GuranteeOffer
    .find({
      'loan_ddl': {
        $gte: seekInstance.loan_ddl
      },
      from: { // exclude those from yourself
        $ne: res.locals.user._id
      }
    })
    .sort('-amount_gurantee')
    .limit(3); // only return top three
  res.json(result);
};

exports.getRelatedMessages = async (req, res) => {
  const result = await User.findById(res.locals.user._id).populate({
    path: 'messages',
    match: {
      type: /^Gurantee|^Publish-Gurantee/
    },
    populate: {
      path: 'info.transactionId',
      model: 'GuranteeTransaction'
    }
  });
  const messages = result.toObject().messages;
  messages.forEach(m => {
    m.info.transaction = m.info.transactionId;
    delete m.info.transactionId;
  });
  res.json(messages);
};

exports.request = async (req, res) => {
  //   1. 向一个放款实例发出申请
  //     * 生成事务实例
  //     * 双方发消息
  const {seekId, offerId} = req.body;
  assert(seekId, 'seek-id required');
  assert(ObjectId.isValid(seekId), 'invalid seek-id');
  const seekInstance = await GuranteeSeek.findById(seekId);
  assert(seekInstance, 'seek-instance not exist');

  assert(offerId, 'offer-id required');
  assert(ObjectId.isValid(offerId), 'invalid offer-id');
  const offerInstance = await GuranteeOffer.findById(offerId);
  assert(offerInstance, 'offer-instance not exist');

  assert(seekInstance.from.toString() !== offerInstance.from.toString(), `self request`);

  const transaction = new GuranteeTransaction({
    from: res.locals.user._id,
    offer: offerInstance._id,
    seek: seekInstance._id
  });
  const message = new Message({
    type: 'GuranteeRequest-Received',
    from: res.locals.user._id,
    info: {
      transactionId: transaction._id
    }
  });
  const messageToSender = new Message({
    type: 'GuranteeRequest-Sent',
    info: {
      transactionId: transaction._id
    }
  });

  await Promise.all([
    transaction.save(),
    message.save(),
    messageToSender.save(),
    User.addMessage(offerInstance.from, message),
    res.locals.user.addMessage(messageToSender)
  ]);
  res.end('ok');
};

exports.acceptRequest = async (req, res) => {
  //   1. 接受一个事务申请，将事务推进一个阶段
  //     * 双方发消息

  // const {transactionId} = req.body;
  // assert(transactionId, 'transaction-id required');
  // assert(ObjectId.isValid(transactionId), 'invalid transaction-id');
  // const transaction = await LoanTransaction.findById(transactionId);
  // assert(transaction, 'transaction-instance not exist');
  // assert(transaction.status === 'Request', 'incorrect transaction status');

  const {messageId} = req.body;
  assert(messageId, 'message-id required');
  assert(ObjectId.isValid(messageId), 'invalid message-id');
  const message = await Message.findById(messageId);
  assert(message, 'message-instance not exist');
  assert(message.type === 'GuranteeRequest-Received', 'incorrect message type');

  const messageToSeeker = new Message({
    type: 'GuranteeRequest-Accepted',
    from: res.locals.user._id,
    info: {
      transactionId: message.info.transactionId
    }
  });

  await Promise.all([
    message.update({$set: {type: 'GuranteeRequest-Received&Accepted'}}),
    messageToSeeker.save(),
    GuranteeTransaction.update({_id: message.info.transactionId}, {$set: {status: 'Progressing'}}),
    User.addMessage(message.from, messageToSeeker)
  ]);

  res.end('ok');
};

exports.sendTransaction = async (req, res) => {
  //   发送合同信息
  const {messageId} = req.body;
  assert(messageId, 'message-id required');
  assert(ObjectId.isValid(messageId), 'invalid message-id');
  const message = await Message.findById(messageId);
  assert(message, 'message-instance not exist');
  assert(message.type === 'GuranteeRequest-Accepted', 'incorrect message type');

  const messageToOfferer = new Message({
    type: 'GuranteeContract-Received',
    from: res.locals.user._id,
    info: {
      transactionId: message.info.transactionId
    }
  });
  const messageToSeeker = new Message({
    type: 'GuranteeContract-Sent',
    info: {
      transactionId: message.info.transactionId
    }
  });

  await Promise.all([
    messageToOfferer.save(),
    User.addMessage(message.from, messageToOfferer),
    res.locals.user.addMessage(messageToSeeker)
  ]);

  res.end('ok');
};

exports.acceptTransaction = async (req, res) => {
  //   1. 接受一个交易实例
  //     * 双方发消息
  //     * 完成交易
  const {messageId} = req.body;
  assert(messageId, 'message-id required');
  assert(ObjectId.isValid(messageId), 'invalid message-id');
  const message = await Message.findById(messageId);
  assert(message, 'message-instance not exist');
  assert(message.type === 'GuranteeContract-Received', 'incorrect message type');

  const messageToSeeker = new Message({
    type: 'GuranteeContract-Accepted',
    from: res.locals.user._id,
    info: {
      transactionId: message.info.transactionId
    }
  });
  const completeMessage = new Message({
    type: 'Gurantee-Completed',
    info: {
      transactionId: message.info.transactionId
    }
  });

  await Promise.all([
    messageToSeeker.save(),
    completeMessage.save(),
    User.addMessage(message.from, completeMessage, messageToSeeker),
    res.locals.user.addMessage(completeMessage),
    message.update({$set: {type: 'GuranteeContract-Received&Accepted'}}),
    GuranteeTransaction.update({_id: message.info.transactionId}, {
      $set: {status: 'Completed'}
    })
  ]);

  res.end('ok');
};
