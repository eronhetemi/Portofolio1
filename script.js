$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });

    // toggle menu/navbar script
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // typing text animation script
    var typed = new Typed(".typing", {
        strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    var typed = new Typed(".typing-2", {
        strings: ["YouTuber", "Developer", "Blogger", "Designer", "Freelancer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });
});


// Sample project locations (latitude, longitude, and project information)
const projectLocations = [
    { lat: 40.7128, lon: -74.0060, name: 'Project 1', description: 'Description for Project 1' },
    { lat: 34.0522, lon: -118.2437, name: 'Project 2', description: 'Description for Project 2' },
  ];
  
  // Initialize the PixiJS application
  const app = new PIXI.Application({ width: 800, height: 600 });
  document.body.appendChild(app.view);
  
  // Create a container to hold the markers
  const markersContainer = new PIXI.Container();
  app.stage.addChild(markersContainer);
  
  // Load the marker texture
  PIXI.Loader.shared.add('marker', 'path_to_marker_texture.png').load(() => {
    // After loading the texture, create the markers
    createMarkers();
  
    // Render the application after adding the markers and info window
    app.renderer.render(app.stage);
  });
  
  // Function to create markers
  function createMarkers() {
    for (const location of projectLocations) {
      const marker = new PIXI.Sprite(PIXI.Loader.shared.resources.marker.texture);
  
      // Set marker position based on latitude and longitude
      const { lat, lon } = location;
      const markerPosition = latLonToPixel(lat, lon);
      marker.position.set(markerPosition.x, markerPosition.y);
  
      // Make markers interactive (clickable)
      marker.interactive = true;
  
      // Show the info window on marker click
      marker.on('click', () => showInfoWindow(location));
  
      markersContainer.addChild(marker);
    }
  }
  
  // Function to convert latitude and longitude to pixel coordinates on the map
  function latLonToPixel(latitude, longitude) {
    // Your conversion logic here
    // You can use map projections or APIs like Leaflet, Google Maps, etc.
    // For simplicity, let's assume we have a function that returns pixel coordinates.
    return { x: Math.random() * 800, y: Math.random() * 600 };
  }
  
  // Function to show the info window
  function showInfoWindow(location) {
    const infoWindow = new PIXI.Graphics();
    infoWindow.beginFill(0xFFFFFF);
    infoWindow.drawRect(0, 0, 200, 100);
    infoWindow.endFill();
    infoWindow.position.set(app.view.width / 2 - 100, app.view.height / 2 - 50);
  
    // Add the project information to the info window
    const text = new PIXI.Text(`${location.name}\n${location.description}`, {
      fill: 0x000000,
      fontSize: 16,
      wordWrap: true,
      wordWrapWidth: 180,
    });
    text.position.set(10, 10);
    infoWindow.addChild(text);
  
    // Add the info window to the stage
    app.stage.addChild(infoWindow);
  
    // Render the application after adding the info window
    app.renderer.render(app.stage);
  }
  