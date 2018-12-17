module.exports = {


  friendlyName: 'Get payment status',


  description: '',


  inputs: {

    txnId: {
      type: 'string',
      example: 'CPCD4KG8CCZJAJBEVPJIPB7JSH',
      description: 'Transaction Id',
      required: true,
    },
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    var paymentStatus = await sails.helpers.getPaymentStatus.with({
      txnId: inputs.txnId,
      userId: this.req.me.id
    });
    return exits.success();

  }


};
