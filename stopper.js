const PI = 3.141593
PI > 3.0
console.log(PI)


class Stopper {

    constructor() {
        //this.eltelt = 0;
    }


    start() {
        var ido = 0; 
        var timer = setInterval((function() { ido++; 
            //console.log(ido)
            let perc = Math.floor(ido/100/60).toLocaleString('en-US', { //ezzel elérem hogy szép 00 alakú legyen
                minimumIntegerDigits: 2,
                useGrouping: false
              });
            let mp = Math.floor(ido/100%60).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              });
            let szmp = (ido % 100).toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
              });

            var textido = perc + ":" + mp + ":" + szmp
            document.getElementById("ido").innerHTML = textido;
        }), 1); //10 legyen
    }

    /*
    start() {
        var ido = 0; 
        var timer = setInterval((function(scope) {return function() {scope.update(scope);};})(this), 10); //itt az updatet akarom meghívni, de mivel a setInterval-ban a 'this' az a 'window', így trükközök

    }
    update(scope){
        ido++ 
        //scope.eltelt+=1;
        console.log(ido);
        document.getElementById("ido").innerHTML = ido;
    }*/

}

function create(){
    let mainStopper = new Stopper(0);
    mainStopper.start();
}
