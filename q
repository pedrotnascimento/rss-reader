warning: LF will be replaced by CRLF in www/index.html.
The file will have its original line endings in your working directory.
[1mdiff --git a/www/index.html b/www/index.html[m
[1mindex 8c0ac09..6e742c9 100644[m
[1m--- a/www/index.html[m
[1m+++ b/www/index.html[m
[36m@@ -21,6 +21,7 @@[m
     <!-- your app's js -->[m
     <script src="js/app.js"></script>[m
     <script src="js/ctrl/main.js"></script>[m
[32m+[m[32m    <script src="js/ctrl/user.js"></script>[m
   </head>[m
   <body ng-app="starter">[m
 [m
[36m@@ -29,6 +30,7 @@[m
         <h1 class="title">RSS-Reader</h1>[m
       </ion-header-bar>[m
       <ion-content>[m
[32m+[m
           <ion-nav-view> </ion-nav-view><!-- //ESSA LINHA É NECESSARIA -->[m
       </ion-content>[m
     </ion-pane>[m
[36m@@ -36,3 +38,13 @@[m
     [m
   </body>[m
 </html>[m
[32m+[m
[32m+[m[32m<!--[m
[32m+[m[32mnext-versions:[m
[32m+[m[32m- função de adicionar tags para filtro[m
[32m+[m[32m- função de buscar e adicionar rss.[m
[32m+[m[32m- função de buscar notícias dentro do feed[m
[32m+[m[32m- função de buscar notícias relevantes mesmo que não esteja no feed[m
[32m+[m[32m- fazer estudo sobre apis do google[m
[32m+[m[32m- talvez troque descrição por imagem[m[41m     [m
[32m+[m[32m-->[m
\ No newline at end of file[m
[1mdiff --git a/www/js/app.js b/www/js/app.js[m
[1mindex 75bc2c2..16da86e 100644[m
[1m--- a/www/js/app.js[m
[1m+++ b/www/js/app.js[m
[36m@@ -26,10 +26,29 @@[m [mangular.module('starter', ['ionic'])[m
 })[m
 .config(function($stateProvider,  $urlRouterProvider){[m
     $stateProvider[m
[31m-    .state('feeds', {[m
[32m+[m[32m              .state('app', {[m
[32m+[m[32m              url: '/app',[m
[32m+[m[32m              abstract: true,[m
[32m+[m[32m              templateUrl: 'templates/menu.html'[m
[32m+[m[32m          })[m
[32m+[m
[32m+[m[32m    .state('app.feeds', {[m
               url: '/feeds',[m
[31m-              templateUrl: 'templates/feeds.html',[m
[31m-              controller: 'Main'[m
[31m-            }); [m
[32m+[m[32m              views:{[m
[32m+[m[32m                'menuContent':{[m
[32m+[m[32m                        templateUrl: 'templates/feeds.html',[m
[32m+[m[32m                        controller: 'Main'[m
[32m+[m[32m                }[m
[32m+[m[32m              }[m
[32m+[m[32m            })[m
[32m+[m[32m    .state('app.user', {[m
[32m+[m[32m      url: '/user',[m
[32m+[m[32m      views:{[m
[32m+[m[32m        'menuContent':{[m
[32m+[m[32m                templateUrl: 'templates/user.html',[m
[32m+[m[32m                controller: 'User'[m
[32m+[m[32m        }[m
[32m+[m[32m      }[m
[32m+[m[32m    });[m[41m [m
     $urlRouterProvider.otherwise('/feeds');//ESSA LINHA É NECESSARIA[m
 });[m
[1mdiff --git a/www/js/ctrl/main.js b/www/js/ctrl/main.js[m
[1mindex 3030bac..329c9e1 100644[m
[1m--- a/www/js/ctrl/main.js[m
[1m+++ b/www/js/ctrl/main.js[m
[36m@@ -1,7 +1,7 @@[m
 (function(){[m
 [m
 angular.module('starter')[m
[31m-.controller('Main', ['$scope', 'FeedService', '$interval',function($scope,  Feeding, $interval){[m
[32m+[m[32m.controller('Main', ['$scope', 'FeedService', '$interval', '$state',function($scope,  Feeding, $interval, $state){[m
     $scope.feeds= [];[m
     url = "tes";[m
     $scope.test= "abc";[m
[36m@@ -60,11 +60,16 @@[m [mfunction(res) {[m
        [m
    };[m
    $interval(function(){[m
[31m-       if(!scope.feeds)[m
[32m+[m[32m       if(!$scope.feeds)[m
             loadFeeds();           [m
             [m
    }, 4000, 3);[m
[31m-   [m
[32m+[m
[32m+[m[32m   $scope.go = function (state) {[m
[32m+[m[32m       console.log("heasf");[m
[32m+[m[32m       $state.go(state);[m
[32m+[m[32m   }[m
[32m+[m
 }])//fim controller[m
 .factory('FeedService',['$http',function($http){[m
     return {[m
[36m@@ -76,5 +81,6 @@[m [mfunction(res) {[m
             [m
         }[m
     }[m
[32m+[m[41m   [m
 }]);[m
 })();[m
\ No newline at end of file[m
warning: LF will be replaced by CRLF in www/js/app.js.
The file will have its original line endings in your working directory.
