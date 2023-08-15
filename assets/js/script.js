$(document).ready(function() {
    // API Key
    const apiKey = "6ef79105ea88baee642e2fc2d962e237";

    // DOM Elements
    const searchForm = $("#search-form");
    const searchInput = $("#search-input");
    const historyList = $("#history");
    const todaySection = $("#today");
    const forecastSection = $("#forecast");

    // function to obtain weather data from API
    function fetchWeatherData(city) {
        // API URLs for weather forecast
        const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        // JQuery AJAX to obtain current weather data
        $.ajax({
            url: currentApiUrl,
            method: "GET",
        }).then(function(currentResponse) {
                // JQuery AJAX to obtain weather for next 5 days
            $.ajax({
                url: forecastApiUrl,
                method: "GET",
            }).then(function(forecastResponse) {
                // processes and displays weather
                displayWeatherData(currentResponse, forecastResponse);
            });
        });
    }

    // function for diplsaying weather data
    function displayWeatherData(currentData, forecastData) {
        console.log (currentData);
        // current weather data extract
        const cityName = currentData.name;
        const currentTemperature = currentData.main.temp;
        const currentHumidity = currentData.main.humidity;
        const currentWindSpeed = currentData.wind.speed;

        // current weather data UI elements
        todaySection.html(`<h2>${cityName} ${new Date(currentData.dt * 1000).toLocaleDateString()}</h2>
            <p>Current Temperature: ${currentTemperature}°C</p>
            <p>Humidity: ${currentHumidity}%</p>
            <p>Wind Speed: ${currentWindSpeed} KPH</p>`);

        // clear section and displays wetaher for next 5 days
        forecastSection.empty();
        forecastData.list.forEach(function(forecastItem) {
            if (forecastItem.dt_txt.includes("12:00:00")) {
                const date = forecastItem.dt_txt.split(" ")[0];
                const temperature = forecastItem.main.temp;
                const humidity = forecastItem.main.humidity;
                const windSpeed = forecastItem.wind.speed;
    
                // forecast card for weather
                const forecastCard = $("<div>").addClass("col m-2 forecast-card");
                forecastCard.html(`<p>Date: ${date}</p>
                    <img src = "https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}.png"/>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} KPH</p>`);
    
                forecastSection.append(forecastCard);
            }
        });
    }

    // event listenner for form submission
    searchForm.on("submit", function(event) {
        event.preventDefault();
        const city = searchInput.val().trim();

        if (city !== "") {
            fetchWeatherData(city);
            addToHistory(city);
        }
    });

    
    
    // function for adding city to search history
    function addToHistory(city) {
        const historyItem = $("<li class='list-group-item mb-2 item-history'>").text(city);
        historyList.prepend(historyItem);
    }

    // event listener for history list items
    historyList.on("click", "li", function() {
        const selectedCity = $(this).text();
        fetchWeatherData(selectedCity);
    });
});
