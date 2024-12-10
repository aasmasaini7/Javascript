document.getElementById("getWeather").addEventListener("click", function () {
    const city = document.getElementById("city").value.trim();
    const apiKey = "ba219daef1e4a226a58524ef3fd9014f"; // 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (city === "") {
        document.getElementById("output").innerHTML = "<p>Please enter a city name.</p>";
        return;
    }
    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
    .then((data) => {
            const { name, main, weather } = data;
            const output = `
                <h2>Weather in ${name}</h2>
                <p><strong>Temperature:</strong> ${main.temp}°C</p>
                <p><strong>Condition:</strong> ${weather[0].description}</p>
            `;
