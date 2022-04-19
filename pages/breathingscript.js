function breatheFunction() {
    
    function toggleCalls() {

        var timer = {timeout: null};

        function callA () {
            console.log(" Breathing Exercise - A Called");
            document.getElementById("breathingTime").innerHTML = "Breathe In";            
            timer.timeout = setTimeout(callB, 4000);
        }

        function callB () {
            console.log("Breathing Exercise - B Called");
            document.getElementById("breathingTime").innerHTML = "Breathe Out";
            timer.timeout = setTimeout(callA, 4000);
        }

        callA();
        return timer;
    }

    var timer = toggleCalls();
    setTimeout(function () {
    clearTimeout(timer.timeout);

    console.log("Breathing Exercise - Finished");
    document.getElementById("breathingTime").innerHTML = "Stopped";

    }, 120000);
}