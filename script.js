//create some global variables
function citySearch() {
    event.preventDefault();
    var currentSearchCity = ($("#current-search-city").val());
    // query URL and custom API KEY variable for current day weather 
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentSearchCity + "&units=metric&appid=82c89536a936fdf2b3461ac6bec2669f";
    //ajax "get" method for the JSON object
    $.get({
        url: queryURL,
    }).then(function (response) {
        console.log(response);
        const weather = response;
        console.log(weather.name);
        console.log(weather.main.temp);
        console.log(weather.main.humidity);
        console.log(weather.wind.speed);
        console.log(weather.coord.lon);
        console.log(weather.coord.lat);
        const cityName = weather.name;
        const cityTemp = weather.main.temp;
        const cityHumidity = weather.main.humidity;
        const cityWindSpeed = weather.wind.speed;
        $("#city-name").text(cityName)
        $("#city-temp").text("Temperature: " + cityTemp.toFixed(1) + "°C")
        $("#city-humidity").text("Humidity: " + cityHumidity + "%")
        $("#city-wind").text("Wind Speed: " + cityWindSpeed.toFixed(2) + "KPH")
        var lon = weather.coord.lon;
        var lat = weather.coord.lat;
        var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?appid=82c89536a936fdf2b3461ac6bec2669f&lat=" + lat + "&lon=" + lon + "&cnt=1";
        $.ajax({
            url: uvIndexURL,
            method: "GET"
        }).then(function (response) {
            var uvIndFinal = response.value;
            console.log(response.value);
            $(".uvIndex").append("UV Index: ");
            var uvBtn = $("<button>").text(uvIndFinal);
            $(".uvIndex").append(uvBtn);
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
            var getForecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=82c89536a936fdf2b3461ac6bec2669f";
            $.ajax({
                url: getForecastURL,
                method: "GET"
            }).then(function (response) {
                var cityTemp1 = response.list[1].main.temp
                var cityTemp2 = response.list[2].main.temp
                var cityTemp3 = response.list[3].main.temp
                var cityTemp4 = response.list[4].main.temp
                var cityTemp5 = response.list[5].main.temp
                var cityHumidity1 = response.list[1].main.humidity
                var cityHumidity2 = response.list[2].main.humidity
                var cityHumidity3 = response.list[3].main.humidity
                var cityHumidity4 = response.list[4].main.humidity
                var cityHumidity5 = response.list[5].main.humidity
                var cityIcon1 = response.list[1].weather[0].icon
                var cityIcon2 = response.list[2].weather[0].icon
                var cityIcon3 = response.list[3].weather[0].icon
                var cityIcon4 = response.list[4].weather[0].icon
                var cityIcon5 = response.list[5].weather[0].icon
                var iconurl1 = "http://openweathermap.org/img/w/" + cityIcon1 + ".png";
                var iconurl2 = "http://openweathermap.org/img/w/" + cityIcon2 + ".png";
                var iconurl3 = "http://openweathermap.org/img/w/" + cityIcon3 + ".png";
                var iconurl4 = "http://openweathermap.org/img/w/" + cityIcon4 + ".png";
                var iconurl5 = "http://openweathermap.org/img/w/" + cityIcon5 + ".png";
                console.log(response.list[1].main.temp)
                console.log(response.list[1].main.humidity)
                console.log(response.list[1].weather[0].icon)
                console.log(response.list[2].main.temp)
                console.log(response.list[2].main.humidity)
                console.log(response.list[2].weather[0].icon)
                console.log(response.list[3].main.temp)
                console.log(response.list[3].main.humidity)
                console.log(response.list[4].main.temp)
                console.log(response.list[4].main.humidity)
                console.log(response.list[5].main.temp)
                console.log(response.list[5].main.humidity)
                $("#city-temp1").text("Temperature: " + cityTemp1.toFixed(1) + "°C")
                $("#city-humidity1").text("Humidity: " + cityHumidity1 + "%")
                $("#cityIcon1").attr('src', iconurl1)
                $("#city-temp2").text("Temperature: " + cityTemp2.toFixed(1) + "°C")
                $("#city-humidity2").text("Humidity: " + cityHumidity2 + "%")
                $("#cityIcon2").attr('src', iconurl2)
                $("#city-temp3").text("Temperature: " + cityTemp3.toFixed(1) + "°C")
                $("#city-humidity3").text("Humidity: " + cityHumidity3 + "%")
                $("#cityIcon3").attr('src', iconurl3)
                $("#city-temp4").text("Temperature: " + cityTemp4.toFixed(1) + "°C")
                $("#city-humidity4").text("Humidity: " + cityHumidity4 + "%")
                $("#cityIcon4").attr('src', iconurl4)
                $("#city-temp5").text("Temperature: " + cityTemp5.toFixed(1) + "°C")
                $("#city-humidity5").text("Humidity: " + cityHumidity5 + "%")
                $("#cityIcon5").attr('src', iconurl5)
            })//Keep city searached by the guests
            var keepCities = [];
            var displayCity = $("#recent-searches");
            var searchButton = $("#btnSearch");
            var cityInput = $("#city-name");
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
            function init () {
            //stored city names from local storage
            var storedCityNames = JSON.parse(localStorage.getItem("KeepCities"));
            //update local storage if keepCities 
            if (storedCityNames !==null){
               keepCities = storedCityNames;
            }
            renderCityNames();
            }
            function storeCityNames (){
            localStorage.setItem("keepCities", JSON.stringify(keepCities));
            }
            searchButton.on("click", function (event){
            event.preventDefault();
            var cityTextDisplay = cityInput.val();
            if (cityTextDisplay ==="") {
               return;
            }
            keepCities.push(cityTextDisplay);
            cityInput.value = "";
            storeCityNames();
            renderCityNames();
            })
            
        })
    });
}
$("#btnSearch").on("click", citySearch)

