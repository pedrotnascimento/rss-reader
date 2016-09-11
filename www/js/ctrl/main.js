(function(){

angular.module('starter')
.controller('Main', ['$scope', 'FeedService',function($scope,  Feeding){
    $scope.feeds= [];
    url = "tes";
    $scope.test= "abc";
    
    function Feed(feed) {
        var self = {};
        /*
        self[feed.title] = {};
        self[feed.title].title = feed.title;
        self[feed.title].entries = feed.entries;
        self[feed.title].show = false;
        */
        self = {};
        self.title = feed.title;
        self.entries = feed.entries;
        self.show = false;
        return self;
    }
  var user_feeds =[
      "http://g1.globo.com/dynamo/rss2.xml", "http://revistaepoca.globo.com/Revista/Epoca/Rss/0,,EDT0-15224,00.xml"
     
  ]; 
  
  for (var i = 0; i < user_feeds.length; i++){
  Feeding.parseFeed(user_feeds[i]).then(function(res){
      $scope.feeds.push(Feed(res.data.responseData.feed));
    });
  }
    //http://feeds2.feedburner.com/Mashable
    //http://g1.globo.com/dynamo/rss2.xml
   
   var last_feed_shown_inx = 0;  
   $scope.changeDisplay = function(index){
       
       if(last_feed_shown_inx!=index){
        $scope.feeds[last_feed_shown_inx].show = false;
        last_feed_shown_inx = index; 
       }
       $scope.feeds[index].show = !$scope.feeds[index].show;
       
   } 
    
}])//fim controller
.factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);
})();