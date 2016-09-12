(function(){
angular.module('starter')
.controller('Tags', function($scope, $http){
    $scope.test="abc";

    $http.get('js/ctrl/localData/interests.txt').then(
         function (data) {
             $scope.interestsGroups = data.data.data;
             for (var i in $scope.interestsGroups)
                    $scope.interestsGroups[i].show = false;
             console.log($scope.interestsGroups);
    },
        function(res){
            console.log(res);
    }
    );

    var last_feed_shown_inx = 0;  
   $scope.changeDisplay = function(index){
       
       if(last_feed_shown_inx!=index){
        $scope.interestsGroups[last_feed_shown_inx].show = false;
        last_feed_shown_inx = index; 
       }
       $scope.interestsGroups[index].show = !$scope.interestsGroups[index].show;
       
   };
    
});//fim controller
})();//fim do arquivo 
