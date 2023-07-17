document.addEventListener("DOMContentLoaded", function() {
  var userButton = document.getElementById("userButton");
  var visitorButton = document.getElementById("visitorButton");
  var exitWithVehicleButton = document.getElementById("exitWithVehicleButton");
  var exitWithoutVehicleButton = document.getElementById("exitWithoutVehicleButton");

  if (userButton) {
    userButton.addEventListener("click", function() {
      // Perform actions when "With vehicle" button is clicked
      // ...
    });
  }

  if (visitorButton) {
    visitorButton.addEventListener("click", function() {
      // Perform actions when "Without vehicle" button is clicked
      // ...
    });
  }

  if (exitWithVehicleButton) {
    exitWithVehicleButton.addEventListener("click", function() {
      // Perform actions when "Exit with vehicle" button is clicked
      // ...
    });
  }

  if (exitWithoutVehicleButton) {
    exitWithoutVehicleButton.addEventListener("click", function() {
      // Perform actions when "Exit without vehicle" button is clicked
      // ...
    });
  }
});




//prevent right clicking 
//document.addEventListener("contextmenu", function(e) {
  //e.preventDefault();
//});