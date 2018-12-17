module.exports = {


  friendlyName: 'Transfer coins',


  description: '',


  inputs: {

    userId: {
      description: '',
      example: 1000,
      type: 'number',
      required: true,
    },

    smcAmount: {
      type: 'number',
      required: true,
    },

    userEmail: {
      type: 'string',
      isEmail: true,
      maxLength: 200,
      example: 'carol.reyna@microsoft.com',
      required: true,
    },

    toEmail: {
      type: 'string',
      isEmail: true,
      maxLength: 200,
      example: 'carol.reyna@microsoft.com',
      required: true,
    },

  },


  exits: {

  },


  fn: async function (inputs, exits) {

    sails.log.info("IN TRANSFER COIN@");
    var receiverId = await User.findOne({
      where: {
        emailAddress: inputs.toEmail,
      },
      select: ['id']
    });

    if (!receiverId || inputs.toEmail == inputs.userEmail) {
      await sails.log.info(receiverId);
      sails.log.info("NO RECEIVER WITH THIS EMAIL");
      return exits.success();
    }

    await sails.log.info(receiverId);

    var transfer = await Transfer.create({
      smcAmount: inputs.smcAmount,
      receiverEmail: inputs.toEmail,
      receiver: await receiverId.id,
      sender: inputs.userId,

    }).fetch();

    sails.log.info(transfer);

    // Add transaction for receiver

    var recTransaction = await Transaction.create({
      status: 0,
      typeAndRefId: 'transfer_to_' + await transfer.id,
      type: 'transfer_to',
      refId: await transfer.id,
      amount: inputs.smcAmount,
      user: await receiverId.id,
      transfer: await transfer.id,
    }).fetch();

    sails.log.info(recTransaction);

    var sendTransaction = await Transaction.create({
      status: 0,
      typeAndRefId: 'transfer_from_' + await transfer.id,
      type: 'transfer_from',
      refId: await transfer.id,
      amount: (inputs.smcAmount * -1),
      user: inputs.userId,
      transfer: await transfer.id,
    }).fetch();

    sails.log.info(sendTransaction);

    // All done.
    return exits.success();

  }


};
