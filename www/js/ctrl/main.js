(function(){

angular.module('starter')
.controller('Main', 
    function($scope, FeedService, $interval, $state, $tags, $rootScope, $saved, $localStorage, $cordovaSocialSharing,
                $ionicPopup){
    $scope.mode = true;
    var feed_received = false;
    function init_feeds(){
        $scope.feeds= [{
            title:"Interessantes",
            entries:[],
            show: false
        }];
    }
    init_feeds();
    url = "tes";
    $scope.test= "abc";
    
    //Feed constructor,
    //title, name of the feed
    //entries, news of the feed
    //show, toggle view in accordion list 
    function Feed(feed) {
        var self = {};
        self = {};
        var GoogleIdentifier = "Google Notícias";
        self.title = feed.description != GoogleIdentifier? feed.title : preProcesTitle(feed.title);
        self.entries = feed.entries;
        self.show = false;
        self.url = feed.feedUrl;  
        return self;
        function preProcesTitle(title){
            var title = title.split("- " + GoogleIdentifier)
            return title[0];
        }
    }
  var user_feeds =[
      "http://g1.globo.com/dynamo/rss2.xml", 
      "http://revistaepoca.globo.com/Revista/Epoca/Rss/0,,EDT0-15224,00.xml",
      "https://news.google.com/news?output=rss&q=belford+roxo&ned=pt-BR_br"
      //"http://knowyourmeme.com/newsfeed.rss",
      
  ]; 

  function loadFeeds(){
    for (var i = 0; i < user_feeds.length; i++){
    FeedService.parseFeed(user_feeds[i]).then(function(res){
        feed_received = true;
        $scope.feeds.push(Feed(res.data.responseData.feed));
        var feed_index = $scope.feeds.length-1;
        filter($scope.feeds[feed_index]);   
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

   //if still dont have feed, reload feeds
   $interval(function(){
       if(!feed_received)
            loadFeeds();
   }, 4000, 3);

   //go to state(app screen)
   $scope.go = function (state) {
       $state.go(state);
   }

   //refresh filter after added interests
   $rootScope.$on('$stateChangeStart', 
        function(event, toState, toParams, fromState, fromParams, options){
            if(toState.name=="app.feeds" &&
                fromState.name=="app.tags")
                for(var i =1; i < $scope.feeds.length; i++)
                    filter($scope.feeds[i]);
    });

    //receives feeds and add interestings news(news with user tags inside) and put as interesting 
    function filter(feeds){
        var tags_loaded = $tags.load();
        //console.log(tags_loaded);
        //console.log(feeds);
        for(var j =0; j< feeds.entries.length; j++){
            evaluateNews(feeds.entries[j]);
        }
        function evaluateNews(news){
            var bagOfWords = news.categories + ",";
            var bagOfWords = bagOfWords + news.title.split(' ') + ",";
            var bagOfWords = bagOfWords + news.contentSnippet.split(' ');
            var bagOfWords = bagOfWords + news.content.split(' ');
            // console.log(bagOfWords);

            //FIX-ME: ou o código está duplicando noticias, ou noticias estao vindo duplicadas
            for(var i in tags_loaded){
                for(var j in tags_loaded[i]) {
                    if(bagOfWords.search(j) != -1){

                        if(!$scope.feeds[0].entries.length){
                            $scope.feeds[0].entries.push(news);
                            return true;
                        }
                        for(var k in $scope.feeds[0].entries){
                            //console.log(k, $scope.feeds[0].entries[k].$$hashKey);
                            if( $scope.feeds[0].entries[k].$$hashKey == news.$$hashKey){
                                return true;
                            }
                        }
                        $scope.feeds[0].entries.push(news);
                        return true;      
                    }
                }
            }
        }
    };

    $scope.save = function(feed, index){
        var news = feed.entries[index];
        news.source = feed.title
        $saved.save(news);
        $scope.share(news);
    }

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

    $scope.changeMode = function(){
        $scope.mode = ! $scope.mode;
        if($scope.mode)
           user_feeds =[
            "http://g1.globo.com/dynamo/rss2.xml", 
            "http://revistaepoca.globo.com/Revista/Epoca/Rss/0,,EDT0-15224,00.xml",
            "https://news.google.com/news?output=rss&q=belford+roxo&ned=pt-BR_br"
            //"http://knowyourmeme.com/newsfeed.rss",  
            ];
        else{
         user_feeds =[
            "https://news.google.com/news?output=rss&q=política&ned=pt-BR_br",
            "https://news.google.com/news?output=rss&q=tecnologia&ned=pt-BR_br",
            "https://news.google.com/news?output=rss&q=economia&ned=pt-BR_br",
            "https://news.google.com/news?output=rss&q=saúde+e+bem+estar&ned=pt-BR_br",
            "https://news.google.com/news?output=rss&q=games&ned=pt-BR_br",
            "https://www.google.com.br/alerts/feeds/08393515450153141011/3152943385791131093"
            ];
        }

        init_feeds()
        loadFeeds();
    }

    $scope.goNews = function(news){
        window.open(news.link, '_self');
    }


})
.factory('FeedService',['$http',function($http){
return {
    parseFeed : function(url){
        var feed = $http.jsonp('http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        //TROQUEI  '//ajax.google...'  por 'https://ajax.google... e FUNCIONOU
    return feed;
    }
}
}]);
})();