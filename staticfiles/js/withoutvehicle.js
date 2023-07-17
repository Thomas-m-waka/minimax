document.addEventListener('DOMContentLoaded', function() {
  var video = document.getElementById('videoFeed');
  var image = document.getElementById('image');
  var deleteButton = document.getElementById('deleteButton');
  var submitButton = document.getElementById('submitButton');
  var otherPurposeContainer = document.getElementById('other-purpose-container');

  // Start camera button click event handler
  document.getElementById('startCameraButton').addEventListener('click', function() {
    var cameraType = 'environment'; // 'user' for front camera, 'environment' for back camera
    initializeCamera(cameraType);
    document.getElementById('startCameraButton').disabled = true;
    document.getElementById('captureButton').disabled = false;
  });

  // Capture button click event handler
  document.getElementById('captureButton').addEventListener('click', function() {
    captureIDPicture('id_picture', image);
    document.getElementById('captureButton').disabled = true;
    deleteButton.disabled = false;
    submitButton.disabled = false;
    deactivateCamera();
  });

  // Delete image button click event handler
  deleteButton.addEventListener('click', function() {
    deleteImage(image, 'id_picture', deleteButton);
    document.getElementById('captureButton').disabled = false;
    deleteButton.disabled = true;
    submitButton.disabled = true;
    activateCamera();
  });

  // Purpose selection change event handler
  document.getElementById('purpose').addEventListener('change', function() {
    if (this.value === 'Other') {
      otherPurposeContainer.style.display = 'block';
    } else {
      otherPurposeContainer.style.display = 'none';
      document.getElementsByName('other_purpose')[0].value = '';
    }
  });

  // Form submit event handler
  document.getElementById('submitButton').addEventListener('click', function() {
    if (validateForm()) {
      document.getElementById('verificationForm').submit();
      document.getElementById('imageForm').submit();
    }
  });

  // Function to validate the form inputs
  function validateForm() {
    var idNumberInput = document.getElementsByName('id_number')[0];
    var companyInput = document.getElementsByName('company')[0];
    var phoneNumberInput = document.getElementsByName('phone_number')[0];
    var nameInput = document.getElementsByName('name')[0];
    var purposeInput = document.getElementsByName('purpose')[0];
    var otherPurposeInput = document.getElementsByName('other_purpose')[0];
    var idNumberError = document.getElementById('idNumberError');
    var companyError = document.getElementById('companyError');
    var phoneNumberError = document.getElementById('phoneNumberError');
    var nameError = document.getElementById('nameError');
    var purposeError = document.getElementById('purpose-error');
    var otherPurposeError = document.getElementById('other-purpose-error');

    // Clear previous error messages
    idNumberError.textContent = '';
    companyError.textContent = '';
    phoneNumberError.textContent = '';
    nameError.textContent = '';
    purposeError.textContent = '';
    otherPurposeError.textContent = '';

    var errors = [];

    // Validate ID Number (should be 8 digits)
    if (idNumberInput.value.length !== 8) {
      errors.push('ID Number should be 8 digits.');
    }

    // Validate Company (should contain only characters)
    var companyRegex = /^[a-zA-Z\s]+$/;
    if (!companyRegex.test(companyInput.value)) {
      errors.push('Company should contain only characters.');
    }

    // Validate Phone Number (should be 10 digits starting with 0)
    var phoneNumberRegex = /^0\d{9}$/;
    if (!phoneNumberRegex.test(phoneNumberInput.value)) {
      errors.push('Phone Number should be 10 digits starting with 0.');
    }

    // Validate Name (should contain only characters)
    var nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(nameInput.value)) {
      errors.push('Name should contain only characters.');
    }

    // Validate Purpose (should not be empty)
    if (purposeInput.value === '') {
      errors.push('Purpose is required.');
    }

    // Validate Other Purpose (should not be empty if Purpose is Other)
    if (purposeInput.value === 'Other' && otherPurposeInput.value.trim() === '') {
      errors.push('Other Purpose is required when Purpose is set to Other.');
    }

    // Display error messages, if any
    if (errors.length > 0) {
      errors.forEach(function(error) {
        var errorMessage = document.createElement('li');
        errorMessage.textContent = error;

        if (error.includes('ID Number')) {
          idNumberError.appendChild(errorMessage);
        } else if (error.includes('Company')) {
          companyError.appendChild(errorMessage);
        } else if (error.includes('Phone Number')) {
          phoneNumberError.appendChild(errorMessage);
        } else if (error.includes('Name')) {
          nameError.appendChild(errorMessage);
        } else if (error.includes('Purpose')) {
          purposeError.appendChild(errorMessage);
        } else if (error.includes('Other Purpose')) {
          otherPurposeError.appendChild(errorMessage);
        }
      });

      return false;
    }

    return true;
  }

  // Function to initialize camera
  function initializeCamera(cameraType) {
    navigator.mediaDevices.getUserMedia({
      video: { facingMode: cameraType }
    }).then(function(stream) {
      video.srcObject = stream;
      video.play();
    }).catch(function(error) {
      console.error('Error accessing the camera.', error);
    });
  }

  // Function to capture ID picture from the video feed
  function captureIDPicture(inputName, outputImage) {
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    var dataURL = canvas.toDataURL('image/jpeg');
    outputImage.src = dataURL;

    var hiddenInput = document.createElement('input');
    hiddenInput.type = 'hidden';
    hiddenInput.name = inputName;
    hiddenInput.value = dataURL;

    var imageForm = document.getElementById('imageForm');
    imageForm.appendChild(hiddenInput);
  }

  // Function to delete the captured image
  function deleteImage(outputImage, inputName, deleteButton) {
    outputImage.src = '';
    var hiddenInput = document.getElementsByName(inputName)[0];
    hiddenInput.parentNode.removeChild(hiddenInput);
  }

  // Function to activate the camera
  function activateCamera() {
    video.style.display = 'block';
  }

  // Function to deactivate the camera
  function deactivateCamera() {
    video.style.display = 'none';
  }
});

var select = document.querySelector("select");
select.addEventListener("change", function() {
  this.classList.remove("error");
  var error = this.nextElementSibling;
  if (error && error.classList.contains("error-container")) {
    error.textContent = "";
  }
});


