document.addEventListener("DOMContentLoaded", function() {
  var form = document.querySelector("form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    if (validateForm()) {
      form.submit(); // Submit the form if validation passes
    }
  });

  function validateForm() {
    var idNumberInput = document.querySelector('input[name="id_number"]');
    var nameInput = document.querySelector('input[name="name"]');
    var vehicleRegistrationInput = document.querySelector('input[name="vehicle_registration"]');
    var phoneNumberInput = document.querySelector('input[name="phone_number"]');
    var companyInput = document.querySelector('input[name="company"]');
    var idPictureFrontInput = document.querySelector('input[name="id_picture_front1"]');
    var vehiclePictureInput = document.querySelector('input[name="id_picture_front2"]');

    var errors = [];

    // Clear existing error messages
    clearErrors();

    // ID number validation
    if (!/^\d{8}$/.test(idNumberInput.value.trim())) {
      errors.push({ input: idNumberInput, message: "ID number should contain 8 digits only." });
    }

    // Name validation
    if (!/^[A-Za-z\s]+$/.test(nameInput.value.trim())) {
      errors.push({ input: nameInput, message: "Name should contain letters  only." });
    }

    // Vehicle registration validation
    if (!/^[A-Za-z0-9\s]+$/.test(vehicleRegistrationInput.value.trim())) {
      errors.push({ input: vehicleRegistrationInput, message: "Vehicle registration should contain alphanumeric characters and spaces only." });
    }

    // Phone number validation
    if (!/^0[0-9]{9}$/.test(phoneNumberInput.value.trim())) {
      errors.push({ input: phoneNumberInput, message: "Phone number should start with 0 and contain 10 digits." });
    }

    // Company validation
    if (!/^[A-Za-z\s]+$/.test(companyInput.value.trim())) {
      errors.push({ input: companyInput, message: "Company should contain letters  only." });
    }

    // ID picture validation
    if (!idPictureFrontInput.value) {
      errors.push({ input: idPictureFrontInput, message: "Please capture the ID photo." });
    }

    // Vehicle picture validation
    if (!vehiclePictureInput.value) {
      errors.push({ input: vehiclePictureInput, message: "Please capture the vehicle photo." });
    }

    // Display errors or return validation result
    if (errors.length > 0) {
      displayErrors(errors);
      return false; // Validation failed
    }

    return true; // Validation passed
  }

  function clearErrors() {
    var errorElements = document.getElementsByClassName("error");
    Array.from(errorElements).forEach(function(element) {
      element.textContent = "";
      element.previousElementSibling.classList.remove("error");
    });
  }

  function displayErrors(errors) {
    errors.forEach(function(error) {
      var input = error.input;
      var message = error.message;
      var errorElement = document.createElement("div");
      errorElement.textContent = message;
      errorElement.classList.add("error");
      input.parentNode.insertBefore(errorElement, input.nextElementSibling);
      input.classList.add("error");
    });
  }
});
