/**
 * Transaction.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    status: {
      description: 'Status of the transaction (-1 >= Cancelled, 0 ~ 99 = Pending, 100 >= Success)',
      type: 'number',
      required: true,
      columnName: 'status',
      example: 1,
    },

    typeAndRefId: {
      description: 'composite key of transaction type and reference table Id',
      type: 'string',
      required: true,
      unique: true,
      columnName: 'type_and_ref_id',
      example: 'buy_1000',
    },

    type: {
      description: 'Type of transaction (buy, bonus_pre_sale, bonus_referral, transfer_from, transfer_to, withdrawal)',
      type: 'string',
      required: true,
      columnName: 'type',
      example: 'buy',
    },

    refId: {
      description: 'reference Id of table',
      type: 'number',
      required: true,
      columnName: 'ref_id',
      example: 1000,
    },

    extraRefId: {
      description: 'reference Id of table',
      type: 'string',
      allowNull: true,
      columnName: 'extra_ref_id',
      example: 'PVS1Xo3xCU2MyXHadU2EbhFZCbnyjZHBjx',
    },

    amount: {
      description: 'Amount of transaction',
      type: 'number',
      required: true,
      columnName: 'amount',
      example: 100,
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
      unique: true,
      // required: true
    },

    bonus: {
      columnName: 'bonus',
      model: 'Bonus',
      unique: true,
      // required: true
    },

    transfer: {
      columnName: 'transfer',
      model: 'Transfer',
    },

    withdrawal: {
      columnName: 'withdrawal',
      model: 'Withdrawal',
      unique: true,
      // required: true
    },
  },
};
