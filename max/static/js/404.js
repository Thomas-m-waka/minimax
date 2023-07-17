// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Add your custom JavaScript code here
  
    // Redirect to homepage when the link is clicked
    var homepageLink = document.getElementById('homepage-link');
    homepageLink.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = homepageLink.href;
    });
  });
  

  //prevent right clicking 

//  document.addEventListener("contextmenu", function(e) {
  //  e.preventDefault();
  //});
// session-expiration.js

var sessionTimeout;

function resetSessionTimer() {
  clearTimeout(sessionTimeout);
  sessionTimeout = setTimeout(logout, 300000); // 5 minutes (300,000 milliseconds)
}

function logout() {
  // Perform the logout action here, such as redirecting to a logout page or submitting a logout form
  window.location.href = '/logout/';
}

// Attach event listeners to relevant elements or document to detect user activity
document.addEventListener('mousemove', resetSessionTimer);
document.addEventListener('keypress', resetSessionTimer);

// Start the session timer initially
resetSessionTimer();
