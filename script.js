document.getElementById("getWeather").addEventListener("click", function () {
    const city = document.getElementById("city").value.trim();
    const weatherApiKey = "ba219daef1e4a226a58524ef3fd9014f"; 
    const unsplashAccessKey = "olg9GFR1O_NcgSYWV80HZ1zK6tI4I-oBHTdxgPBD2Qw"; 

    if (city === "") {
        document.getElementById("output").innerHTML = "<p>Please enter a city name.</p>";
        return;
    }

    // Fetch weather data
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    fetch(weatherApiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((weatherData) => {
            const { name, main, weather } = weatherData;

            // Fetch background image
            const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${name}&client_id=${unsplashAccessKey}&per_page=1`;

            fetch(unsplashApiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Image not found");
                    }
                    return response.json();
                })
                .then((imageData) => {
                    const imageUrl = imageData.results[0]?.urls?.regular || "";

                    // Update background and output
                    document.body.style.backgroundImage = `url('${imageUrl}')`;

                    const output = `
                        <h2>Weather in ${name}</h2>
                        <p><strong>Temperature:</strong> ${main.temp}°C</p>
                        <p><strong>Condition:</strong> ${weather[0].description}</p>
                    `;
                    document.getElementById("output").innerHTML = output;
                })
                .catch((error) => {
                    document.getElementById("output").innerHTML = `<p>Error: ${error.message}</p>`;
                });
        })
        .catch((error) => {
            document.getElementById("output").innerHTML = `<p>Error: ${error.message}</p>`;
        });
});
