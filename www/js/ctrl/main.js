(function(){

angular.module('starter')
.controller('Main', 
                function($scope,  FeedService, $interval, $state, $tags, $rootScope, $saved, $localStorage){
    
    $localStorage.saving = "hey";
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
  function loadFeeds(){
    for (var i = 0; i < user_feeds.length; i++){
    FeedService.parseFeed(user_feeds[i]).then(function(res){
        $scope.feeds.push(Feed(res.data.responseData.feed));
        },
        function(res) {
            // everything in here rejected
            alert(JSON.stringify(res));
        },
        function(res) {
            // everything in here pending (with progress back)
            alert(JSON.stringify(res));
        }  
        );
    }
  }
  loadFeeds();
    //http://feeds2.feedburner.com/Mashable
    //http://g1.globo.com/dynamo/rss2.xmxl
   
   var last_feed_shown_inx = 0;  
   $scope.changeDisplay = function(index){
       
       if(last_feed_shown_inx!=index){
        $scope.feeds[last_feed_shown_inx].show = false;
        last_feed_shown_inx = index; 
       }
       $scope.feeds[index].show = !$scope.feeds[index].show;
       
   };
   $interval(function(){
       if(!$scope.feeds)
            loadFeeds();
   }, 4000, 3);

   $scope.go = function (state) {
       $state.go(state);
   }

   $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams, options){
            if(toState.name=="app.feeds" &&
                fromState.name=="app.tags")
                filter();

    });

    function filter(){
        /*
    criterias = []										// array which will have the words for each criteria
	titleWords = split(' ', news.title)					// split the title news words
	descriptionWords = split(' ', news.description)		// split the description news words
	criterias.push(titleWords)
	criterias.push(descriptionWords)
	
	foreach criteria in criterias 			
		foreach word in criteria						// loop in the criterias for some criteria like title or description
			if word in tags 							//if the word is the tags array
				return true
	return false

        */
        for(var i =0 ; i < $scope.feeds.length; i++)
            for(var j =0; j< $scope.feeds[i].entries.length; j++)
                evaluateNews($scope.feeds[i].entries[j]);
        
        function evaluateNews(news){
            var bagOfWords = news.categories + ",";
            var bagOfWords = bagOfWords + news.title.split(' ') + ","   ;
            var bagOfWords = bagOfWords + news.contentSnippet.split(' ');
            
            for(var i in $tags.tags){
                for(var j in $tags.tags[i]) {
                    console.log($tags.tags[i][j]);
                    if(bagOfWords.search($tags.tags[i][j]) != -1){
                        console.log("achou");
                    }
                }
            }

        }
    }

    $scope.save = function(feed, index){
        var news = feed.entries[index];
        news.source = feed.title
        var len = Object.keys($saved.saves).length;
        $saved.saves[len] = news;
        console.log(JSON.stringify($saved.saves));
    }

   })
   .factory('FeedService',['$http',function($http){
    return {
        parseFeed : function(url){
            var some = $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
            //TROQUEI  '//ajax.google...'  por 'https://ajax.google... e FUNCIONOU
        return some;

            
        }
    }
}]);
})();