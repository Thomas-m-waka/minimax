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

  document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  });
