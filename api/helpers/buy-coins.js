module.exports = {
  friendlyName: 'Buy coins',

  description: 'Buy DORA Coins by user',

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
    txnId: {
      description: '',
      example: 'CPCD4FWMO7HWBNXQDAS16BTEKR',
      type: 'string',
      required: true,
    },
    getTxId: {
      description: '',
      example: 1000,
      type: 'number',
      required: true,
    },
    amount: {
      description: '',
      example: 10,
      type: 'number',
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    var createdTransaction = await Transaction.findOrCreate({
      type: 'buy',
      refId: inputs.createTransactionId,
      extraRefId: inputs.txnId,
    }, {
      status: 1,
      typeAndRefId: 'buy_' + inputs.createTransactionId,
      type: 'buy',
      refId: inputs.createTransactionId,
      extraRefId: inputs.txnId,
      amount: inputs.amount,
      user: inputs.userId,
      getTx: inputs.getTxId,
      bonus: null,
      transfer: null,
      withdrawal: null,
    });
    // .exec(async (err, user, wasCreated) => {
    //   if (err) {
    //     // await sails.log.info(err);
    //     // return res.serverError(err);
    //     return err;
    //   }

    //   if (wasCreated) {
    //     sails.log.info('Created a new user: ');
    //   } else {
    //     sails.log.info('Found existing user: ');
    //   }
    //   // await sails.log.info(createdTransaction);
    //   return user;
    // });
    // .fetch();

    // await sails.log.info(createdTransaction);

    await sails.helpers.updateWallet.with({
      userId: inputs.userId
    });

    // All done.
    return exits.success({
      createdTransaction
    });
  },
};
