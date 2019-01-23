parasails.registerPage('account-overview', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //showData
    myPageEnabled: true,
    buyTokenEnabled: false,
    editEnabled: false,

    // Main syncing/loading state for this page.
    syncing: false,

    currencyBTC: 'BTC',
    currencyETH: 'ETH',

    // START If you change this value, change the value in api/controllers/purchase/purchase-request.js
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

    // For the Stripe checkout window
    checkoutHandler: undefined,

    // For the confirmation modal:
    removeCardModalVisible: false,
    itemDatas: '',
    itemTotalRow: '',
    walletData: '',
    currentPage: 1,
    pagePerCount: 5,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);

    this.formData.currencyToBePaid = this.params[1].currencyInitial;
    this.itemDatas = this.params[0].transactions;

    this.itemTotalRow = this.params[3].itemCount;

    if ($.trim(this.params[2].transactionId)) {
      var item = this.params[0].transactions.find(
        tran => tran.id == this.params[2].transactionId
      );

      // to display buy token tag
      this.buyTokenEnabled = true;
      this.myPageEnabled = false;
      this.editEnabled = false;

      this.transactionId = item.resultTxnId;
      this.amount = item.currency1Amount + ' ' + item.currency1;
      this.address = item.resultAddress;
      this.statusUrl = item.resultStatusUrl;
      this.qrcodeUrl = item.resultQrcodeUrl;

      this.paymentModalVisible = true;
    }
    this.walletData = this.params[4].walletData;
    //console.log(this.formData.walletData);
  },
  mounted: async function() {
    this.formatData()
    //…
  },
  watch: {
    'formData.amountToBePaid': function(newVal, oldVal) {
      this.formData.smcPurchased =
        newVal /
        (this.formData.currencyToBePaid == this.currencyBTC
          ? this.exchangeRateBTC
          : this.exchangeRateETH);
    },

    'formData.smcPurchased': function(newVal, oldVal) {
      this.formData.amountToBePaid =
        newVal *
        (this.formData.currencyToBePaid == this.currencyBTC
          ? this.exchangeRateBTC
          : this.exchangeRateETH);
    },
  },
  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    formatData: function() {
      const month = [
        {'January': '.01.'},
        {'February': '.02.'},
        {'March': '.03.'},
        {'April': '.04.'},
        {'May': '.05.'},
        {'June': '.06.'},
        {'July': '.07.'},
        {'August': '.08.'},
        {'September': '.09.'},
        {'October': '.10.'},
        {'November': '.11.'},
        {'December': '.12.'}
      ]
      for (const item of this.itemDatas) {
        if (item.createdAtModified.indexOf('年') > -1) {
          item.createdAtModified = item.createdAtModified.replace(/年/, '.');
          item.createdAtModified = item.createdAtModified.replace(/月/, '.');
          item.createdAtModified = item.createdAtModified.replace(/日/, '')
        } else {
          for (const obj of month) {
            const key = Object.keys(obj)[0];
            const reg = new RegExp(' '+key+' ');
            if (item.createdAtModified.indexOf(key) > -1) {
              item.createdAtModified.replace(reg, obj[key])
              item.createdAtModified = item.createdAtModified.replace(reg, obj[key]);
            }
          }
        }
      }
      console.log(this.itemDatas)
    },
    submittedForm: async function() {
      // show new purchase request on success.
      // > (Note that we re-enable the syncing state here.  This is on purpose--
      // > to make sure the spinner stays there until the page navigation finishes.)
      this.syncing = true;

      //console.log(this.formData);
      window.location = '/account?currency=' + this.formData.currencyToBePaid;
    },

    checkBuyToken: async function() {
      this.buyTokenEnabled = true;
      this.myPageEnabled = false;
      this.editEnabled = false;
    },
    checkMyPage: async function() {
      // console.log("Checked my page");
      this.buyTokenEnabled = false;
      this.editEnabled = false;
      this.myPageEnabled = true;

      // Update wallet when user check MyPage
      var result = await Cloud.updateWallet().tolerate(() => {
        this.cloudError = true;
      });

      if (result == 'OK') {
        var res = await Cloud.getWallet().tolerate(() => {
          this.cloudError = true;
        });

        this.walletData = await res.walletData;

        return;
      }
    },

    checkEdit: async function() {
      this.buyTokenEnabled = false;
      this.editEnabled = true;
      this.myPageEnabled = false;
    },

    handleParsingForm: function() {
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
    selectBTC: function() {
      if (this.formData.currencyToBePaid == this.currencyBTC) {
        return;
      }
      this.formData.currencyToBePaid = this.currencyBTC;
      this.formData.amountToBePaid = '';
      this.formData.smcPurchased = '';
      return;
    },

    selectETH: function() {
      if (this.formData.currencyToBePaid == this.currencyETH) {
        return;
      }
      // console.log(this);
      this.formData.currencyToBePaid = this.currencyETH;
      this.formData.amountToBePaid = '';
      this.formData.smcPurchased = '';

      return;
    },

    clickOpenPaymentModalIcon: async function(item, event) {
      this.transactionId = item.resultTxnId;
      this.amount = item.currency1Amount + ' ' + item.currency1;
      this.address = item.resultAddress;
      this.statusUrl = item.resultStatusUrl;
      this.qrcodeUrl = item.resultQrcodeUrl;

      this.paymentModalVisible = true;

      await Cloud.updateWallet().tolerate(() => {
        this.cloudError = true;
      });
    },

    closePaymentModal: async function() {
      this.transactionId = '';
      this.amount = '';
      this.address = '';
      this.statusUrl = '';
      this.qrcodeUrl = '';

      this.paymentModalVisible = false;

      var res = await Cloud.getWallet().tolerate(() => {
        this.cloudError = true;
      });

      this.walletData = await res.walletData;
    },

    clickPageNumber: async function(event) {
      var responseData = await Cloud.purchasePaginate
        .with({
          pageNo: event,
        })
        .tolerate(() => {
          this.cloudError = true;
        });
      // await console.log(responseData);
      this.itemDatas = await responseData.params[0].transactions;
      //this.tabledatas = responseData.params[0].transactions;
      this.checkPaginate = true;
      return;
    },
  },
});
