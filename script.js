
const apiKey = "c36f4ca65dfd2a6048dbf1fe564d9e18";

function getWeather() {
    const city = document.querySelector("#search").value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=c36f4ca65dfd2a6048dbf1fe564d9e18`;

    //fetching the data and displaying it.
    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const weather = data;
            document.querySelector("#city").innerHTML = weather.name;
            document.querySelector("#temperature").innerHTML = weather.main.temp;
            document.querySelector("#wind-speed").innerHTML = weather.wind.speed;
            document.querySelector("#humidity").innerHTML = weather.main.humidity;
        })
        .catch((err) => {
            console.log(err);
            alert("City not found. Please try again")
        });
}