parasails.registerPage('homepage', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      // Main syncing/loading state for this page.
      syncing: false,
  
      // Form data
      formData: { /* … */ },
  
      // For tracking client-side validation errors in our form.
      // > Has property set to `true` for each invalid property in `formData`.
      formErrors: { /* … */ },
  
      // Server error state for the form
      cloudError: '',
  
      // Success state when form has been submitted
      cloudSuccess: false,
    },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: function(){
    // this._setBackground();
    this._countDown();
    this._startCount();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    submittedForm: async function() {
      // Show the success message.
      this.cloudSuccess = true;

    },
    handleParsingForm: function() {

      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // Validate email:
      if(!argins.emailAddress) {
        this.formErrors.emailAddress = true;
      }

      // Validate name:
      if(!argins.fullName) {
        this.formErrors.fullName = true;
      }

      // Validate message:
      if(!argins.message) {
        this.formErrors.message = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },
    _countDown: function() {
      var countdown =  $('.dark-time');
        createDarkCicles();
        $(window).on('resize', windowSize);
      
        function windowSize(){
          countdown.TimeCircles().destroy();
          createDarkCicles();
          countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
              countdown.removeClass('animated bounceIn');
            });
        }

        // TimeCicles - Create and Options
        function createDarkCicles() {
         
          countdown.addClass('animated bounceIn');
          countdown.TimeCircles({
            bg_width: 0.5,
            fg_width: 0.03,
            circle_bg_color: '#b4c4d4',
            time: {
                Days: {color: '#ee6e73'},
                Hours: {color: '#ee6e73'},
                Minutes: {color: '#ee6e73'},
                Seconds: {color: '#ee6e73'}
              }
          });

          countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
            countdown.removeClass('animated bounceIn');
          });
        }
    },
    _startCount: function () {
      $('.salecount').each(function () {
        $(this).prop('Counter', 0).animate({
          Counter: $(this).text()
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
              $(this).text(Math.ceil(now));
            }
          });
      });
    }

  }
});
