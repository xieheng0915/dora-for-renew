module.exports = {


  friendlyName: 'Get wallet',


  description: '',


  inputs: {

    userId: {
      description: '',
      example: 1000,
      type: 'number',
      required: true,
    },
  },


  exits: {

    success: {
      outputFriendlyName: 'Wallet',
      outputType: 'ref'
    },

  },


  fn: async function (inputs, exits) {

    // Get wallet.
    var wallet = await Wallet.findOne({
      user: inputs.userId
    });
    // TODO

    // Send back the result through the success exit.
    return exits.success(wallet);

  }


};
