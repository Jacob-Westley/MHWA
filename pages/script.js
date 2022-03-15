document.getElementById("startButton").addEventListener("click", startFunction);
document.getElementById("aboutButton").addEventListener("click", aboutFunction);
document.getElementById("breathingButton").addEventListener("click", breathingFunction);
document.getElementById("nhsButton").addEventListener("click", nhsFunction);
document.getElementById("mindButton").addEventListener("click", mindFunction);
document.getElementById("backButton").addEventListener("click", backFunction);

    function startFunction() { location.href = "http://localhost:9000/home"; }        
    function aboutFunction() { location.href = "http://localhost:9000/about"; }
    function breathingFunction() { location.href = "http://localhost:9000/breathing"; }
    function nhsFunction() { location.href = "https://www.nhs.uk/mental-health/"; }
    function mindFunction() { location.href = "https://www.nhs.uk/mental-health/"; }
    function backFunction() { location.href = "http://localhost:9000"; }  

