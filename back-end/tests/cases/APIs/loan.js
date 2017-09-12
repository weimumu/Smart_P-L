const assert = require('assert');
const ax = require('../../lib').axios;
const {assertResError, genUser, login} = require('../../lib');
const {mongo: {User, Lend, Borrow, LoanTransaction, Message}} = require('../../../lib');
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
  let borrowId;
  let lendId;
  before(async () => {
    await Promise.all([
      User.remove({}),
      LoanTransaction.remove({}),
      Lend.remove({}),
      Borrow.remove({}),
      Message.remove({})
    ]);
    await Promise.all(
      users.map(u => ax.post('/user', genUser(u)))
    );
  });
  after(async () => {
    await Promise.all([
      User.remove({}),
      LoanTransaction.remove({}),
      Lend.remove({}),
      Borrow.remove({}),
      Message.remove({})
    ]);
  });

  describe('#standard procedure', () => {
    describe('#A publish Lend', () => {
      before(async () => {
        await login(userA);
      });

      it('ok', async () => {
        const {data} = await ax.post('/loan/lend', {
          'loan_ddl': 12,
          'max_amount': 344
        });
        assert(ObjectId.isValid(data), 'invalid ObjectId returned');
        lendId = data;
      });

      it('invalid data', async () => {
        await assertResError(
          ax.post('/loan/lend', {
            a: 1
          }),
          /invalid data/
        );
      });
    });

    describe('#B publish Borrow', () => {
      before(async () => {
        await login(userB);
      });

      it('ok', async () => {
        const {data} = await ax.post('/loan/borrow', {
          'city': '广州',
          'project': 'smart_PL',
          'max_amount': 20,
          'reason': '吃喝嫖赌',
          'max_rate': 4.3,
          'loan_ddl': 6,
          'other_detail': '我要钱'
        });
        assert(ObjectId.isValid(data), 'invalid ObjectId returned');
        borrowId = data;
      });

      it('invalid data', async () => {
        await assertResError(
          ax.post('/loan/borrow', {
            a: 1
          }),
          /invalid data/
        );
      });
    });

    describe('#get lists', () => {
      it('get my lend list', async () => {
        await login(userA);
        const {data} = await ax.get('/loan/lend');
        assert(data.length === 1 && ObjectId.isValid(data[0]._id), 'invalid data');
      });

      it('get my lend list', async () => {
        await login(userB);
        const {data} = await ax.get('/loan/borrow');
        assert(data.length === 1 && ObjectId.isValid(data[0]._id), 'invalid data');
      });
    });

    describe('#get detail', () => {
      describe('#lend', () => {
        it('ok', async () => {
          await login(userA);
          const list = (await ax.get('/loan/lend')).data;
          const id = list[0]._id;
          const {data} = await ax.get(`/loan/detail/lend?id=${id}`);
          assert(data, 'no detail returned');
          assert(data.from && ObjectId.isValid(data.from._id), 'no user data');
        });

        it('not ok', async () => {
          await assertResError(
            ax.get(`/loan/detail/lend?id=233asd`),
            /invalid id/
          );
        });
      });

      describe('#lend', () => {
        it('ok', async () => {
          await login(userB);
          const list = (await ax.get('/loan/borrow')).data;
          const id = list[0]._id;
          const {data} = await ax.get(`/loan/detail/borrow?id=${id}`);
          assert(data, 'no detail returned');
          assert(data.from && ObjectId.isValid(data.from._id), 'no user data');
        });

        it('not ok', async () => {
          await assertResError(
            ax.get(`/loan/detail/borrow?id=233asd`),
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
        const {data} = await ax.get(`/loan/recommend?id=${borrowId}`);
        assert(data, 'no recommend');
      });
    });

    describe('#B request', () => {
      it('ok', async () => {
        await login(userB);
        await ax.post('/loan/request', {
          borrowId, lendId
        });
      });

      it('receive message', async () => {
        const messages = (await ax.get('/loan/messages')).data;
        assert(messages[0].type === 'BorrowRequest-Sent', 'incorrect message');
      });
    });

    describe('#A accept', () => {
      before(() => login(userA));

      it('ok', async () => {
        const messages = (await ax.get('/loan/messages')).data;
        assert(messages[0].type === 'BorrowRequest-Received', 'incorrect message');
        await ax.post('/loan/accept-request', {messageId: messages[0]._id});
      });

      it('message mutated', async () => {
        const messages = (await ax.get('/loan/messages')).data;
        assert(messages[0].type === 'BorrowRequest-Received&Accepted', 'incorrect message');
      });
    });

    describe('#B send contract', () => {
      let messageId;
      before(() => login(userB));

      it('get message', async () => {
        const messages = (await ax.get('/loan/messages')).data;
        assert(messages[0].type === 'BorrowRequest-Accepted', 'incorrect message');
        messageId = messages[0]._id;
      });

      it('ok', async () => {
        await ax.post('/loan/transaction', {messageId});
      });

      it('get message after posting', async () => {
        const messages = (await ax.get('/loan/messages')).data;
        assert(messages[0].type === 'BorrowContract-Sent', 'incorrect message');
      });
    });

    describe('#A accept contract', () => {
      let messageId;
      before(() => login(userA));

      it('get message', async () => {
        const messages = (await ax.get('/loan/messages')).data;
        assert(messages[0].type === 'BorrowContract-Received', 'incorrect message');
        messageId = messages[0]._id;
      });

      it('ok', async () => {
        await ax.post('/loan/accept-transaction', {messageId});
      });

      it('message mutated', async () => {
        const messages = (await ax.get('/loan/messages')).data;
        assert(messages[1].type === 'BorrowContract-Received&Accepted', 'incorrect message');
      });
    });

    describe('#borrow completed', () => {
      it('A got message', async () => {
        await login(userA);
        const messages = (await ax.get('/loan/messages')).data;
        assert(messages[0].type === 'Borrow-Completed', 'incorrect message');
      });

      it('B got message', async () => {
        await login(userB);
        const messages = (await ax.get('/loan/messages')).data;
        assert(messages[0].type === 'Borrow-Completed', 'incorrect message');
      });
    });
  });
});
