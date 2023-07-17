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
    // ... (existing validateForm code)

    return true;
  }

  // Function to initialize camera
  function initializeCamera(cameraType) {
    // ... (existing initializeCamera code)
  }

  // Function to capture ID picture from the video feed
  function captureIDPicture(inputName, outputImage) {
    // ... (existing captureIDPicture code)
  }

  // Function to delete the captured image
  function deleteImage(outputImage, inputName, deleteButton) {
    // ... (existing deleteImage code)
  }

  // Function to activate the camera
  function activateCamera() {
    // ... (existing activateCamera code)
  }

  // Function to deactivate the camera
  function deactivateCamera() {
    // ... (existing deactivateCamera code)
  }
});
