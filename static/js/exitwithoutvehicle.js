    // Add click event listener to all zoomable images
    var zoomableImages = document.getElementsByClassName("zoomable-image");
    for (var i = 0; i < zoomableImages.length; i++) {
      zoomableImages[i].addEventListener("click", function() {
        if (this.classList.contains("zoomed")) {
          this.classList.remove("zoomed"); // Remove zoomed class on double click
        } else {
          this.classList.add("zoomed"); // Add zoomed class on first click
        }
      });
    }