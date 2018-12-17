/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  '*': ['lang', 'is-logged-in'],
  //'*': 'is-logged-in',
  //'change-locale': 'lang',
  // Bypass the `is-logged-in` policy for:
  'entrance/*': 'lang',
  'account/logout': true,
  'view-homepage-or-redirect': 'lang',
  'deliver-contact-form-message': true,
  'dashboard/*': 'lang',
  'legal/*': 'lang',
  '/email/confirmed': 'lang',

};
