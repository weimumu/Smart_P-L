const assert = require('assert');
const ax = require('../../lib').axios;
const {assertResError, genUser, login} = require('../../lib');
const {mongo: {User, GuranteeOffer, GuranteeSeek, GuranteeTransaction, Message}} = require('../../../lib');
const {users} = require('../../dataset');
const ObjectId = require('mongoose').Types.ObjectId;

const userA = {
  email: users[0].userEmail,
  password: users[0].userPass,
  comName: users[0].comName
};
const userB = {
  email: users[1].userEmail,
  password: users[1].userPass,
  comName: users[1].comName
};

describe('#Loan', () => {
  let seekId;
  let offerId;
  before(async () => {
    await Promise.all([
      User.remove({}),
      GuranteeTransaction.remove({}),
      GuranteeOffer.remove({}),
      GuranteeSeek.remove({}),
      Message.remove({})
    ]);
    await Promise.all(
      users.map(u => ax.post('/user', genUser(u)))
    );
  });
  after(async () => {
    await Promise.all([
      User.remove({}),
      GuranteeTransaction.remove({}),
      GuranteeOffer.remove({}),
      GuranteeSeek.remove({}),
      Message.remove({})
    ]);
  });

  describe('#standard procedure', () => {
    describe('#A publish Offer', () => {
      before(async () => {
        await login(userA);
      });

      it('ok', async () => {
        const {data} = await ax.post('/gurantee/offer', {
          'amount_gurantee': 300,
          'loan_ddl': 12,
          'min_rate': 0.3
        });
        assert(ObjectId.isValid(data), 'invalid ObjectId returned');
        offerId = data;
      });

      it('invalid data', async () => {
        await assertResError(
          ax.post('/gurantee/offer', {
            a: 1
          }),
          /invalid data/
        );
      });
    });

    describe('#B publish Seek', () => {
      before(async () => {
        await login(userB);
      });

      it('ok', async () => {
        const {data} = await ax.post('/gurantee/seek', {
          'city': '广州',
          'project': 'smart',
          'cost': 12,
          'amount_gurantee': 30,
          'rate_gurantee': 0.7,
          'loan_ddl': 5,
          'reason': 'no reason',
          'other_detail': '???'
        });
        assert(ObjectId.isValid(data), 'invalid ObjectId returned');
        seekId = data;
      });

      it('invalid data', async () => {
        await assertResError(
          ax.post('/gurantee/seek', {
            a: 1
          }),
          /invalid data/
        );
      });
    });

    describe('#get lists', () => {
      it('get my offer list', async () => {
        await login(userA);
        const {data} = await ax.get('/gurantee/offer');
        assert(data.length === 1 && ObjectId.isValid(data[0]._id), 'invalid data');
      });

      it('get my offer list', async () => {
        await login(userB);
        const {data} = await ax.get('/gurantee/seek');
        assert(data.length === 1 && ObjectId.isValid(data[0]._id), 'invalid data');
      });
    });

    describe('#get detail', () => {
      describe('#offer', () => {
        it('ok', async () => {
          await login(userA);
          const list = (await ax.get('/gurantee/offer')).data;
          const id = list[0]._id;
          const {data} = await ax.get(`/gurantee/detail/offer?id=${id}`);
          assert(data, 'no detail returned');
          assert(data.from && ObjectId.isValid(data.from._id), 'no user data');
        });

        it('not ok', async () => {
          await assertResError(
            ax.get(`/gurantee/detail/offer?id=233asd`),
            /invalid id/
          );
        });
      });

      describe('#offer', () => {
        it('ok', async () => {
          await login(userB);
          const list = (await ax.get('/gurantee/seek')).data;
          const id = list[0]._id;
          const {data} = await ax.get(`/gurantee/detail/seek?id=${id}`);
          assert(data, 'no detail returned');
          assert(data.from && ObjectId.isValid(data.from._id), 'no user data');
        });

        it('not ok', async () => {
          await assertResError(
            ax.get(`/gurantee/detail/seek?id=233asd`),
            /invalid id/
          );
        });
      });
    });

    describe('#get recommended', () => {
      before(async () => {
        await login(userB);
      });

      it('ok', async () => {
        const {data} = await ax.get(`/gurantee/recommend/single?id=${seekId}`);
        assert(data, 'no recommend');
      });
    });

    describe('#B request', () => {
      it('ok', async () => {
        await login(userB);
        await ax.post('/gurantee/request', {
          seekId, offerId
        });
      });

      it('receive message', async () => {
        const messages = (await ax.get('/gurantee/messages')).data;
        assert(messages[0].type === 'GuranteeRequest-Sent', 'incorrect message');
      });
    });

    describe('#A accept', () => {
      before(() => login(userA));

      it('ok', async () => {
        const messages = (await ax.get('/gurantee/messages')).data;
        assert(messages[0].type === 'GuranteeRequest-Received', 'incorrect message');
        await ax.post('/gurantee/accept-request', {messageId: messages[0]._id});
      });

      it('message mutated', async () => {
        const messages = (await ax.get('/gurantee/messages')).data;
        assert(messages[0].type === 'GuranteeRequest-Received&Accepted', 'incorrect message');
      });
    });

    describe('#B send contract', () => {
      let messageId;
      before(() => login(userB));

      it('get message', async () => {
        const messages = (await ax.get('/gurantee/messages')).data;
        assert(messages[0].type === 'GuranteeRequest-Accepted', 'incorrect message');
        messageId = messages[0]._id;
      });

      it('ok', async () => {
        await ax.post('/gurantee/transaction', {messageId});
      });

      it('get message after posting', async () => {
        const messages = (await ax.get('/gurantee/messages')).data;
        assert(messages[0].type === 'GuranteeContract-Sent', 'incorrect message');
      });
    });

    describe('#A accept contract', () => {
      let messageId;
      before(() => login(userA));

      it('get message', async () => {
        const messages = (await ax.get('/gurantee/messages')).data;
        assert(messages[0].type === 'GuranteeContract-Received', 'incorrect message');
        messageId = messages[0]._id;
      });

      it('ok', async () => {
        await ax.post('/gurantee/accept-transaction', {messageId});
      });

      it('message mutated', async () => {
        const messages = (await ax.get('/gurantee/messages')).data;
        assert(messages[1].type === 'GuranteeContract-Received&Accepted', 'incorrect message');
      });
    });

    describe('#seek completed', () => {
      it('A got message', async () => {
        await login(userA);
        const messages = (await ax.get('/gurantee/messages')).data;
        assert(messages[0].type === 'Gurantee-Completed', 'incorrect message');
      });

      it('B got message', async () => {
        await login(userB);
        const messages = (await ax.get('/gurantee/messages')).data;
        assert(messages[0].type === 'Gurantee-Completed', 'incorrect message');
      });
    });
  });
});
