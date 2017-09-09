export default {
  validateBorrow (mes) {
    for (var key in mes) {
      if (key.toString() === 'riskControl') {
        if (mes[key].mortgage && mes[key].mortgage_value <= 0) {
          return '请正确填写抵押物市值';
        }
        if (mes[key].guarentee) {
          if (mes[key].guarentee_comName === '') {
            return '请正确填写担保公司名称';
          }
          if (mes[key].guarentee_amount <= 0) {
            return '请正确填写担保额度';
          }
        }
      } else if (key.toString() === 'repaySupport') {
        continue;
      } else {
        if (mes[key] === '') {
          return '信息填写不完整';
        }
        if (mes.amount < 0) {
          return '请正确填写借款额度';
        }
        if (mes.loan_ddl <= 3) {
          return '贷款期限必须大于3个月';
        }
        if (mes.max_amount !== mes.amount) {
          return '融资金额与标题借款额度不一致';
        }
        if (mes.max_rate < 0 || mes.max_rate > 4.90 * 4) {
          return '请正确填写可承担最高利息';
        }
      }
    }
    return 'true';
  },

  validateLend (mes) {
    if (mes.max_amount <= 0) {
      return '投资资金必须大于0';
    }
    if (mes.loan_ddl <= 0) {
      return '回收期限必须大于0';
    }
    return 'true';
  },

  validateSeek (mes) {
    for (var key in mes) {
      if (key.toString() === 'situation') {
        for (var key1 in mes['situation']) {
          if (mes['situation'][key1] === '') {
            return '信息填写不完整';
          }
        }
      } else if (mes[key] === '') {
        if (key.toString() === 'guarantee_way') {
          return '至少选择一种担保方式';
        }
        return '信息填写不完整';
      }
    }
    if (mes['amount'] <= 0) {
      return '标题中申请担保的贷款额度必须大于0';
    }
    if (mes['amount_guarantee'] !== mes['amount']) {
      return '申请担保的贷款额度与标题中填写不一致';
    }
    if (mes['cost'] <= 0) {
      return '担保费用必须大于0';
    }
    if (mes['rate_guarantee'] <= 0) {
      return '申请担保的贷款利率必须大于0';
    }
    if (mes['loan_ddl'] <= 0) {
      return '申请担保的贷款期限必须大于0';
    }
    return 'true';
  },

  validateOffer (mes) {
    for (var key in mes) {
      if (key.toString() === 'situation') {
        for (var key1 in mes[key]) {
          if (mes[key][key1] === '') {
            return '信息填写不完整';
          }
        }
      } else if (mes[key] === '') {
        if (key.toString() === 'loan_ddl') {
          return '请选择愿意担保的贷款期限';
        }
        return '信息填写不完整';
      }
    }
    if (!(mes['guarantee_type']['neither'] || mes['guarantee_type']['mortgage'] || mes['guarantee_type']['pledge'] || mes['guarantee_type']['both'])) {
      return '至少选择一种可接受的担保类型';
    }
    if (mes['amount_guarantee'] <= 0) {
      return '愿意担保的贷款额度必须大于0';
    }
    if (mes['min_rate'] <= 0) {
      return '可接受的最低担保费率必须大于0';
    }
    return 'true';
  },
  validateDebt (mes) {
    if (mes.company_borrow === '' || mes.company_lend === '' || mes.loan_source.mes === '' || mes.situation_borrower === '') {
      return '信息填写不完整';
    }
    if (mes.amount <= 0) {
      return '标题债权金额必须大于0';
    }
    if (mes.amount !== mes.loan_amount) {
      return '标题中债权额度与债权金额不一致';
    }
    if (mes.loan_ddl <= 0) {
      return '债权期限必须大于0';
    }
    if (mes.loan_price <= 0) {
      return '债权定价必须大于0';
    }
    return 'true';
  }
};
