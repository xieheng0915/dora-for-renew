module.exports = {


  friendlyName: 'Get wallet',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    const walletData = await User.findOne({
      id: this.req.me.id,
    }).populate('wallet');

    return exits.success({
      walletData: walletData
    });

  }


};
