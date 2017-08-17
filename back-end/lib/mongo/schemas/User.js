const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

/**
 * 用户
 * @type {Schema}
 */
module.exports = new Schema({
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
    required: true
  },
  comCode: {
    type: String,
    required: true
  },
  comCapital: {
    type: String,
    required: true
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
