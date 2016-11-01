angular.module('starter')
.service('$saved', function($localStorage){
    if("undefined" == typeof $localStorage.saved_news){
        var saves = {};
        $localStorage.saved_news = saves;
    } 
    else{
        var saves = $localStorage.saved_news;
    }

    this.save = function(news){
        var len = Object.keys(saves).length;
        for(var i in saves){
            if(JSON.stringify(saves[i]) == JSON.stringify(news))
                return false;  
        }
        saves[len] = news;
    }

    this.load = function(){
        return saves;
    }
});