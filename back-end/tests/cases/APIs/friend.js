const assert = require('assert');
const ax = require('../../lib').axios;
const {assertResError, genUser, login} = require('../../lib');
const {mongo: {User, FriendRequest, Message}} = require('../../../lib');
const {users} = require('../../dataset');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

describe('Friends', () => {
  before(async () => {
    await Promise.all([
      User.remove({}),
      FriendRequest.remove({}),
      Message.remove({})
    ]);
  });
  after(async () => {
    await Promise.all([
      User.remove({}),
      FriendRequest.remove({}),
      Message.remove({})
    ]);
  });

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

  describe('#newFriend', () => {
    before(async () => {
      await Promise.all(
        users.map(u => ax.post('/user', genUser(u)))
      );
      await login(userA);
      userA.id = (await ax.get(`/user/search?q=${userA.comName}`)).data._id;
      userB.id = (await ax.get(`/user/search?q=${userB.comName}`)).data._id;
      assert(ObjectId.isValid(userA.id), 'invalid id of user');
      assert(ObjectId.isValid(userB.id), 'invalid id of user');
    });

    it('friendlist before adding', async () => {
      const list = (await ax.get('/friend/list')).data;
      assert(list instanceof Array && list.length === 0, 'invalid initial friendlist');
    });

    describe('#reject', () => {
      describe('#A request B', () => {
        it('ok', async () => {
          await ax.post(`/friend/request?to=${userB.id}`);
        });

        it('no duplicate request', async () => {
          await assertResError(
            ax.post(`/friend/request?to=${userB.id}`),
            /no duplicate request/
          );
        });
      });

      describe('#B reject request', () => {
        let msg;
        it('B got message', async () => {
          await login(userB);
          const {data} = await ax.get('/message/friend?size=5&page=0');
          const latest = data[0];
          assert(latest, 'missing msg');
          assert(latest.type === 'FriendRequest-Received', 'incorrect msg type');
          msg = latest;
        });

        it('accept', async () => {
          await ax.post(`/friend/refuse/${msg._id}`);
        });
      });

      describe('#result', () => {
        describe('#A side', () => {
          before(async () => {
            await login(userA);
          });

          it('got message', async () => {
            const {data} = await ax.get('/message/friend?size=5&page=0');
            const latest = data[0];
            assert(latest, 'missing msg');
            assert(latest.type === 'FriendRequest-Refused', 'incorrect msg type');
          });

          it('B not in friendlist', async () => {
            const list = (await ax.get('/friend/list')).data;
            assert(list.length === 0, 'found');
          });
        });

        describe('#B side', () => {
          before(async () => {
            await login(userB);
          });

          it('message mutated', async () => {
            const {data} = await ax.get('/message/friend?size=5&page=0');
            const msg = data[0];
            assert(msg, 'msg not found');
            assert(msg.type === 'FriendRequest-Received&Refused', 'incorrect msg type');
          });

          it('A not in friend list', async () => {
            const list = (await ax.get('/friend/list')).data;
            assert(list.length === 0, 'found');
          });
        });
      });
    });

    describe('#accept', () => {
      describe('#A request B', () => {
        before(async () => {
          await login(userA);
        });

        it('ok', async () => {
          await ax.post(`/friend/request?to=${userB.id}`);
        });

        it('no duplicate request', async () => {
          await assertResError(
            ax.post(`/friend/request?to=${userB.id}`),
            /no duplicate request/
          );
        });
      });

      describe('#B accept request', () => {
        let msg;
        it('B got message', async () => {
          await login(userB);
          const {data} = await ax.get('/message/friend?size=5&page=0');
          const latest = data[0];
          assert(latest, 'missing msg');
          assert(latest.type === 'FriendRequest-Received', 'incorrect msg type');
          msg = latest;
        });

        it('accept', async () => {
          await ax.post(`/friend/accept/${msg._id}`);
        });
      });

      describe('#result', () => {
        describe('#A side', () => {
          before(async () => {
            await login(userA);
          });

          it('got message', async () => {
            const {data} = await ax.get('/message/friend?size=5&page=0');
            const latest = data[0];
            assert(latest, 'missing msg');
            assert(latest.type === 'FriendRequest-Accepted', 'incorrect msg type');
          });

          it('B in friendlist', async () => {
            const list = (await ax.get('/friend/list')).data;
            assert(list && list[0]._id === userB.id, 'not found');
          });
        });

        describe('#B side', () => {
          before(async () => {
            await login(userB);
          });

          it('message mutated', async () => {
            const {data} = await ax.get('/message/friend?size=5&page=0');
            const msg = data[0];
            assert(msg, 'msg not found');
            assert(msg.type === 'FriendRequest-Received&Accepted', 'incorrect msg type');
          });

          it('A in friend list', async () => {
            const list = (await ax.get('/friend/list')).data;
            assert(list && list[0]._id === userA.id, 'not found');
          });
        });
      });
    });
  });

  describe('#remove friend', () => {
    before(async () => {
      await login(userA);
    });

    it('friend info before remove', async () => {
      const {data} = await ax.get(`/user/${userB.id}`);
      assert(typeof data.comEmail === 'string', 'incomplete info of friend');
    });

    it('A remove B', async () => {
      await ax.delete(`/friend/${userB.id}`);
    });

    describe('#result', () => {
      it(`A not in B's list`, async () => {
        await login(userA);
        const list = (await ax.get('/friend/list')).data;
        assert(list.length === 0, 'error');
      });

      it(`B not in A's list`, async () => {
        await login(userB);
        const list = (await ax.get('/friend/list')).data;
        assert(list.length === 0, 'error');
      });

      it('friend info after remove', async () => {
        await login(userA);
        const {data} = await ax.get(`/user/${userB.id}`);
        assert(data.comEmail === undefined, 'too much info for stranger');
      });
    });
  });
});
