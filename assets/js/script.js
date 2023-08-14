$(document).ready(function() {
    const apiKey = "6ef79105ea88baee642e2fc2d962e237";

    // DOM Elements
    const searchForm = $("#search-form");
    const searchInput = $("#search-input");
    const historyList = $("#history");
    const todaySection = $("#today");
    const forecastSection = $("#forecast");

    // function to obtain weather data from API
    function fetchWeatherData(city) {
        const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        // fu
        $.ajax({
            url: currentApiUrl,
            method: "GET",
        }).then(function(currentResponse) {
                // fu
            $.ajax({
                url: forecastApiUrl,
                method: "GET",
            }).then(function(forecastResponse) {
                    // fu
                displayWeatherData(currentResponse, forecastResponse);
            });
        });
    }

        // fu
    function displayWeatherData(currentData, forecastData) {
            // fu
        const cityName = currentData.name;
        const currentTemperature = currentData.main.temp;
        const currentHumidity = currentData.main.humidity;
        const currentWindSpeed = currentData.wind.speed;

            // fu
        todaySection.html(`<h2>${cityName}</h2>
            <p>Current Temperature: ${currentTemperature}°C</p>
            <p>Humidity: ${currentHumidity}%</p>
            <p>Wind Speed: ${currentWindSpeed} m/s</p>`);

            // fu
        forecastSection.empty();
        forecastData.list.forEach(function(forecastItem) {
            const date = forecastItem.dt_txt.split(" ")[0];
            const temperature = forecastItem.main.temp;
            const humidity = forecastItem.main.humidity;
            const windSpeed = forecastItem.wind.speed;

            const forecastCard = $("<div>").addClass("forecast-card");
            forecastCard.html(`<p>Date: ${date}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>`);

            forecastSection.append(forecastCard);
        });
    }

        // fu
    searchForm.on("submit", function(event) {
        event.preventDefault();
        const city = searchInput.val().trim();

        if (city !== "") {
            fetchWeatherData(city);
            addToHistory(city);
        }
    });

    
    
        // fu
    function addToHistory(city) {
        const historyItem = $("<li>").text(city);
        historyList.prepend(historyItem);
    }

        // fu
    historyList.on("click", "li", function() {
        const selectedCity = $(this).text();
        fetchWeatherData(selectedCity);
    });
});
