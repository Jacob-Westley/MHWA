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

