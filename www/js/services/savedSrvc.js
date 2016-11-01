angular.module('starter')
.service('$saved', function($localStorage){
    if(undefined == $localStorage.saved_news){
        var saves = {};
        $localStorage.saved_news = this.saves;
    } 
    else{
        var saves = $localStorage.saved_news;
    }

    this.save = function(news){
        var len = Object.keys(saves).length;
        if(! (news in saves))
            saves[len] = news;
    }

    this.load = function(){
        return saves;
    }
});