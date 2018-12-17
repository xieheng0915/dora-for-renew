module.exports = {
  friendlyName: 'Purchase request',

  description: '',

  inputs: {
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

  exits: {
    success: {
      responseType: '',
    },
    invalidAmountInput: {
      statusCode: 500,
      description: 'Amount input is not valid.',
    },
  },

  fn: async function(inputs, exits) {
    // Validate two values (DOR, BTH/ETH)
    // START If you change this value, change the value in assets/js/pages/account/account-overview.page.js
    var exchangeRateBTC = 0.001;
    var exchangeRateETH = 0.0177;
    // END If you change this value, change the value in assets/js/pages/account/account-overview.page.js

    var coinToBeReceived = 0;

    if ('BTC' === inputs.currencyToBePaid) {
      coinToBeReceived = inputs.amountToBePaid / exchangeRateBTC;
    } else if ('ETH' === inputs.currencyToBePaid) {
      coinToBeReceived = inputs.amountToBePaid / exchangeRateETH;
    }

    if (
      (coinToBeReceived === 0) |
      (coinToBeReceived > inputs.smcPurchased) |
      (coinToBeReceived < inputs.smcPurchased)
    ) {
      throw 'invalidAmountInput';
    }
    //

    var client = sails.helpers.coinPaymentClient();

    var reqObj = this.req;

    // let myResult;
    try {
      var myResult = await client.createTransaction(
        {
          currency1: inputs.currencyToBePaid,
          currency2: inputs.currencyToBePaid,
          amount: inputs.amountToBePaid,
        },
        async (err, result) => {
          if (err) {
            throw err;
          }
          var newGetTx = await client.getTx(
            result.txn_id,
            async (err2, result2) => {
              if (err2) {
                throw err2;
              }
              var newGetTx = await GetTx.create(
                Object.assign({
                  txnId: result.txn_id,
                  user: reqObj.me.id,
                  create_transaction: null,
                  error: result2.error,
                  resultTimeCreated: result2.time_created,
                  resultTimeExpires: result2.time_expires,
                  resultStatus: result2.status,
                  resultStatusText: result2.status_text,
                  resultType: result2.type,
                  resultCoin: result2.coin,
                  resultAmount: result2.amount,
                  resultAmountf: result2.amountf,
                  resultReceived: result2.received,
                  resultReceivedf: result2.receivedf,
                  resultRecvConfirms: result2.recv_confirms,
                  result_payment_address: result2.payment_address,
                })
              ).fetch();

              var newCreateTransaction = await CreateTransaction.create(
                Object.assign({
                  user: reqObj.me.id,
                  smcAmount: inputs.smcPurchased,
                  currency1Amount: inputs.amountToBePaid,
                  currency1: inputs.currencyToBePaid,
                  currency2: inputs.currencyToBePaid,
                  buyerEmail: reqObj.me.emailAddress,
                  error: err ? err : null,
                  resultAmount: result.amount,
                  resultAddress: result.address,
                  resultTxnId: result.txn_id,
                  resultConfirmsNeeded: result.confirms_needed,
                  resultTimeout: result.timeout,
                  resultStatusUrl: result.status_url,
                  resultQrcodeUrl: result.qrcode_url,
                  tosAcceptedByIp: reqObj.ip,
                  getTx: await newGetTx.id,
                })
              ).fetch();

              sails.log.info(newCreateTransaction);
              if (newCreateTransaction) {
                this.req.session.successTransactionId = await newCreateTransaction.id;
              }

              return await exits.success({
                newCreateTransaction,
              });
            }
          );
        }
      );
    } catch (err) {
      throw err;
    }
  },
};
