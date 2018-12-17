/**
 * GetTx.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'get_tx',
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    txnId: {
      columnName: 'txn_id',
      type: 'string',
      example: 'CPCD0JKA55NAAWJCPCUEILPD1X',
    },

    error: {
      columnName: 'error',
      type: 'string',
      allowNull: true,
      example: 'sample error message',
    },

    resultTimeCreated: {
      columnName: 'result_time_created',
      type: 'number',
      example: 1502844074211,
    },

    resultTimeExpires: {
      columnName: 'result_time_expires',
      type: 'number',
      example: 1502844074211,
    },

    resultStatus: {
      columnName: 'result_status',
      type: 'number',
      example: 1,
    },

    resultStatusText: {
      columnName: 'result_status_text',
      type: 'string',
      example: 'Waiting for buyer funds...',
    },

    resultType: {
      columnName: 'result_type',
      type: 'string',
      example: 'coins',
    },

    resultCoin: {
      columnName: 'result_coin',
      type: 'string',
      example: 'BTC',
    },

    resultAmount: {
      columnName: 'result_amount',
      type: 'number',
      example: 121700023,
    },

    resultAmountf: {
      columnName: 'result_amountf',
      type: 'string',
      example: '1.21700023',
    },

    resultReceived: {
      columnName: 'result_received',
      type: 'number',
      example: 121700023,
    },

    resultReceivedf: {
      columnName: 'result_receivedf',
      type: 'string',
      example: '1.21700023',
    },

    resultRecvConfirms: {
      columnName: 'result_recv_confirms',
      type: 'number',
      example: 5,
    },

    resultPaymentAddress: {
      columnName: 'result_payment_address',
      type: 'string',
      example: 'PWP4gKLRLVQv9dsvcN4sZn5pZaKQGothXm',
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    user: {
      model: 'User',
    },

    createTransaction: {
      collection: 'CreateTransaction',
      via: 'getTx',
    },
  },
};
