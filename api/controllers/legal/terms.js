module.exports = {


  friendlyName: 'Terms',


  description: 'Terms legal.',


  inputs: {

  },


  exits: {

    success: {
      viewTemplatePath: 'pages/legal/terms',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
