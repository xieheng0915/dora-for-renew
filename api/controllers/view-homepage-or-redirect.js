module.exports = {


  friendlyName: 'View homepage or redirect',


  description: 'Display or redirect to the appropriate homepage, depending on login status.',


  exits: {

    success: {
      statusCode: 200,
      description: 'Requesting user is a guest, so show the public landing page.',
      viewTemplatePath: 'pages/homepage.ejs'
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },

  },


  fn: async function (inputs, exits) {
    // require('dotenv').config();
    // const BN = require('bn.js');
    // var Web3 = require('web3');
    // var web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));

    // // var web3 = new Web3(new Web3.providers.HttpProvider(process.env.API_URL));
    // // web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

    // // var balance = web3.eth.getBalance(process.env.ACCOUNT, function (error, result) {
    // //   if (!error) {
    // //     console.log(web3.utils.fromWei(new BN(result), 'ether'));
    // //   } else {
    // //     console.error(error);
    // //   }
    // // });
    // var myContract = new web3.eth.Contract([{
    //   "constant": true,
    //   "inputs": [],
    //   "name": "name",
    //   "outputs": [{
    //     "name": "",
    //     "type": "string"
    //   }],
    //   "payable": false,
    //   "stateMutability": "view",
    //   "type": "function"
    // }, {
    //   "constant": false,
    //   "inputs": [{
    //     "name": "_spender",
    //     "type": "address"
    //   }, {
    //     "name": "_value",
    //     "type": "uint256"
    //   }],
    //   "name": "approve",
    //   "outputs": [{
    //     "name": "",
    //     "type": "bool"
    //   }],
    //   "payable": false,
    //   "stateMutability": "nonpayable",
    //   "type": "function"
    // }, {
    //   "constant": true,
    //   "inputs": [],
    //   "name": "totalSupply",
    //   "outputs": [{
    //     "name": "",
    //     "type": "uint256"
    //   }],
    //   "payable": false,
    //   "stateMutability": "view",
    //   "type": "function"
    // }, {
    //   "constant": false,
    //   "inputs": [{
    //     "name": "_from",
    //     "type": "address"
    //   }, {
    //     "name": "_to",
    //     "type": "address"
    //   }, {
    //     "name": "_value",
    //     "type": "uint256"
    //   }],
    //   "name": "transferFrom",
    //   "outputs": [{
    //     "name": "",
    //     "type": "bool"
    //   }],
    //   "payable": false,
    //   "stateMutability": "nonpayable",
    //   "type": "function"
    // }, {
    //   "constant": true,
    //   "inputs": [],
    //   "name": "decimals",
    //   "outputs": [{
    //     "name": "",
    //     "type": "uint8"
    //   }],
    //   "payable": false,
    //   "stateMutability": "view",
    //   "type": "function"
    // }, {
    //   "constant": false,
    //   "inputs": [{
    //     "name": "_spender",
    //     "type": "address"
    //   }, {
    //     "name": "_subtractedValue",
    //     "type": "uint256"
    //   }],
    //   "name": "decreaseApproval",
    //   "outputs": [{
    //     "name": "",
    //     "type": "bool"
    //   }],
    //   "payable": false,
    //   "stateMutability": "nonpayable",
    //   "type": "function"
    // }, {
    //   "constant": true,
    //   "inputs": [{
    //     "name": "_owner",
    //     "type": "address"
    //   }],
    //   "name": "balanceOf",
    //   "outputs": [{
    //     "name": "balance",
    //     "type": "uint256"
    //   }],
    //   "payable": false,
    //   "stateMutability": "view",
    //   "type": "function"
    // }, {
    //   "constant": true,
    //   "inputs": [],
    //   "name": "symbol",
    //   "outputs": [{
    //     "name": "",
    //     "type": "string"
    //   }],
    //   "payable": false,
    //   "stateMutability": "view",
    //   "type": "function"
    // }, {
    //   "constant": false,
    //   "inputs": [{
    //     "name": "_to",
    //     "type": "address"
    //   }, {
    //     "name": "_value",
    //     "type": "uint256"
    //   }],
    //   "name": "transfer",
    //   "outputs": [],
    //   "payable": false,
    //   "stateMutability": "nonpayable",
    //   "type": "function"
    // }, {
    //   "constant": false,
    //   "inputs": [{
    //     "name": "_to",
    //     "type": "address"
    //   }, {
    //     "name": "_value",
    //     "type": "uint256"
    //   }, {
    //     "name": "_data",
    //     "type": "bytes"
    //   }],
    //   "name": "transfer",
    //   "outputs": [],
    //   "payable": false,
    //   "stateMutability": "nonpayable",
    //   "type": "function"
    // }, {
    //   "constant": false,
    //   "inputs": [{
    //     "name": "_spender",
    //     "type": "address"
    //   }, {
    //     "name": "_addedValue",
    //     "type": "uint256"
    //   }],
    //   "name": "increaseApproval",
    //   "outputs": [{
    //     "name": "",
    //     "type": "bool"
    //   }],
    //   "payable": false,
    //   "stateMutability": "nonpayable",
    //   "type": "function"
    // }, {
    //   "constant": true,
    //   "inputs": [{
    //     "name": "_owner",
    //     "type": "address"
    //   }, {
    //     "name": "_spender",
    //     "type": "address"
    //   }],
    //   "name": "allowance",
    //   "outputs": [{
    //     "name": "",
    //     "type": "uint256"
    //   }],
    //   "payable": false,
    //   "stateMutability": "view",
    //   "type": "function"
    // }, {
    //   "inputs": [{
    //     "name": "companyWallet",
    //     "type": "address"
    //   }],
    //   "payable": false,
    //   "stateMutability": "nonpayable",
    //   "type": "constructor"
    // }, {
    //   "payable": true,
    //   "stateMutability": "payable",
    //   "type": "fallback"
    // }, {
    //   "anonymous": false,
    //   "inputs": [{
    //     "indexed": true,
    //     "name": "from",
    //     "type": "address"
    //   }, {
    //     "indexed": true,
    //     "name": "to",
    //     "type": "address"
    //   }, {
    //     "indexed": false,
    //     "name": "value",
    //     "type": "uint256"
    //   }],
    //   "name": "Transfer",
    //   "type": "event"
    // }, {
    //   "anonymous": false,
    //   "inputs": [{
    //     "indexed": true,
    //     "name": "owner",
    //     "type": "address"
    //   }, {
    //     "indexed": true,
    //     "name": "spender",
    //     "type": "address"
    //   }, {
    //     "indexed": false,
    //     "name": "value",
    //     "type": "uint256"
    //   }],
    //   "name": "Approval",
    //   "type": "event"
    // }], '0x6608cfb31dbd57e229d94e1b961c8fa6b77e07db', {
    //   from: '0xdf037E815588059176361f616FE8Ffe2C067BE74', // default from address
    //   gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    // });

    // var AkiBalance = myContract.methods.balanceOf('0xFD273D2E31E0095228f9eE5367c31bBeB476296B').call({
    //   from: '0xFD273D2E31E0095228f9eE5367c31bBeB476296B'
    // }).then(function (result) {
    //   console.log(result);
    // });
    // console.log(AkiBalance);

    // myContract.methods.transfer('0xFD273D2E31E0095228f9eE5367c31bBeB476296B', 200).call({
    //   from: '0xdf037E815588059176361f616FE8Ffe2C067BE74'
    // }).then(function (result) {
    //   console.log(result);
    // });
    //require to use dateFormat library
    var dateFormat = require('dateformat');
    var now = new Date();
    // You can use one of several named masks
    var today = dateFormat(now, "isoDateTime");


    var timeValue;
    var period;

    var tokenSold = await Transaction.sum('amount')
      .where({
        'type': 'buy',
        'status': 1
      });
    var bthF = (await GetTx.sum('resultAmount')
      .where({
        'resultCoin': 'BTC',
        'resultStatus': 100,
      }) / 100000000);
    var ethF = (await GetTx.sum('resultAmount')
      .where({
        'resultCoin': 'ETH',
        'resultStatus': 100,
      }) / 100000000);

    // await sails.log.info(tokenSold);
    // await sails.log.info(bthF);
    // await sails.log.info(ethF);

    //Check for display timer according to period
    if (new Date(today).getTime() <= new Date(sails.config.counter.timer0Value).getTime()) {
      period = "0";
      // timeValue = sails.__('timer0-value');
      timeValue = sails.config.counter.timer0Value;
    }
    if (new Date(today).getTime() > new Date(sails.config.counter.timer0Value).getTime() &&
      (new Date(today).getTime() <= new Date(sails.config.counter.timer1Value).getTime())) {
      period = "1";
      // timeValue = sails.__('timer1-value');
      timeValue = sails.config.counter.timer1Value;
    }
    if (new Date(today).getTime() > new Date(sails.config.counter.timer1Value).getTime() &&
      (new Date(today).getTime() <= new Date(sails.config.counter.timer2Value).getTime())) {
      period = "2";
      // timeValue = sails.__('timer2-value');
      timeValue = sails.config.counter.timer2Value;
    }
    if (new Date(today).getTime() > new Date(sails.config.counter.timer2Value).getTime() &&
      (new Date(today).getTime() <= new Date(sails.config.counter.timer3Value).getTime())) {
      period = "3";
      // timeValue = sails.__('timer3-value');
      timeValue = sails.config.counter.timer3Value;
    }
    if (new Date(today).getTime() > new Date(sails.config.counter.timer3Value).getTime() &&
      (new Date(today).getTime() <= new Date(sails.config.counter.timer4Value).getTime())) {
      period = "4";
      // timeValue = sails.__('timer4-value');
      timeValue = sails.config.counter.timer4Value;
    }

    return exits.success({
      fullPage: true,
      today: today,
      period: period,
      timeValue: timeValue,
      tokenSold: tokenSold,
      ethFunded: ethF,
      bthFunded: bthF
    });
  }

};
