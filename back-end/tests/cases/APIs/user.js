const assert = require('assert');
const ax = require('../../lib').axios;
const {assertResError} = require('../../lib');
const {mongo: {User}} = require('../../../lib');
const ObjectId = require('mongoose').Types.ObjectId;

describe('Users', () => {
  before(async () => {
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
        [
          ax.post('/user', genUser({userEmail: '1', userPass: 'pw', comName: '1'})),
          ax.post('/user', genUser({userEmail: '2', userPass: 'pw', comName: '2'})),
          ax.post('/user', genUser({userEmail: '3', userPass: 'pw', comName: '3'}))
        ]
      );
    });
  });

  describe('#login', () => {
    it('incorrect pw', async () => {
      await assertResError(
        ax.post('/user/login', {
          email: '3333',
          password: 'incorrect'
        }),
        /login failed/
      );
    });

    it('ok', async () => {
      await ax.post('/user/login', {
        email: '1',
        password: 'pw'
      });
    });

    it('got cookies', async () => {
      await ax.post('/user/login', {
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

function genUser (obj) {
  return {
    ...{
      'userEmail': '44',
      'userPass': '3',
      'userPassComfim': '1',
      'comName': 'huawei',
      'comCode': '1',
      'comCapital': 23232,
      'comTime': '1',
      'comPerson': '1',
      'comEmail': '1',
      'comPhone': '1',
      'comManager': '1',
      'comRegistAddresss': '1',
      'comWorkAddresss': '1',
      'comField': '1',
      'comProduct': '1',
      'comIntro': '1',
      'contactName': '1',
      'contactJob': '1',
      'contactMobile': '1',
      'contactEmail': '1',
      'contactQQ': '1',
      'contactPhone': '1'
    },
    ...obj
  };
}
