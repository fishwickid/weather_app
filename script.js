$(document).ready()

// Function to start user has typed their city in to the search bar

function citySearch() {

    event.preventDefault();
    $(".uvIndex").empty();


    var currentSearchCity = ($("#current-search-city").val());

    // query URL and custom API KEY variable for current day weather 
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentSearchCity + "&units=metric&appid=82c89536a936fdf2b3461ac6bec2669f";
   
    //ajax "get" method for the JSON object
    $.get({
        url: queryURL,
    }).then(function (response) {

    // apply cont variables to the data collected from the API
        const cityName = response.name;
        const cityTemp = response.main.temp;
        const cityHumidity = response.main.humidity;
        const cityWindSpeed = response.wind.speed;
        const cityIcon = response.weather[0].icon;

    // assign fetched data to HTML id
        $("#city-date").text(moment().format('MMMM Do YYYY'))
        $("#city-name").text(cityName)
        $("#city-icon").attr("src", "https://openweathermap.org/img/w/" + cityIcon + ".png")
        $("#city-temp").text("Temperature:" + cityTemp.toFixed(1) + "°C")
        $("#city-humidity").text("Humidity: " + cityHumidity + "%")
        $("#city-wind").text("Wind Speed: " + cityWindSpeed.toFixed(2) + "KPH")


    // Apply latitude and longitude data to collect UV rating for city location
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=82c89536a936fdf2b3461ac6bec2669f&lat=" + lat + "&lon=" + lon + "&cnt=1";
       
    // Get request for UV information
        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function (response) {
            var uvIndFinal = response.value;
            $(".uvIndex").append("UV Index: ");

        // create button to display the UV data
            var uvBtn = $("<button>").text(uvIndFinal);

        // append result to that button
            $(".uvIndex").append(uvBtn);

        // If else statements to change colour depending on UV rating
            if (uvIndFinal <= 2) {
                // If LON&LAT is 2 or less, make Green
                uvBtn.attr("class", "uvGreen");
            } else if (uvIndFinal <= 5) {
                // If LON&LAT is 5 or less but greater than 2, make Yellow
                uvBtn.attr("class", "uvYellow");
            } else if (uvIndFinal <= 7) {
                // If LON&LAT is 7 or less but greater than 5, make Orange
                uvBtn.attr("class", "uvOrange");
            } else if (uvIndFinal < 11) {
                // If LON&LAT is 10 or less but greater than 7, make Red
                uvBtn.attr("class", "uvRed");
            } else {
                // If LON&LAT greater than 11, make Purple
                uvBtn.attr("class", "uvPurple");
            }

        // Create API Get request for the 5 day forecast
            var getForecastURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&appid=82c89536a936fdf2b3461ac6bec2669f";
            $.ajax({
                url: getForecastURL,
                method: "GET"
            }).then(function (response) {

        // create variables to add required info for each day

                var cityTemp1 = response.daily[1].temp.day
                var cityTemp2 = response.daily[2].temp.day
                var cityTemp3 = response.daily[3].temp.day
                var cityTemp4 = response.daily[4].temp.day
                var cityTemp5 = response.daily[5].temp.day
                var cityHumidity1 = response.daily[1].humidity
                var cityHumidity2 = response.daily[2].humidity
                var cityHumidity3 = response.daily[3].humidity
                var cityHumidity4 = response.daily[4].humidity
                var cityHumidity5 = response.daily[5].humidity
                var cityIcon1 = response.daily[1].weather[0].icon
                var cityIcon2 = response.daily[2].weather[0].icon
                var cityIcon3 = response.daily[3].weather[0].icon
                var cityIcon4 = response.daily[4].weather[0].icon
                var cityIcon5 = response.daily[5].weather[0].icon

        // Add API data to HTML display on page 
                $("#city-date1").text(moment().add(1, "d").format('D [/] M [/] YY'))
                $("#city-icon1").attr("src", "https://openweathermap.org/img/w/" + cityIcon1 + ".png")
                $("#city-temp1").text("Temperature: " + cityTemp1.toFixed(1) + "°C")
                $("#city-humidity1").text("Humidity: " + cityHumidity1 + "%")
                $("#city-date2").text(moment().add(2, "d").format('D [/] M [/] YY'))
                $("#city-icon2").attr("src", "https://openweathermap.org/img/w/" + cityIcon2 + ".png")
                $("#city-temp2").text("Temperature: " + cityTemp2.toFixed(1) + "°C")
                $("#city-humidity2").text("Humidity: " + cityHumidity2 + "%")
                $("#city-date3").text(moment().add(3, "d").format('D [/] M [/] YY'))
                $("#city-icon3").attr("src", "https://openweathermap.org/img/w/" + cityIcon3 + ".png")
                $("#city-temp3").text("Temperature: " + cityTemp3.toFixed(1) + "°C")
                $("#city-humidity3").text("Humidity: " + cityHumidity3 + "%")
                $("#city-date4").text(moment().add(4, "d").format('D [/] M [/] YY'))
                $("#city-icon4").attr("src", "https://openweathermap.org/img/w/" + cityIcon4 + ".png")
                $("#city-temp4").text("Temperature: " + cityTemp4.toFixed(1) + "°C")
                $("#city-humidity4").text("Humidity: " + cityHumidity4 + "%")
                $("#city-date5").text(moment().add(5, "d").format('D [/] M [/] YY'))
                $("#city-icon5").attr("src", "https://openweathermap.org/img/w/" + cityIcon5 + ".png")
                $("#city-temp5").text("Temperature: " + cityTemp5.toFixed(1) + "°C")
                $("#city-humidity5").text("Humidity: " + cityHumidity5 + "%")
            })
        })
    });
}

// Event listener which adds searched items to the recent searches list
$("#btnSearch").on("click", citySearch)
let city = "";
let search_history = JSON.parse(localStorage.getItem("cities")) === null ? [] : JSON.parse(localStorage.getItem("cities"));

//Keep city searached by the guests
var keepCities = [];
var displayCity = $("#recent-searches");
var searchButton = $("#btnSearch");
var cityInput = $("#current-search-city");

// Function for displaying city names 
function renderCityNames() {
    displayCity.innerHTML = "";
    $("li").empty()

    // Render a new city for each search
    for (var i = 0; i < keepCities.length; i++) {
        var keepCity = keepCities[i];
        var li = $("<li>");
        li.text(keepCities[i]);
        li.attr("data-index", i);
        var button = $("<p>");
    //button.text("City Searched");
        li.append(button);
        displayCity.append(li);
    }
}
function init() {
    //stored city names from local storage
    var storedCityNames = JSON.parse(localStorage.getItem("KeepCities"));
    //update local storage if keepCities 
    if (storedCityNames !== null) {
        keepCities = storedCityNames;
    }
    renderCityNames();
}
function storeCityNames() {
    localStorage.setItem("keepCities", JSON.stringify(keepCities));
}
searchButton.on("click", function (event) {
    event.preventDefault();
    var cityTextDisplay = cityInput.val();
    if (cityTextDisplay === "") {
        return;
    }
    keepCities.push(cityTextDisplay);
    cityInput.value = "";
    storeCityNames();
    renderCityNames();
})
function clearHistory() {
    console.log("clicked")
    $("#recent-searches").empty();
    keepCities = [];
    localStorage.setItem("cities", JSON.stringify(keepCities));
}
$("#clear-all").on("click", clearHistory);