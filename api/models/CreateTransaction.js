/**
 * CreateTransaction.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'create_transaction',
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    smcAmount: {
      type: 'number',
      required: true,
      columnType: 'float',
      columnName: 'smc_amount',
      example: 999999.99,
    },

    cmd: {
      type: 'string',
      maxLength: 200,
      columnName: 'cmd',
      defaultsTo: 'create_transaction',
      example: 'create_transaction',
    },

    currency1Amount: {
      type: 'number',
      required: true,
      columnName: 'currency1_amount',
      example: 999999.99,
    },

    currency1: {
      type: 'string',
      required: true,
      isIn: ['BTC', 'ETH'],
      maxLength: 10,
      columnName: 'currency1',
      example: 'ETH',
    },

    currency2: {
      type: 'string',
      required: true,
      isIn: ['BTC', 'ETH'],
      maxLength: 10,
      columnName: 'currency2',
      example: 'ETH',
    },

    buyerEmail: {
      type: 'string',
      allowNull: true,
      isEmail: true,
      maxLength: 200,
      columnName: 'buyer_email',
      example: 'carol.reyna@microsoft.com',
    },

    error: {
      type: 'string',
      allowNull: true,
      maxLength: 500,
      columnName: 'error',
      example: 'ok',
    },

    resultAmount: {
      type: 'string',
      allowNull: true,
      maxLength: 100,
      columnName: 'result_amount',
      example: '1.21825881',
    },

    resultAddress: {
      type: 'string',
      allowNull: true,
      maxLength: 100,
      columnName: 'result_address',
      example: 'd17a8ee84b1de669bdd0f15b38f20a7e9781d569d20c096e49983ad9ad40ce4c',
    },

    resultTxnId: {
      type: 'string',
      allowNull: true,
      maxLength: 200,
      columnName: 'result_txn_id',
      example: 'PVS1Xo3xCU2MyXHadU2EbhFZCbnyjZHBjx',
    },

    resultConfirmsNeeded: {
      type: 'string',
      allowNull: true,
      maxLength: 10,
      columnName: 'result_confirms_needed',
      example: '5',
    },

    resultTimeout: {
      type: 'number',
      allowNull: true,
      columnName: 'result_timeout',
      example: 5400,
    },

    resultStatusUrl: {
      type: 'string',
      allowNull: true,
      maxLength: 500,
      columnName: 'result_status_url',
      example: 'https://www.coinpayments.net/index.php?cmd=status&id=d17a8ee84b1de669bdd0f15b38f',
    },

    resultQrcodeUrl: {
      type: 'string',
      allowNull: true,
      maxLength: 500,
      columnName: 'result_qrcode_url',
      example: 'https://www.coinpayments.net/qrgen.php?id=CPBF4COHLYGEZZYIGFDKFY9NDP&key=90e5561c1e8cd4452069f7726d3e0370',
    },

    tosAcceptedByIp: {
      type: 'string',
      description: 'The IP (ipv4) address of the request that create transaction.',
      extendedDescription: 'Useful for certain types of businesses and regulatory requirements (KYC, etc.)',
      moreInfoUrl: 'https://en.wikipedia.org/wiki/Know_your_customer',
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

    getTx: {
      columnName: 'get_tx',
      model: 'GetTx',
      required: true,
      unique: true
    },
  },
};
