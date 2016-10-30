angular.module('starter')
.service('$tags', function($localStorage){

    if(undefined == $localStorage.tags){
        var tags = {};
        $localStorage.tags = tags;
    } 
    else{
        var tags = $localStorage.tags;
    }

   //$localStorage.$reset();//RESET
    this.add = function(interest, category){   
        //if(undefined == this.tags[category])//ESSA LINHA DÁ ERRO EM SERVICE MAS NÃO DÁ NO CONTROLLER
                                             //SOLUÇÃO: NÃO É THIS.TAGS É VAR TAGS(linha 3)
        var interest_id = interest.name;
        if(undefined == tags[category]) 
                tags[category] = {};
        if(undefined == tags[category][interest_id]){    
            tags[category][interest.name] = interest;  
        } 
        else{
            delete tags[category][interest_id];
        }
        //console.log(JSON.stringify($localStorage.tags));
   }

   this.load = function ( ){
       return tags;
   }

   this.isTagSaved = function(interest, category){
       return  !("undefined" == typeof tags[category] ||  "undefined" == typeof tags[category][interest]);
   }

   

});