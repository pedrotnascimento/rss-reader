(function(){
angular.module('starter')
.controller('Tags', function($scope, $http, $tags){
    //$scope.test="abc";
    $http.get('js/ctrl/localData/interests.txt').then(
         function (data) {
             $scope.interestsGroups = data.data.data;
             for (var i in $scope.interestsGroups){
                    $scope.interestsGroups[i].show = false;
                    //console.log($scope.interestsGroups[i]);
                    for(var j in $scope.interestsGroups[i].entries){
                            var foo = $tags.isTagSaved($scope.interestsGroups[i].entries[j].name, $scope.interestsGroups[i].category);
                            //console.log($scope.interestsGroups[i][j][k]); 
                            $scope.interestsGroups[i].entries[j].marked = foo;
                    }
             }
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

   $scope.addInterest = $tags.add;

   $scope.addGroup = function(interests, group){
    for(var i =0; i< interests.length; i++){
        interests[i].marked = !interests[i].marked; 
        $scope.addInterest(interests[i], group);
    }

   }
    
});//fim controller
})();//fim do arquivo 
