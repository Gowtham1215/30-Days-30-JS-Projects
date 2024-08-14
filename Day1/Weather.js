document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchBtn').addEventListener('click', function() {
        const location = document.getElementById('searchBox').value;
        if (location) {
            getWeather(location);
        }
    });

    function getWeather(location) {
        const apiKey = '{Your Api Key}';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === '404') {
                    showError('Location not found. Please try again.');
                } else {
                    updateWeather(data);
                    hideError();
                }
            })
            .catch(error => {
                console.error('Error fetching the weather data:', error);
                showError('Unable to fetch weather data. Please try again later.');
            });
    }

    function updateWeather(data) {
        document.querySelector('.degree').textContent = Math.round(data.main.temp);
        document.querySelector('.city').textContent = data.name;
        document.querySelector('.weather-type').textContent = data.weather[0].main;

        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.querySelector('.icon').src = iconUrl;

        const now = new Date();
        document.querySelector('.date-time').textContent = now.toLocaleString();

        document.getElementById('cloudy').textContent = `${data.clouds.all}%`;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('wind').textContent = `${data.wind.speed} km/h`;

        updateBackground(data.weather[0].main, now.getHours());
    }

    function showError(message) {
        const errorNotification = document.getElementById('errorNotification');
        errorNotification.textContent = message;
        errorNotification.style.display = 'block';
    }

    function hideError() {
        const errorNotification = document.getElementById('errorNotification');
        errorNotification.style.display = 'none';
    }

    function updateBackground(weatherType, hour) {
        let backgroundUrl = '';

        if (hour >= 6 && hour < 18) {
            switch (weatherType.toLowerCase()) {
                case 'clear':
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/frank-mckenna-eXHeq48Z-Q4-unsplash.jpg?v=1723618994';
                    break;
                case 'few clouds':
                case 'scattered clouds':
                case 'broken clouds':
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/beautiful-skyscape-daytime.jpg?v=1723466013';
                    break;
                case 'shower rain':
                case 'rain':
                case 'thunderstorm':
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/valentin-muller-bWtd1ZyEy6w-unsplash.jpg?v=1723618994';
                    break;
                case 'snow':
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/denys-nevozhai-duo-xV0TU7s-unsplash.jpg?v=1723618995';
                    break;
                case 'mist':
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/aditya-vyas-PzhmEp_aDU4-unsplash.jpg?v=1723552735';
                    break;
                default:
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/beautiful-skyscape-daytime.jpg?v=1723466013';
                    break;
            }
        } else { 
            switch (weatherType.toLowerCase()) {
                case 'clear':
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/ryan-hutton-Jztmx9yqjBw-unsplash.jpg?v=1723618994';
                    break;
                case 'few clouds':
                case 'scattered clouds':
                case 'broken clouds':
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/barnaby-rainbow-szQorWgMEIA-unsplash.jpg?v=1723552735';
                    break;
                case 'shower rain':
                case 'rain':
                case 'thunderstorm':
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/sam-mcgarry-1cX-rz5MXvQ-unsplash.jpg?v=1723618995';
                    break;
                case 'snow':
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/ryan-winterbotham-wDPZVbPpSko-unsplash.jpg?v=1723466013';
                    break;
                case 'mist':
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/jasper-boer-lx9kFyOl5tc-unsplash.jpg?v=1723618995';
                    break;
                default:
                    backgroundUrl = 'https://cdn.shopify.com/s/files/1/0642/0548/8304/files/barnaby-rainbow-szQorWgMEIA-unsplash.jpg?v=1723552735';
                    break;
            }
        }

        document.body.style.backgroundImage = `url('${backgroundUrl}')`;
    }
});
