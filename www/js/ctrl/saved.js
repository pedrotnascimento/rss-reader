(function(){
angular.module('starter')
.controller('Saved', function($scope, $saved){
    $scope.test="abc";
    console.log(JSON.stringify($saved));
    $scope.saves = $saved.load();
});//fim controller
})();//fim do arquivo 
