module.exports = {


  friendlyName: 'Update wallet',


  description: '',


  inputs: {},


  exits: {

  },


  fn: async function (inputs, exits) {

    // TODO: TEST CODES TO DELETE
    // await sails.helpers.transferCoins.with({
    //   userId: this.req.me.id,
    //   smcAmount: 2,
    //   userEmail: this.req.me.emailAddress,
    //   toEmail: 'receiver-email@email.com',
    // });
    // END TEST CODES

    var finished = await sails.helpers.getPaymentStatus.with({
      userId: this.req.me.id
    });

    if (finished == true) {
      return exits.success();
    }
  }


};
