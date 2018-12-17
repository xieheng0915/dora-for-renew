/**
 * Bonus.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    bonusPlanId: {
      type: 'number',
      columnName: 'bonus_plan_id',
      example: 4,

    },

    type: {
      type: 'string',
      required: true,
      isIn: ['bonus_pre_sale', 'bonus_referral'],
      columnName: 'type',
      example: 'ETH',
    },

    typeAndRefId: {
      type: 'string',
      required: true,
      unique: true,
      columnName: 'type_and_ref_id',
      example: '',
    },

    amount: {
      type: 'number',
      required: true,
      columnType: 'float',
      columnName: 'amount',
      example: 30,
    },

    refTxnId: {
      type: 'string',
      columnName: 'ref_txn_id',
      example: 'PVS1Xo3xCU2MyXHadU2EbhFZCbnyjZHBjx',
      required: true,
    },

    percentage: {
      type: 'number',
      required: true,
      columnType: 'float',
      columnName: 'percentage',
      example: 30,

    },

    referredByEmail: {
      type: 'string',
      columnName: 'referred_by_email',
      isEmail: true,
      maxLength: 200,
      example: 'carol.reyna@microsoft.com',
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
  },
};
