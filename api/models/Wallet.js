/**
 * Wallet.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    bonusPreSale: {
      description: '',
      type: 'number',
      required: true,
      columnName: 'bonus_pre_sale',
      example: 0,
    },

    bonusReferral: {
      description: '',
      type: 'number',
      required: true,
      columnName: 'bonus_referral',
      example: 0,
    },

    tokenPurchased: {
      description: '',
      type: 'number',
      required: true,
      columnName: 'token_purchased',
      example: 0,
    },

    tokenToBeTransferred: {
      description: '',
      type: 'number',
      required: true,
      columnName: 'token_to_be_transferred',
      example: 0,
    },

    tokenInUserWallet: {
      description: '',
      type: 'number',
      required: true,
      columnName: 'token_in_user_wallet',
      example: 0,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    user: {
      model: 'User',
      unique: true,
      required: true
    },
  },
};
