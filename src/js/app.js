App = {
  web3Provider: null,
  contracts: {},
  account: 0x0 ,

  init: async function() {
    return await App.initWeb3();
  },

   /*
     * Exact duty of this function is  to have a connection beetween
     * our web application (in browser, rendered index.html)
     * to the blockchain (ganache was shown) running inside the system
     */
  initWeb3: async function() {
    if (typeof web3 !== 'undefined') {
        // If a web3 instance is already provided by Meta Mask
        App.web3Provider = window.ethereum;
        web3 = new Web3(window.ethereum);
    } else {
        // Specify default instance if no web3 instance provided
        App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Contest.json", function(contest) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Contest = TruffleContract(contest);
      // Connect provider to interact with contract
      App.contracts.Contest.setProvider(App.web3Provider);

    return App.render();
    });
  },

  render: function() {
    var contestInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        // web3.eth.getAccounts().then (function(accounts) {Account1st = accounts[0] });
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Contest.deployed().then(function(instance){
      contestInstance = instance;
      return contestInstance.contestantsCount();
    }).then(function(contestantsCount){
      var contestantsResults = $("#contestantsResults");
      contestantsResults.empty();

      for (var i = 1; i <= contestantsCount; i++) {
        contestInstance.contestants(i).then(function(contestant){
          var id = contestant[0];
          var name = contestant[1];
          var voteCount = contestant[2];

          // Render contestant Result
          var contestantTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          contestantsResults.append(contestantTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }


};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
