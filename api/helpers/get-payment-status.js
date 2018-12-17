module.exports = {


  friendlyName: 'Get payment status',


  description: '',


  inputs: {

    userId: {
      description: '',
      example: 1000,
      type: 'number',
      required: true,
    },

    // txnId: {
    //   description: '',
    //   example: 'CPCD0JKA55NAAWJCPCUEILPD1X',
    //   type: 'string',
    //   required: true,
    // },

  },


  exits: {

    success: {
      outputFriendlyName: 'Payment status',
      outputType: 'ref'
    },

  },


  fn: async function (inputs, exits) {
    // Update CoinPayment Transaction status

    // Get List of transaction Ids of pending status of user
    var pendingCpTransactions = await CreateTransaction.find({
      where: {
        user: inputs.userId
      },
      select: ['resultTxnId'],
    }).populate('getTx');

    var tnxIds = await pendingCpTransactions
      .filter(tnx => tnx.getTx.resultStatus >= 0 && tnx.getTx.resultStatus <= 99)
      .map(val => {
        return val.resultTxnId;
      });
    // End Get List of transaction Ids of pending status of user

    if (tnxIds.length < 1) {
      return exits.success(true);
    }

    var client = sails.helpers.coinPaymentClient();

    // Send API request to coinpayment ** Limit 25 transaction Ids **
    var i,
      j,
      tempArray,
      chunk = 25;

    for (i = 0, j = tnxIds.length; i < j; i += chunk) {
      tempArray = tnxIds.slice(i, i + chunk);
      // do whatever
      client.getTxMulti(
        tempArray,
        async (err, result) => {
          if (err) {
            throw err;
          }

          // Will not save transaction with pending status
          // Will not save if status is 0 ~ 99
          var modified = Object.entries(result).map(([key, value]) => ({
            key,
            value,
          })).filter(tnx => tnx.value.status < 0 || tnx.value.status >= 100);

          var getTxs;

          try {
            getTxs = modified.map(val => {
              const obj1 = {};
              return Object.assign({
                  txnId: val.key,
                  user: inputs.userId,
                  create_transaction: null,
                  error: val.value.error,
                  resultTimeCreated: val.value.time_created,
                  resultTimeExpires: val.value.time_expires,
                  resultStatus: val.value.status,
                  resultStatusText: val.value.status_text,
                  resultType: val.value.type,
                  resultCoin: val.value.coin,
                  resultAmount: val.value.amount,
                  resultAmountf: val.value.amountf,
                  resultReceived: val.value.received,
                  resultReceivedf: val.value.receivedf,
                  resultRecvConfirms: val.value.recv_confirms,
                  result_payment_address: val.value.payment_address,
                },
                obj1
              );
            });
          } catch (err) {
            throw err;
          }

          var createdGetTxs = await GetTx.createEach(getTxs).fetch();

          for (var p = 0, len = createdGetTxs.length; p < len; p++) {
            var updatedTransaction = await CreateTransaction.update({
                resultTxnId: createdGetTxs[p].txnId,
              })
              .set({
                getTx: createdGetTxs[p].id,
              })
              .fetch();

            // TODO: TO change the status to 100
            if (createdGetTxs[p].resultStatus >= 100) {
              var response = await sails.helpers.buyCoins.with({
                userId: inputs.userId,
                createTransactionId: await updatedTransaction[0].id,
                txnId: await updatedTransaction[0].resultTxnId,
                getTxId: await updatedTransaction[0].getTx,
                amount: await updatedTransaction[0].smcAmount,
              });
            }
          }
          // Send back the result through the success exit.
          return exits.success(true);
        }
      );
    }
    // END
    // Send back the result through the success exit.
    // return exits.success(paymentStatus);

  }
};
