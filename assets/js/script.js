$(document).ready(function() {
    const apiKey = "6ef79105ea88baee642e2fc2d962e237";

    // DOM Elements
    const searchForm = $("#search-form");;
    const searchInput = $("#search-input");
    const historyList = $("#history");
    const todaySection = $("#today");
    const forecastSection = $("#forecast");

    // function to obtain weather data from API
    function fetchWeatherData(city) {
        const currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        $.ajax({
            url: currentApiUrl,
            method: "GET",
        }).then(function(currentResponse) {
            $.ajax({
                url: forecastApiUrl,
                method: "GET",
            }).then(function(forecastResponse) {
                displayWeatherData(currentResponse, forecastResponse);
            });
        });
    }

    function displayWeatherData(currentData, forecast Data) {
        const cityName = currentData.name;
        const currentTemperature = currentData.main.temp;
        const currentHumidity = currentData.main.humidity;
        const currentWindSpped = currentData.wind.speed;

        todaySection.html(`<h2>${cityName}</h2>
            <p>Current Temperature: ${currentTemperature}°C</p>
            <p>Humidity: ${currentHumidity}%</p>
            <p>Wind Speed: ${currentWindSpped} m/s</p>`);

        forecastSection.empty();
        forecacastData.list.forEach(function(forecacastItem) {
            const date = forecacastItem.dt_txt.split(" ")[0];
            const Temperature = forecacastItem.main.temp;
            const Humidity = forecacastItem.main.humidity;
            const windSpeed = forecacastItem.main.wind.speed;

            const forecacastData = $("<div>").addClass("forecast0card");
            forecacastCard.html(`<p>Date: ${date}</p>
                <p>Temperature: ${temperature}°C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${windSpeed} m/s</p>`);
            forecastSection.append(forecacastCard);
        });
    }

    searchForm.on("submit", function(event) {
        event.preventDefault();
        const city = searchInput.val().trim();

        if (city !== "") {
            fetchWeatherData(city);
            addToHistory(city);
        }
    });

    function addToHistory(city) {
        const historyItem = $("<Li>").text(city);
        historyList.prepend(historyItem);
    }

    historyList.on("click", "Li", function() {
        const selectCity = $(this).text();
        fetchWeatherData(selectedCity);
    });
});




    )