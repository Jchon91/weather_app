window.addEventListener('load', ()=>{
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let tomorrow = document.querySelector('.tomorrow');
  let tonight = document.querySelector('.tonight-summary');
  let tonightTemp = document.querySelector('.tonight-temp');
  let tomorrowTemp = document.querySelector('.tomorrow-temp');

  //If location is found
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      long = position.coords.longitude;
      lat = position.coords.latitude;

      //Proxy to let api be used on localhost
      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/5a3753a23292949041311fd74f8d647b/${lat},${long}`;

      fetch(api)
        .then(response =>{
          return response.json();
        })
        .then(data =>{
          //Shows API data in console
          console.log(data);
          const {temperature, summary, icon} = data.currently;
          //Set DOM Elements from the api
          //Basically replace text with text from API
          temperatureDegree.textContent = Math.floor(temperature);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = format(data.timezone);
          tomorrow.textContent = data.daily.data[1].summary;
          tonight.textContent = data.hourly.data[17].summary;
          tonightTemp.textContent = Math.floor(data.hourly.data[17].temperature);

          let tomorrowAverage = Math.floor((data.daily.data[1].temperatureHigh +
                      data.daily.data[1].temperatureLow) / 2);
          tomorrowTemp.textContent = tomorrowAverage;

          let tonightIcon = data.hourly.data[17].icon;
          let tomorrowIcon = data.daily.data[1].icon;

          //Set icon
          setIcons(icon, document.querySelector(".icon"));
          setIcons(tonightIcon, document.querySelector(".icon-tonight"));
          setIcons(tomorrowIcon, document.querySelector(".icon-tomorrow"));

        });
    });

  }
  else{
    h1.textContent = "No";
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

  function format(text){
    const currentText = text.replace(/_/g, " ");
    return currentText;
  }
});
