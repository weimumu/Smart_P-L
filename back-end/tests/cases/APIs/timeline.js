const assert = require('assert');
const ax = require('../../lib').axios;
const {genUser, login} = require('../../lib');
const {mongo: {User, Lend, Borrow, GuranteeSeek, GuranteeOffer, TimelineItem}} = require('../../../lib');
const {users} = require('../../dataset');

const userA = {
  email: users[0].userEmail,
  password: users[0].userPass,
  comName: users[0].comName
};

describe('#Timeline', () => {
  before(async () => {
    await Promise.all([
      User.remove({}),
      Lend.remove({}),
      Borrow.remove({}),
      GuranteeSeek.remove({}),
      GuranteeOffer.remove({}),
      TimelineItem.remove({})
    ]);
    await Promise.all(
      users.map(u => ax.post('/user', genUser(u)))
    );
    await login(userA);
  });

  after(async () => {
    await Promise.all([
      User.remove({}),
      Lend.remove({}),
      Borrow.remove({}),
      GuranteeSeek.remove({}),
      GuranteeOffer.remove({}),
      TimelineItem.remove({})
    ]);
  });

  it('after Borrow', async () => {
    await ax.post('/loan/borrow', {
      'city': '广州',
      'project': 'smart_PL',
      'max_amount': 20,
      'reason': '吃喝嫖赌',
      'max_rate': 4.3,
      'loan_ddl': 6,
      'other_detail': '我要钱'
    });
    const timeline = await getLatestTimeline();
    assert(timeline.type === 'Borrow', 'incorrect timeline');
  });

  it('after Lend', async () => {
    await ax.post('/loan/lend', {
      'loan_ddl': 12,
      'max_amount': 344
    });
    const timeline = await getLatestTimeline();
    assert(!timeline || timeline.type !== 'Lend', 'unexpected timeline');
  });

  it('after GuranteeSeek', async () => {
    await ax.post('/gurantee/seek', {
      'city': '广州',
      'project': 'smart',
      'cost': 12,
      'amount_gurantee': 30,
      'rate_gurantee': 0.7,
      'loan_ddl': 5,
      'reason': 'no reason',
      'other_detail': '???'
    });
    const timeline = await getLatestTimeline();
    assert(timeline.type === 'GuranteeSeek', 'incorrect timeline');
  });

  it('after GuranteeOffer', async () => {
    await ax.post('/gurantee/offer', {
      'amount_gurantee': 300,
      'loan_ddl': 12,
      'min_rate': 0.3
    });
    const timeline = await getLatestTimeline();
    assert(!timeline || timeline.type !== 'Lend', 'unexpected timeline');
  });

  it('after BondSell', async () => {
    await ax.post('/bondtrade/sell', {
      'company_lend': 'ali'
    });
    const timeline = await getLatestTimeline();
    assert(timeline.type === 'BondSell', 'incorrect timeline');
  });

  it('overall', async () => {
    const {data} = await ax.get('/timeline?page=0&size=100');
    assert(data.length === 3, 'incomplete timeline');
  });
});

async function getLatestTimeline () {
  const {data} = await ax.get('/timeline?page=0&size=100');
  return data[0];
}
