# WeatherAppAngular
This is a small weather app developed in Angular. It displays releveant weather data from [Weather Underground](https://www.wunderground.com/) based on
either a user's location or a US city of the user's choice.

## Use
The app will attempt to get the user's location using the HTML5 geolocation API. If that is available, it fetches data from Weather Underground for that
location. Otherwise it will default to Virginia Beach, VA. Users also have the ability to display weather data for multiple cities by clicking on the
red floating action button at the bottom right of the window. It was ask them to input the city and state that they're interested in and then will 
fetch the appropriate weather data for that city. Finally, users can also switch between Celsius and Fahrenheit with the click of a button.

## Weather Data
The app will display the following information to the user:
* Current conditions (cloudy, sunny, rain, etc)
* Location (City, State)
* Current temperature (in Fahrenheit by default but can be set to Celsius)
* Wind speed and direction
* UV
* Relative humidity
* Dew point
* Feels like
* Wind chill
* Pressure (in millibars)
* Visibility (in miles)
* Descriptive forecast for today (if available)
* Descriptive forecast for tonight (if available)

## Work still to be done
* Display more detailed forecast
* Handle invalid cities
* Allow users to remove a city from the list
* Save favorite cities tied to user accounts for retrieval later
