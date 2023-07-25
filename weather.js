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
