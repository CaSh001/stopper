class Stopper {

    constructor() {
        this.paused = false;
        this.ido = 0;
        this.timer = null;
        this.blank = null;
        this.kezdet = new Date();
        this.taroltIdo = 0;
        this.start();
    }

    start() {
        this.blank = document.getElementById("controls").innerHTML;
        var self = this;
        document.getElementById("controls").innerHTML= `
        <button id="flag">Flag</button>
        <button id="pause">Pause</button>
        <button id="stop">Stop</button>
        `;
        document.getElementById("flag").onclick = function() { self.flag(); };
        document.getElementById("pause").onclick = function() { self.pause(); };
        document.getElementById("stop").onclick = function() { self.stop(); };

        this.timer = setInterval((function(scope) {return function() {
            scope.update(scope);};})(this), 10); //10 az egy századmásodperc

    }

    flag(){
        let eddigi = document.getElementById("saves").innerHTML;
        document.getElementById("saves").innerHTML = eddigi + "<br>" + this.szmpToDigital(this.ido);
    }

    pause(){
        if(this.paused){ //folytatás pausebol
            this.kezdet = new Date();
            this.paused = false;
        }else{ //pause-olás
            this.taroltIdo = this.ido;
            this.paused = true;
        }
    }
    
    stop(){
        clearInterval(this.timer); 
        document.getElementById("ido").innerHTML = "00:00:00";
        
        document.getElementById("controls").innerHTML= this.blank; //controls alaphelyzetbe
        document.getElementById("saves").innerHTML= "";
    }

    update(scope){
        if(!scope.paused){
            scope.jelen = new Date();
            scope.ido = (scope.jelen - scope.kezdet); //ez milisecet ad, sokkal pontosabban mint ha incrementálnám az idot
            scope.ido = Math.floor(scope.ido/10) + scope.taroltIdo; //átváltom mert eddig szmp-ben dolgoztam
            let textido = scope.szmpToDigital(scope.ido);
            document.getElementById("ido").innerHTML = textido;
            }
    }

    szmpToDigital(osszesSzmp){
        let perc = Math.floor(osszesSzmp/100/60).toLocaleString('en-US', { //ezzel elérem hogy szép 00 alakú legyen
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        let mp = Math.floor(osszesSzmp/100%60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        let szmp = (osszesSzmp % 100).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        return perc + ":" + mp + ":" + szmp;
    }
}

function create(){
    var mainStopper = new Stopper();
}