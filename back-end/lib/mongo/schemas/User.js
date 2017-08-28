const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
// const ObjectIdType = mongoose.Types.ObjectId;
// const {assert} = require('../../assert');

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

userSchema.methods.isFriend = function (id) {
  return this.friends.indexOf(id) !== -1;
};

module.exports = userSchema;
