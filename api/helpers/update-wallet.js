module.exports = {
  friendlyName: 'Update wallet',

  description: '',

  inputs: {
    userId: {
      description: '',
      example: 1000,
      type: 'number',
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs, exits) {
    var transactions = await Transaction.find({
      where: {
        user: inputs.userId,
        status: {
          '>': 0
        },
      },
      select: ['status', 'amount', 'type'],
    });

    var tokenPurchased = await transactions
      .filter(tnx => {
        return tnx.type == 'buy';
      })
      .reduce((acc, val) => {
        return acc + val.amount;
      }, 0);

    // var tokenToBeTransferred = await transactions
    //   .filter(tnx => {
    //     return tnx.status == 0 && tnx.type == 'transfer_from';
    //   })
    //   .reduce((acc, val) => {
    //     return acc + Math.abs(val.amount);
    //   }, 0);
    var tokenToBeTransferred = await transactions
      .filter(tnx => {
        return (tnx.type == 'transfer_from' || tnx.type == 'bonus_pre_sale' || 'bonus_referral');
      })
      .reduce((acc, val) => {
        return acc + val.amount;
      }, 0);

    var bonusPreSale = await transactions
      .filter(tnx => {
        return tnx.type == 'bonus_pre_sale';
      })
      .reduce((acc, val) => {
        return acc + val.amount;
      }, 0);

    var bonusReferral = await transactions
      .filter(tnx => {
        return tnx.type == 'bonus_referral';
      })
      .reduce((acc, val) => {
        return acc + val.amount;
      }, 0);

    // var tokenInUserWallet = await transactions
    //   .filter(tnx => tnx.status == 1)
    //   .reduce((acc, val) => {
    //     return acc + val.amount;
    //   }, 0);

    var tokenInUserWallet = 0;

    var wallet = await Wallet.findOrCreate({
      user: inputs.userId,
    }, {
      user: inputs.userId,
      bonusPreSale: await bonusPreSale,
      bonusReferral: await bonusReferral,
      tokenPurchased: await tokenPurchased,
      tokenToBeTransferred: await tokenToBeTransferred,
      tokenInUserWallet: await tokenInUserWallet,
    }).exec(async (err, user, wasCreated) => {
      if (err) {
        return err;
      }

      if (!wasCreated) {
        //   sails.log.info('Created a new wallet: ');
        // } else {
        // sails.log.info('Found existing wallet: ');
        var updatedWallet = await Wallet.update({
            user: inputs.userId,
          })
          .set({
            bonusPreSale: await bonusPreSale,
            bonusReferral: await bonusReferral,
            tokenPurchased: await tokenPurchased,
            tokenToBeTransferred: await tokenToBeTransferred,
            tokenInUserWallet: await tokenInUserWallet,
          })
          .fetch();

      }
    });
    // All done.
    return exits.success();
  },
};
