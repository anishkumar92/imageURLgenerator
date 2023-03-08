function loadImages() {
    var container = document.getElementById("image-container");
    var images = [];
    fetch("../images/")
      .then(response => response.text())
      .then(data => {
        var parser = new DOMParser();
        var html = parser.parseFromString(data, "text/html");
        var links = html.querySelectorAll("a");
        links.forEach(link => {
          if (link.href.endsWith(".jpg") || link.href.endsWith(".jpeg") || link.href.endsWith(".png")) {
            images.push(link.href);
          }
        });
        for (var i = 0; i < images.length; i++) {
          var img = document.createElement("img");
          img.src = images[i];
          container.appendChild(img);
        }
      })
      .catch(error => console.error(error));
  }
  
  function downloadImageURLs() {
    var images = [];
    fetch("../images/")
      .then(response => response.text())
      .then(data => {
        var parser = new DOMParser();
        var html = parser.parseFromString(data, "text/html");
        var links = html.querySelectorAll("a");
        links.forEach(link => {
          if (link.href.endsWith(".jpg") || link.href.endsWith(".jpeg") || link.href.endsWith(".png")) {
            images.push(window.location.href + link.href);
          }
        });
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(images.join("\n")));
        element.setAttribute("download", "image_urls.txt");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      })
      .catch(error => console.error(error));
  }
  
  loadImages();
  