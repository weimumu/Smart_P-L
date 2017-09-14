const assert = require('assert');
const ax = require('../../lib').axios;
const {genUser, login} = require('../../lib');
const {mongo: {User, Bond}} = require('../../../lib');
const {users} = require('../../dataset');

const userA = {
  email: users[0].userEmail,
  password: users[0].userPass,
  comName: users[0].comName
};

describe('#BondTrade', () => {
  before(async () => {
    await Promise.all([
      User.remove({}),
      Bond.remove({})
    ]);
    await Promise.all(
        users.map(u => ax.post('/user', genUser(u)))
      );
    await login(userA);
  });

  after(async () => {
    await Promise.all([
      User.remove({}),
      Bond.remove({})
    ]);
  });

  describe('#sell bond', () => {
    it('ok', async () => {
      await Promise.all([
        ax.post('/bondtrade/sell', {
          'company_lend': 'ali'
        }),
        ax.post('/bondtrade/sell', {
          'company_lend': 'tencent'
        })
      ]);
    });
  });

  describe('#get list', () => {
    it('ok', async () => {
      const {data} = await ax.get('/bondtrade/all?page=0&size=100');
      assert(data.length === 2, 'incomplete list');
    });
  });
});
