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
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
    } else {
        // Specify default instance if no web3 instance provided
        App.web3Provider = new Web3.provider.HttpProvider('http://localhost:7545');
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
    })

    return App.render();
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
        App.account = account;
        $("accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
