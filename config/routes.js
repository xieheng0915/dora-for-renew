/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /': {
    action: 'view-homepage-or-redirect'
  },
  'GET /welcome': {
    action: 'dashboard/view-welcome'
  },

  'GET /faq': {
    action: 'entrance/faq'
  },
  'GET /legal/terms': {
    view: 'pages/legal/terms'
  },
  'GET /signup': {
    action: 'entrance/view-signup'
  },
  'GET /email/confirm': {
    action: 'entrance/confirm-email'
  },
  'GET /email/confirmed': {
    view: 'pages/entrance/confirmed-email'
  },
  'GET /contact': {
    view: 'pages/contact'
  },
  'GET /login': {
    action: 'entrance/view-login'
  },
  'GET /password/forgot': {
    action: 'entrance/view-forgot-password'
  },
  'GET /password/new': {
    action: 'entrance/view-new-password'
  },

  'GET /account': {
    action: 'account/view-account-overview'
  },
  'GET /account/password': {
    action: 'account/view-edit-password'
  },
  'GET /account/profile': {
    action: 'account/view-edit-profile'
  },

  'GET /purchase/purchase-request': {
    action: 'purchase/view-purchase-request',
  },
  'Get /:lang': {
    policy: 'lang'
  },
  'GET /api/v1/wallet/update-wallet': {
    action: 'wallet/update-wallet',
  },
  'GET /api/v1/wallet/get-wallet': {
    action: 'wallet/get-wallet',
  },
  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the CloudSDK library.
  '/api/v1/account/logout': {
    action: 'account/logout'
  },
  'PUT   /api/v1/account/update-password': {
    action: 'account/update-password',
  },
  'PUT   /api/v1/account/update-profile': {
    action: 'account/update-profile'
  },
  'PUT   /api/v1/account/update-billing-card': {
    action: 'account/update-billing-card',
  },
  'PUT   /api/v1/entrance/login': {
    action: 'entrance/login'
  },
  'POST  /api/v1/entrance/signup': {
    action: 'entrance/signup'
  },
  'POST  /api/v1/entrance/send-password-recovery-email': {
    action: 'entrance/send-password-recovery-email',
  },
  'POST  /api/v1/entrance/update-password-and-login': {
    action: 'entrance/update-password-and-login',
  },
  'POST  /api/v1/deliver-contact-form-message': {
    action: 'deliver-contact-form-message',
  },
  'POST  /api/v1/purchase/purchase-request': {
    action: 'purchase/purchase-request',
  },
  'POST /api/v1/purchase/purchase-request-paginate': {
    action: 'purchase/purchase-paginate',
  },
  'POST /api/v1/purchase/get-payment-status': {
    action: 'purchase/get-payment-status',
  },
  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝
  '/terms': '/legal/terms',
  '/logout': '/api/v1/account/logout',
};
