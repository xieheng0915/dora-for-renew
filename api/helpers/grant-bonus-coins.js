module.exports = {


  friendlyName: 'Grant bonus coins',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // All done.
    return exits.success();

  }


};

module.exports = {


  friendlyName: 'Grant bonus coins',


  description: '',


  inputs: {
    userId: {
      description: '',
      example: 1000,
      type: 'number',
      required: true,
    },

    createTransactionId: {
      description: '',
      example: 1000,
      type: 'number',
      required: true,
    },

    type: {
      description: 'Bonus Type',
      example: 'bonus_pre_sale, bonus_referral',
      type: 'string',
      required: true,
    },

    txnId: {
      description: '',
      example: 'CPCD4FWMO7HWBNXQDAS16BTEKR',
      type: 'string',
      required: true,
    },

    percentage: {
      description: '',
      example: 10,
      type: 'number',
      required: true,
    },

    baseAmount: {
      description: '',
      example: 10,
      type: 'number',
      required: true,
    },

    getTxId: {
      description: '',
      example: 1000,
      type: 'number',
      required: true,
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    // sails.log.info("IN GRANT BONUS COINS");
    // sails.log.info(inputs);

    var proc = await Bonus.findOrCreate({
      user: inputs.userId,
      type: inputs.type,
      refTxnId: inputs.txnId,
      typeAndRefId: (inputs.type + "_" + inputs.createTransactionId),
    }, {
      type: inputs.type,
      typeAndRefId: (inputs.type + "_" + inputs.createTransactionId),
      // Javascript round up to 8 decimals
      amount: Number(Math.round(((inputs.percentage / 100) * inputs.baseAmount) + 'e8') + 'e-8'),
      refTxnId: inputs.txnId,
      percentage: inputs.percentage,
      user: inputs.userId,
    }).exec(async (err, bonus, wasCreated) => {
      if (err) {
        return err;
      }

      if (wasCreated) {
        // sails.log.info('Created a new bonus: ');
        var createdTransaction = await Transaction.findOrCreate({
          type: inputs.type,
          refId: bonus.id,
          extraRefId: inputs.txnId,
          bonus: bonus.id,
        }, {
          status: 1,
          typeAndRefId: inputs.type + '_' + bonus.id,
          type: inputs.type,
          refId: bonus.id,
          extraRefId: inputs.txnId,
          amount: bonus.amount,
          user: inputs.userId,
          getTx: null,
          bonus: bonus.id,
          transfer: null,
          withdrawal: null,
        });
      } else {
        // sails.log.info('Found existing bonus: ');
        // var updatedWallet = await Wallet.update({
        //     user: inputs.userId,
        //   })
        //   .set({
        //     bonusPreSale: await bonusPreSale,
        //     bonusReferral: await bonusReferral,
        //     tokenPurchased: await tokenPurchased,
        //     tokenToBeTransferred: await tokenToBeTransferred,
        //     tokenInUserWallet: await tokenInUserWallet,
        //   })
        //   .fetch();

      }
    });
    // await sails.log.info(bonus);


    // var createdTransaction = await Transaction.findOrCreate({
    //   type: inputs.type,
    //   refId: bonus.id,
    //   extraRefId: inputs.txnId,
    //   bonus: bonus.id,
    // }, {
    //   status: 1,
    //   typeAndRefId: inputs.type + '_' + bonus.id,
    //   type: inputs.type,
    //   refId: bonus.id,
    //   extraRefId: inputs.txnId,
    //   amount: bonus.amount,
    //   user: inputs.userId,
    //   getTx: null,
    //   bonus: bonus.id,
    //   transfer: null,
    //   withdrawal: null,
    // });

    // await sails.log.info(createdTransaction);
    // All done.
    return exits.success();

  }


};
