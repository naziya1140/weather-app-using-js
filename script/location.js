window.addEventListener("load", async()=>{
    //as soon as the window is loaded, fetch the details of the longitude and latitute.
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showWeather, handleRestriction);
    }
    else{
        alert("Geolocation is not supported by this browser.")
    }
});

window.addEventListener("load", async()=>{
    function updateDateTime(){
        const now= new Date();
        const currdate= now.toLocaleString();
        document.querySelector(".date-time").innerHTML= `${currdate}`;
    }

    updateDateTime();
    setInterval(updateDateTime,1000);
});

function showWeather(position){
    const apiKey= "c36f4ca65dfd2a6048dbf1fe564d9e18";
    const lon = position.coords.longitude;
    const lat =  position.coords.latitude;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`; 

    fetch(apiUrl).
        then((response)=> {return response.json()})
        .then((data)=> {
            document.querySelector('#description').innerHTML= data.weather[0].description;

            document.querySelector('#location').innerHTML = `${data.name}`;
            document.querySelector('#temperature').innerHTML = `${data.main.temp} °C`;
            document.querySelector('#wind-speed').innerHTML = `${data.wind.speed} km/h`;
            document.querySelector('#humidity').innerHTML = `${data.main.humidity} %`;
            document.querySelector('#grnd-level').innerHTML = `${data.main.grnd_level} hPa`;
            document.querySelector('#sea-level').innerHTML = `${data.main.sea_level} hPa`;
            document.querySelector('#min-temp').innerHTML = `${data.main.temp_max} °C`;
            document.querySelector('#max-temp').innerHTML = `${data.main.temp_min} °C`;


            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.querySelector("#weather-img").src = iconUrl;
        })
        .catch((err)=>{
            console.log(err);
            alert("City not found. Please try again")
        });
}

function handleRestriction(){
    alert("Unable to access location. Please enable location permission.")
}