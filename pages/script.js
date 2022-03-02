

document.getElementById("startButton").addEventListener("click", startFunction);

  function startFunction() {

    location.href = "http://localhost:9000/home";

  }

document.getElementById("about").addEventListener("click", aboutFunction);

  function aboutFunction() {

    location.href = "http://localhost:9000/about";

  }





  
let slider = document.getElementById("feelingRange");
let output = document.getElementById("valueOut");
let feelingVal = document.getElementById("feelingOut");

// while (this.value = 1) {
//     feelingVal.innerHTML = "Terrible";
// } 

// while (this.value = 2) {
//     feelingVal.innerHTML = "Sad";
// } 

// while (this.value = 3) {
//     feelingVal.innerHTML = "Fine";
// }

// while (this.value = 4) {
//     feelingVal.innerHTML = "Good";
// }

// while (this.value = 5) {
//     feelingVal.innerHTML = "Amazing";
// }

output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

