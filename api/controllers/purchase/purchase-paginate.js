module.exports = {
  friendlyName: 'View homepage or redirect',

  description:
    'Display or redirect to the appropriate homepage, depending on login status.',

  inputs: {
    pageNo: {
      type: 'string',
      example: '2',
      description: 'card No',
    },
  },

  fn: async function(inputs, exits) {
    // //SMY
    // // if (this.req.me) {
    // //   throw {redirect:'/welcome'};
    // // }
    // //sails.log.info(inputs.pageNo);
    // //sails.log.info('called paginate');
    // var skipNo = inputs.pageNo - 1;
    // //sails.log.info(skipNo);
    // const createTransactionsOfUser = await User.findOne({
    //   id: this.req.me.id,
    // }).populate(
    //   'createTransactions',
    //   {
    //     limit: 5,
    //     skip: skipNo * 5,
    //     sort: 'id DESC',
    //   },
    //   (err, result) => {
    //     if (err) {
    //       // sails.log.info(err);
    //       throw err;
    //     }

    //     // if (result) {
    //     // sails.log.info(result);
    //     // }
    //   }
    // );

    // var dayjs = require('dayjs');
    // var transactions = await createTransactionsOfUser.createTransactions.map(
    //   (val, i, arr) => {
    //     var rObj = Object.assign(
    //       {
    //         createdAtModified: dayjs(val.createdAt).format(
    //           this.req.session.selectlocale == 'ja'
    //             ? 'YYYY年M月D日'
    //             : 'YYYY MMMM D'
    //         ),
    //       },
    //       val
    //     );
    //     return rObj;
    //   }
    // );

    var skipNo = inputs.pageNo - 1;
    const temp = await CreateTransaction.find({
      user: this.req.me.id,
    }).limit(5).skip(skipNo * 5).sort('id DESC').populate('getTx');

    var dayjs = require('dayjs');

    const transactions = await temp.map(val => {
      const obj1 = {};
      return Object.assign({
          id: val.id,
          createdAtModified: dayjs(val.createdAt).format(
            this.req.session.selectlocale == 'ja' ?
            'YYYY年M月D日' :
            'YYYY MMMM D'
          ),
          resultTxnId: val.resultTxnId,
          resultAmount: val.resultAmount,
          currency1: val.currency1,
          smcAmount: val.smcAmount,
          currency1Amount: val.currency1Amount,
          resultAddress: val.resultAddress,
          resultStatusUrl: val.resultStatusUrl,
          resultQrcodeUrl: val.resultQrcodeUrl,
          resultStatus: (null == val.getTx ? 0 : val.getTx.resultStatus),
          resultStatusMessage: 'success',
        },
        obj1
      );
    });

    return exits.success({
      params: [{ transactions: transactions }, { pageNo: inputs.pageNo }],
    });
  },
};
