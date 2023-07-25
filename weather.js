const https = require('https');
const readline = require('readline');

const API_KEY = process.env.YOUR_API_KEY;
const BASE_URL = `https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=${API_KEY}`;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getUserOption() {
  console.log('\nChoose an option:');
  console.log('1. Get Temperature');
  console.log('2. Get Wind Speed');
  console.log('3. Get Pressure');
  console.log('0. Exit');
  rl.question('\nEnter option: ', (option) => {
    if (option === '1') {
      rl.question('\nEnter date (YYYY-MM-DD): ', (date) => {
        getWeatherData(date, 'temp');
      });
    } else if (option === '2') {
      rl.question('\nEnter date (YYYY-MM-DD): ', (date) => {
        getWeatherData(date, 'wind');
      });
    } else if (option === '3') {
      rl.question('\nEnter date (YYYY-MM-DD): ', (date) => {
        getWeatherData(date, 'pressure');
      });
    } else if (option === '0') {
      console.log('Exiting program...');
      rl.close();
    } else {
      console.log('Invalid option. Try again.');
      getUserOption();
    }
  });
}

function getWeatherData(date, type) {
  https.get(BASE_URL, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      const weatherData = JSON.parse(data);
      const weatherList = weatherData.list;
      let found = false;
      for (let i = 0; i < weatherList.length; i++) {
        const weatherItem = weatherList[i];
        const weatherDate = weatherItem.dt_txt.split(' ')[0];
        if (weatherDate === date) {
          found = true;
          if (type === 'temp') {
            console.log(`Temperature on ${date}: ${weatherItem.main.temp} Kelvin`);
          } else if (type === 'wind') {
            console.log(`Wind speed on ${date}: ${weatherItem.wind.speed} meter/sec`);
          } else if (type === 'pressure') {
            console.log(`Pressure on ${date}: ${weatherItem.main.pressure} hPa`);
          }
          break;
        }
      }
      if (!found) {
        console.log(`No data found for date: ${date}`);
      }
      getUserOption();
    });
  }).on('error', (err) => {
    console.log(`Error: ${err.message}`);
    getUserOption();
  });
}
getUserOption();


/*
1. The code defines some constants, including the API key and base URL for the OpenWeatherMap API.
2. It creates a readline interface to interact with the user through the command line.
3. The getUserOption function displays a menu of options to the user and prompts them to choose one.
4. Depending on the user’s choice, the function will either prompt the user for a date and call the getWeatherData function with the appropriate parameters, or exit the program.
5. The getWeatherData function makes an HTTPS request to the OpenWeatherMap API using the base URL and retrieves weather data for London.
6. It then parses the JSON response and searches for weather data for the specified date.
7. If data is found, it displays the temperature, wind speed, or pressure (depending on the type parameter) to the user.
8. If no data is found, it displays an error message.
Overall, this code provides a simple command-line interface for retrieving and displaying weather data from the OpenWeatherMap API
*/