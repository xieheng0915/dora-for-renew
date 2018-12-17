module.exports = {


  friendlyName: 'Coin payment client',


  description: '',


  inputs: {

  },


  exits: {

  },

  sync: true,


  fn: function (inputs, exits) {

    var CoinPayments = require('coinpayments');
    var options = {};
    Object.defineProperties(options, {
      key: {
        value: process.env.COINPAYMENTS_PUBLIC_KEY,
        writable: false,
      },
      secret: {
        value: process.env.COINPAYMENTS_SECRET_KEY,
        writable: false,
      },
    });

    var client = new CoinPayments(options);
    // All done.
    return exits.success(client);

  }
};
