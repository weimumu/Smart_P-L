var regexEmail = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
var regexPass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
export default {
  validateFirst (message) {
    if (message.userEmail === '' || message.userPass === '' || message.userPassComfim === '') {
      return '邮箱地址以及用户名不能为空';
    } else if (!regexEmail.test(message.userEmail)) {
      return '邮箱地址不合法';
    } else if (message.userPass !== message.userPassComfim) {
      return '两次密码输入不一致';
    } else if (!regexPass.test(message.userPass)) {
      return '密码格式不正确';
    } else {
      return 'true';
    }
  },
  validateSecond (message) {
    for (var key in message) {
      if (key.toString().indexOf('com') >= 0 && message[key] === '') {
        return '所有信息均不能为空';
      }
    }
    return 'true';
  },
  validateThird (message) {
    for (var key in message) {
      if (key.toString().indexOf('con') >= 0 && message[key] === '') {
        return '所有信息均不能为空';
      }
    }
    return 'true';
  },
  comField: [
    '农、林、牧、渔业', '采矿业', '制造业', '电力、热力、燃气及水生产和供应业',
    '建筑业', '批发和零售业', '交通运输、仓储和邮政业', '住宿和餐饮业',
    '软件和信息技术服务业', '金融业', '房地产业', '租赁和商务服务业',
    '科学研究和技术服务业', '水利、环境和公共设施管理业', '居民服务、修理等服务业',
    '教育', '文化、体育和娱乐业', '其他'
  ]
};
