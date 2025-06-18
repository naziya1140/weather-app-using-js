
const apiKey = "c36f4ca65dfd2a6048dbf1fe564d9e18";

let search = document.querySelector("#search"); 
let suggestion = document.querySelector("#suggestions");

search.addEventListener("input", async()=>{
    
    const query = search.value.trim();
    
    //if the length of query goes beyond 2 then fetch all the matching values.
    if(query.length > 2){
        const autoSuggUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`;

        fetch(autoSuggUrl)
        .then((response)=>{return response.json()})
        .then((data)=>{
            console.log(data);
        
            //removing all the older suggestions.
            suggestion.innerHTML= "";
            
            //traversing each location and adding it to the list of suggestion.
            data.forEach(loc => {
                const li = document.createElement("li");
                li.textContent = loc.name;
            
                li.addEventListener("click", async()=>{
                    search.value= loc.name;                    
                    li.textContent = `${loc.name}, ${loc.state || ''}, ${loc.country}`;
                    suggestion.innerHTML= "";
                    getWeather(loc.name);
                });
            
                suggestion.appendChild(li);
            });
        })
        .catch((err)=>{
            console.log(err);
        });
    }
    
    else{
        suggestion.innerHTML= "";
    }
});


function getWeather(cityname, ) {
    const city = cityname || document.querySelector("#search").value;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=c36f4ca65dfd2a6048dbf1fe564d9e18`;

    //fetching the data and displaying it.
    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const weather = data;
            document.querySelector('#location').innerHTML= 'Your Location'
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