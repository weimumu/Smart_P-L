const assert = require('assert');
const ax = require('../../lib').axios;
const {assertResError, genUser, login} = require('../../lib');
const {mongo: {User}} = require('../../../lib');
const {users} = require('../../dataset');
const ObjectId = require('mongoose').Types.ObjectId;

describe('Users', () => {
  before(async () => {
    await User.remove({});
  });
  after(async () => {
    await User.remove({});
  });

  describe('#regist', () => {
    it('validate error', async () => {
      await assertResError(
        ax.post('/user', {
          name: '1'
        }),
        /validate error/
      );
    });

    it('should work', async () => {
      await Promise.all(
        users.map(u => ax.post('/user', genUser(u)))
      );
    });
  });

  describe('#login', () => {
    it('incorrect pw', async () => {
      await assertResError(
        login({
          email: '3333',
          password: 'incorrect'
        }),
        /login failed/
      );
    });

    it('ok', async () => {
      await login({
        email: '1',
        password: 'pw'
      });
    });

    it('got cookies', async () => {
      await login({
        email: '1',
        password: 'pw'
      });
      const {data} = await ax.get('/user/self');
      assert(data, 'self data missing');
      assert(ObjectId.isValid(data._id), 'invalid id prop');
    });
  });

  describe('#search', () => {
    it('found', async () => {
      const {data} = await ax.get(`/user/search?q=1`);
      assert(data, 'user not found');
    });

    it('not found', async () => {
      const {data} = await ax.get(`/user/search?q=腾讯`);
      assert(!data, 'user found');
    });
  });
});
