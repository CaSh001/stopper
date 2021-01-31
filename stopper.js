class Stopper {

    constructor() {
        this.paused = false;
        this.ido = 0;
        this.timer = null;
        this.start();
    }
    /*
    set paused  (paused)  { this._paused = paused               }
    get paused  ()       { return this._paused                }
    set ido  (ido)  { this._ido = ido               }
    get ido  ()       { return this._ido                }*/

    start() {
    var self = this;
    document.getElementById("controls").innerHTML= `
    <button id="pause">Pause</button>
    <button id="stop">Stop</button>
    `;
    document.getElementById("pause").onclick = function() { self.pause(); };
    document.getElementById("stop").onclick = function() { self.stop(); };

    this.timer = setInterval((function(scope) {return function() {
        scope.update(scope);};})(this), 10); //10 az egy századmásodperc

    }

    pause(){
        if(this.paused){
            this.paused = false;
        }else{
            this.paused = true;
        }
        
    }
    
    stop(){
        clearInterval(this.timer); 
        console.log(this.timer);
        document.getElementById("ido").innerHTML = "00:00:00";
        //vissza kéne állítani a controlst
    }

    update(scope){
        if(!scope.paused){
            scope.ido++; //talán pontosabb lenne ha csak lekérem az időt
            let perc = Math.floor(scope.ido/100/60).toLocaleString('en-US', { //ezzel elérem hogy szép 00 alakú legyen
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            let mp = Math.floor(scope.ido/100%60).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            let szmp = (scope.ido % 100).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });

            let textido = perc + ":" + mp + ":" + szmp;
            document.getElementById("ido").innerHTML = textido;
            }
    }
}

function create(){
    var mainStopper = new Stopper();
    
}