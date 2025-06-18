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
            console.log(data);

            const weather = data;
            document.querySelector("#city").innerHTML = weather.name;
            document.querySelector("#temperature").innerHTML = weather.main.temp;
            document.querySelector("#wind-speed").innerHTML = weather.wind.speed;
            document.querySelector("#humidity").innerHTML = weather.main.humidity;
        })
        .catch((err)=>{
            console.log(err);
            alert("City not found. Please try again")
        });
}

function handleRestriction(){
    alert("Unable to access location. Please enable location permission.")
}
