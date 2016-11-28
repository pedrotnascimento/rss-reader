(function(){
angular.module('starter')
.controller('Saved', function($scope, $saved, $ionicPopup){
    $scope.test="abc";
    console.log(JSON.stringify($saved));
    $scope.saves = $saved.load();

    $scope.share = function (news){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Compartilhar no Whatsapp?',
            template: 'Toque OK para compartilhar'
        });

        confirmPopup.then(function(res) {
            if(res) {
                send(news);
            } else {
            console.log('You are not sure');
            }
        });
        function send(news){
            var message = news.contentSnippet;
            var image = null;
            var link = news.link;
            $cordovaSocialSharing.shareViaWhatsApp(message, image, link)
                .then(function(result) {
                console.log(result);
                }, function(err) {
                // An error occurred. Show a message to the user
                console.log(err);
                });
        }
    }

    $scope.goNews = function(news){
        window.open(news.link, '_self')
    }

    $scope.deleteNews = function(news){
        for(var i in $scope.saves){
            if($scope.saves[i] == news){
                delete $scope.saves[i];
            }
        }
    }

});//fim controller
})();//fim do arquivo 
