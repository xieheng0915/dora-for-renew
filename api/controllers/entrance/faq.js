module.exports = {


    friendlyName: 'View Faq',
  
  
    description: 'Display "Faq" page.',
  
  
    exits: {
      
      success: {
        viewTemplatePath: 'pages/faq',
      },

    },
  
  
    fn: async function (inputs, exits) {
      return exits.success();
  
    }
  
  
  };
  