window.addEventListener("load", () => {
  var long;
  var lat;

  var locationTimezone = document.querySelector(".location-timezone");
  var temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  var temperatueDegree = document.querySelector(".temperature-degree");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/15e02375abbb2f64632c7f66e15eb203/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //Set Elements
          locationTimezone.textContent = data.timezone;
          temperatureDescription.textContent = summary;
          temperatueDegree.textContent = Math.floor(temperature);
          //seticon
          setIcons(icon, document.querySelector(".icon"));
          //change unit type
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatueDegree.textContent = unitChange(temperature);
            } else {
              temperatureSpan.textContent = "F";
              temperatueDegree.textContent = Math.floor(temperature);
            }
          });
        });
    });
  } else {
    document.querySelector("h1").textContent =
      "Please refresh and allow the browser to get your current location.";
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function unitChange(temperature) {
    return Math.floor((temperature - 32) * (5 / 9));
  }
});
