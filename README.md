# WeatherApp
Simple node.js program to display temperature, windspeed and pressure value by getting input option from the user using openweathermap api

1. The code defines some constants, including the API key and base URL for the OpenWeatherMap API.
2. It creates a readline interface to interact with the user through the command line.
3. The getUserOption function displays a menu of options to the user and prompts them to choose one.
4. Depending on the user’s choice, the function will either prompt the user for a date and call the getWeatherData function with the appropriate parameters, or exit the program.
5. The getWeatherData function makes an HTTPS request to the OpenWeatherMap API using the base URL and retrieves weather data for London.
6. It then parses the JSON response and searches for weather data for the specified date.
7. If data is found, it displays the temperature, wind speed, or pressure (depending on the type parameter) to the user.
8. If no data is found, it displays an error message.

Overall, this code provides a simple command-line interface for retrieving and displaying weather data from the OpenWeatherMap API
