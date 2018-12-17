module.exports = {
  friendlyName: 'View account overview',

  description: 'Display "Account Overview" page.',

  exits: {
    success: {
      viewTemplatePath: 'pages/account/account-overview',
    },
  },

  fn: async function(inputs, exits) {
    var currencyInitial = this.req.param('currency', 'BTC');

    if (!['BTC', 'ETH'].includes(currencyInitial)) {
      return exits.resendRequest('/purchase/purchase-request');
    }
    const createTransactionsOfUser = await User.findOne({
      id: this.req.me.id,
    }).populate(
      'createTransactions',
      {
        limit: 5,
        sort: 'id DESC',
      },
      (err, result) => {
        if (err) {
          throw err;
        }
      }
    );

    const temp = await CreateTransaction.find({
      user: this.req.me.id,
    })
      .limit(5)
      .sort('id DESC')
      .populate('getTx');

    var dayjs = require('dayjs');
    const transactions = await temp.map(val => {
      const obj1 = {};
      return Object.assign(
        {
          id: val.id,
          createdAtModified: dayjs(val.createdAt).format(
            this.req.session.selectlocale == 'zh'
              ? 'YYYY年M月D日'
              : 'YYYY MMMM D'
          ),
          resultTxnId: val.resultTxnId,
          resultAmount: val.resultAmount,
          currency1: val.currency1,
          smcAmount: val.smcAmount,
          currency1Amount: val.currency1Amount,
          resultAddress: val.resultAddress,
          resultStatusUrl: val.resultStatusUrl,
          resultQrcodeUrl: val.resultQrcodeUrl,
          resultStatus: null == val.getTx ? 0 : val.getTx.resultStatus,
        },
        obj1
      );
    });

    //select count of item
    const transactionsCount = await CreateTransaction.count({
      user: this.req.me.id,
    });

    var transactionId = this.req.session.successTransactionId
      ? this.req.session.successTransactionId
      : '';

    this.req.session.successTransactionId = '';

    const walletData = await User.findOne({
      id: this.req.me.id,
    }).populate('wallet');

    return exits.success({
      params: [
        {
          transactions: transactions,
        },
        {
          currencyInitial: currencyInitial,
        },
        {
          transactionId: transactionId,
        },
        {
          itemCount: transactionsCount,
        },
        {
          walletData: walletData,
        },
      ],
    });
  },
};
