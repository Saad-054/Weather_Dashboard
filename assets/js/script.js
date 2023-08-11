$(document).ready(function() {
    const apiKey = "6ef79105ea88baee642e2fc2d962e237";
}
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

        



    }





    )