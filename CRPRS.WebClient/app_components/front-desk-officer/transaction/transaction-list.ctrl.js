(function () {
    "use strict";

    function transactionList($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = "transaction_list";

        function activate() { }

        activate();
    }

    angular
        .module("mainRPRS.frontDeskOfficer")
        .controller("transactionList", transactionList);

    transactionList.$inject = ["$location"];
})();
