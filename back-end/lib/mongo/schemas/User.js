const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
// const ObjectIdType = mongoose.Types.ObjectId;
const assert = require('../../assert');

/**
 * 用户
 * @type {Schema}
 */
const userSchema = new Schema({
  friends: {
    type: [{
      type: ObjectId,
      ref: 'User'
    }],
    default: []
  },
  messages: {
    type: [{
      type: ObjectId,
      ref: 'Message'
    }],
    default: []
  },
  friendMessages: {
    type: [{
      type: ObjectId,
      ref: 'Message'
    }],
    default: []
  },
  timeline: {
    type: [{
      type: ObjectId,
      ref: 'TimelineItem'
    }],
    default: []
  },
  userEmail: {
    type: String,
    required: true,
    unique: true
  },
  userPass: {
    type: String,
    required: true
  },
  comName: {
    type: String,
    required: true,
    unique: true
  },
  comCode: {
    type: String,
    required: true
  },
  comCapital: {
    type: Number,
    required: true
  },
  comIntegrityScore: {
    type: Number,
    default: () => {
      return Math.floor(Math.random() * 41 + 80); // [80, 120]
    }
  },
  comAttributeScore: {
    type: Number,
    default: () => {
      return Math.floor(Math.random() * 31 + 70); // [70, 100]
    }
  },
  comHistoryScore: {
    type: Number,
    default: () => {
      return Math.floor(Math.random() * 66 + 35); // [35, 100]
    }
  },
  comCreditScore: {
    type: Number,
    default: 0
  },
  comTime: {
    type: String,
    required: true
  },
  comPerson: {
    type: String,
    required: true
  },
  comEmail: {
    type: String,
    required: true
  },
  comPhone: {
    type: String,
    required: true
  },
  comManager: {
    type: String,
    required: true
  },
  comRegistAddresss: {
    type: String,
    required: true
  },
  comWorkAddresss: {
    type: String,
    required: true
  },
  comField: {
    type: String,
    required: true
  },
  comProduct: {
    type: String,
    required: true
  },
  comIntro: {
    type: String,
    required: true
  },
  contactName: {
    type: String,
    required: true
  },
  contactJob: {
    type: String,
    required: true
  },
  contactMobile: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: true
  },
  contactQQ: {
    type: String,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
  }
});

userSchema.statics.addMessage = async function (id, ...messages) {
  return this.update({_id: id}, {
    $push: {
      messages: {
        $each: messages.map(m => m._id),
        $position: 0
      }
    }
  });
};

userSchema.statics.addTimeline = async function (id, ...messages) {
  return this.update({_id: id}, {
    $push: {
      timeline: {
        $each: messages.map(m => m._id),
        $position: 0
      }
    }
  });
};

userSchema.statics.getSelfTimeline = async function (id, size, page = 0) {
  const result = await this
    .findOne({_id: id}, {
      timeline: {
        $slice: [size * page, Number(size)] // skip & limit
      }
    })
    .populate('timeline');
  return result.timeline;
};

userSchema.statics.getFriendTimeline = async function (id, size, page = 0) {
  const user = await this.findById(id);
  assert(user, 'user not exist');
  return this.model('TimelineItem')
    .find({
      $or: [
        {from: id},
        {from: {$in: user.friends}}
      ]
    })
    .sort('-date')
    .skip(size * page)
    .limit(Number(size))
    .exec();
};

userSchema.statics.addTimeline = async function (id, ...timelines) {
  return Promise.all([
    timelines.map(t => t.save()),
    this.model('User')
      .update({_id: id}, {
        $push: {
          'timeline': {
            $each: timelines,
            $position: 0
          }
        }
      })
  ]);
};

userSchema.methods.addMessage = async function (...messages) {
  return this.model('User').addMessage(this._id, ...messages);
};

userSchema.methods.addTimeline = async function (...messages) {
  return this.model('User').addMessage(this._id, ...messages);
};

userSchema.methods.getSelfTimeline = async function (size, page = 0) {
  return this.model('User').getSelfTimeline(this._id, size, page);
};

userSchema.methods.getFriendTimeline = async function (size, page = 0) {
  return this.model('User').getFriendTimeline(this._id, size, page);
};

userSchema.methods.addTimeline = async function (...timelines) {
  return this.model('User').addTimeline(this._id, ...timelines);
};

userSchema.methods.isFriend = function (id) {
  return this.friends.indexOf(id) !== -1;
};

module.exports = userSchema;
