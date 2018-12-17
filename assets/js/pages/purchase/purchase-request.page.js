parasails.registerPage('purchase-request', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // Main syncing/loading state for this page.
    syncing: false,

    currencyBTC: 'BTC',
    currencyETH: 'ETH',

    exchangeRateBTC: 0.001,
    exchangeRateETH: 0.0177,

    paymentModalVisible: false,

    transactionId: '',
    amount: '',
    address: '',
    statusUrl: '',
    qrcodeUrl: '',

    // Form data
    formData: {
      /* … */
      smcPurchased: '',
      amountToBePaid: '',
      currencyToBePaid: '',
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: {
      /* … */
    },

    formRules: {
      smcPurchased: {
        required: true,
        type: 'number',
      },
      amountToBePaid: {
        required: true,
        type: 'number',
      },
      currencyToBePaid: {
        required: true,
        type: 'string',
        isIn: ['BTC', 'ETH'],
      },
    },

    // Server error state for the form
    cloudError: '',
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    this.formData.currencyToBePaid = this.params[1].currencyInitial;

    if ($.trim(this.params[2].transactionId)) {
      var item = this.params[0].transactions.find(
        tran => tran.id == this.params[2].transactionId
      );

      this.transactionId = item.resultTxnId;
      this.amount = item.currency1Amount + ' ' + item.currency1;
      this.address = item.resultAddress;
      this.statusUrl = item.resultStatusUrl;
      this.qrcodeUrl = item.resultQrcodeUrl;

      this.paymentModalVisible = true;
    }
  },
  mounted: async function () {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝

  watch: {
    'formData.amountToBePaid': function (newVal, oldVal) {
      this.formData.smcPurchased =
        newVal *
        (this.formData.currencyToBePaid == this.currencyBTC ?
          this.exchangeRateBTC :
          this.exchangeRateETH);
    },

    'formData.smcPurchased': function (newVal, oldVal) {
      this.formData.amountToBePaid =
        newVal /
        (this.formData.currencyToBePaid == this.currencyBTC ?
          this.exchangeRateBTC :
          this.exchangeRateETH);
    },
  },

  methods: {
    submittedForm: async function () {
      // show new purchase request on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      this.syncing = true;
      // console.log(this.formData);
      window.location =
        '/purchase/purchase-request?currency=' + this.formData.currencyToBePaid;
    },

    handleParsingForm: function () {
      // Clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      // console.log(this.formData);

      // Validate smcPurchased:
      if (!argins.smcPurchased) {
        this.formErrors.smcPurchased = true;
      }

      // Validate amountToBePaid:
      if (!argins.amountToBePaid) {
        this.formErrors.amountToBePaid = true;
      }

      // Validate currencyToBePaid:
      if (!argins.currencyToBePaid) {
        this.formErrors.currencyToBePaid = true;
      }

      // If there were any issues, they've already now been communicated to the user,
      // so simply return undefined.  (This signifies that the submission should be
      // cancelled.)
      if (Object.keys(this.formErrors).length > 0) {
        return;
      }

      return argins;
    },

    selectBTC: function () {
      if (this.formData.currencyToBePaid == this.currencyBTC) {
        return;
      }
      this.formData.currencyToBePaid = this.currencyBTC;
      this.formData.amountToBePaid = '';
      this.formData.smcPurchased = '';
      return;
    },

    selectETH: function () {
      if (this.formData.currencyToBePaid == this.currencyETH) {
        return;
      }
      // console.log(this);
      this.formData.currencyToBePaid = this.currencyETH;
      this.formData.amountToBePaid = '';
      this.formData.smcPurchased = '';

      return;
    },

    clickOpenPaymentModalIcon: async function (item, event) {
      this.transactionId = item.resultTxnId;
      this.amount = item.currency1Amount + ' ' + item.currency1;
      this.address = item.resultAddress;
      this.statusUrl = item.resultStatusUrl;
      this.qrcodeUrl = item.resultQrcodeUrl;

      this.paymentModalVisible = true;
    },

    closePaymentModal: async function () {
      this.transactionId = '';
      this.amount = '';
      this.address = '';
      this.statusUrl = '';
      this.qrcodeUrl = '';

      this.paymentModalVisible = false;
    },
  },
});
