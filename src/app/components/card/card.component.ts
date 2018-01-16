import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChangeUnitsService } from '../../services/change-units.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  // @Input fields hold city and state names so new CardComponents can be created from the modal form
  // These get passed in from the CreateComponentService
  @Input() cityName;
  @Input() stateName;

  // These hold the values to be displayed on the card
  location: string;
  temp: number;
  conditions: string;
  icon: string;
  iconClass: string;
  windSpeed: number;
  windDirection: string;
  uv: string;
  humidity: string;
  dewPoint: number;
  feelsLike: number;
  windChill: string;
  pressure: number;
  visibility: number;
  weatherData: any;
  tempUnits: string;
  windUnits: string;
  forecastToday: string;
  forecastTonight: string;

  // This is used when geolocation is enabled
  position: Coordinates;

  // This is used to help control the background color of the card
  backgroundColorClass: string;

  closeResult: string;

  /**
   * The constructor sets up references to the weather DataService as well as the ChangeUnitsService
   * @param dataService The weather data service (retrieves weather info from the API)
   * @param changeUnitsService The service that sends change units messages
   */
  constructor(private dataService: DataService, private changeUnitsService: ChangeUnitsService) { 
  }

  ngOnInit() {
    // console.log(`cityName: ${this.cityName}, stateName: ${this.stateName}`);
    if (this.cityName !== undefined && this.stateName !== undefined) {
      // This will be called if a CardComponent has been created from the CreateComponentService
      this.setCityStateData();
    } else {
      // Otherwise, try to get geolocation data
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          // console.log(position);
          // If we're here, the user has allowed us access to their location
          // and we can get the data from the lat, long coordinates
          this.position = {
            lat: position["coords"]["latitude"],
            long: position["coords"]["longitude"]
          };
          // console.log(this.position);
          this.setLatLongData();
        }, error => {
          // If we're here, either geolocation isn't enabled or we were denied access
          // So set up the default Virginia Beach card instead
          console.log("Geolocation is not supported by this browser");
          this.setDefaultCityStateData();
        });
      }
    }

    // Listen for messages from the change units service
    // this will fire if the user has clicked either the F or C buttons on the page
    this.changeUnitsService.currentUnit.subscribe(message => {
      // console.log("Message changed", message);
      this.tempUnits = message;
      if (this.weatherData !== undefined) {
        // make sure data has been set before
        // if it has, update to new units
        this.setWeatherData(this.weatherData, this.tempUnits);
      }
    });
  }

  /**
   * This method changes the background color of the CardComponent depending on the weather conditions
   */
  setBackgroundColor() {
    switch (this.icon) {
      case "mostlysunny":
      case "clear":
      case "sunny":
        this.backgroundColorClass = "sun";
        // also set the sun icon to solid white
        this.iconClass = "solid-white";
        break;
      case "rain":
      case "sleet":
      case "tstorms":
        this.backgroundColorClass = "rain";
        // also set the icon to solid white
        this.iconClass = "solid-white";
        break;
      case "snow":
      case "flurries":
        this.backgroundColorClass = "snow";
        break;
      default:
        this.backgroundColorClass = "cloudy";
        break;
    }
  }

  /**
   * This method fetches weather data from data service based on lat,long position.
   * It then calls setWeatherData with the results it received.
   */
  setLatLongData() {
    this.dataService.getWeatherDataLatLong(this.position.lat, this.position.long).subscribe(data => {
      this.setWeatherData(data, this.tempUnits);
    });
  }

  /**
   * This method fetches weather data from Virginia Beach, VA as a default location.
   * It then calls setWeatherData with the results it received.
   */
  setDefaultCityStateData() {
    this.dataService.getDefaultWeatherData().subscribe(data => {
      this.setWeatherData(data, this.tempUnits);
    });
  }

  /**
   * This method fetches weather data from a given city and state.
   * It then calls setWeatherData with the results it received.
   */
  setCityStateData() {
    this.dataService.getWeatherData(this.cityName, this.stateName).subscribe(data => {
      this.setWeatherData(data, this.tempUnits);
    });
  }

  /**
   * This method sets all the card's variables based on the JSON object that gets returned from the API
   * @param data The weather data JSON object
   * @param unit Fahrenheit or Celsius (represented as 'f' or 'c' respectively)
   */
  setWeatherData(data, unit) {
    this.weatherData = data;
    console.log(this.weatherData);
    this.location = this.weatherData["current_observation"]["display_location"]["full"];
    this.temp = Math.round(this.weatherData["current_observation"][`temp_${unit}`]);
    this.conditions = this.weatherData["current_observation"]["weather"];
    this.icon = this.weatherData["current_observation"]["icon"];
    this.iconClass = "white"; // default white outline with colored components

    this.windDirection = this.weatherData["current_observation"]["wind_dir"];
    this.uv = this.weatherData["current_observation"]["UV"];
    this.humidity = this.weatherData["current_observation"]["relative_humidity"];
    this.dewPoint = this.weatherData["current_observation"][`dewpoint_${unit}`];
    this.feelsLike = this.weatherData["current_observation"][`feelslike_${unit}`];
    this.windChill = this.weatherData["current_observation"][`windchill_${unit}`];
    this.pressure = this.weatherData["current_observation"]["pressure_mb"];
    this.visibility = this.weatherData["current_observation"]["visibility_mi"];

    // get descriptive forecast strings for today and tonight
    if (this.tempUnits === "f") {
      // use these if we're using degrees F
      if (this.weatherData["forecast"]["txt_forecast"]["forecastday"].length > 0) {
        // This check is done because occasionally it doesn't return a forecast
        this.forecastToday = this.weatherData["forecast"]["txt_forecast"]["forecastday"][0]["fcttext"];
        this.forecastTonight = this.weatherData["forecast"]["txt_forecast"]["forecastday"][1]["fcttext"];
      }
      this.windUnits = "mph";
    } else {
      // use these if we're using degrees C
      if (this.weatherData["forecast"]["txt_forecast"]["forecastday"].length > 0) {
        this.forecastToday = this.weatherData["forecast"]["txt_forecast"]["forecastday"][0]["fcttext_metric"];
        this.forecastTonight = this.weatherData["forecast"]["txt_forecast"]["forecastday"][1]["fcttext_metric"];
      }
      this.windUnits = "kph";
    }

    this.windSpeed = this.weatherData["current_observation"][`wind_${this.windUnits}`];

    this.setBackgroundColor();
  }
}

/**
 * This represents a set of lat,long coordinates
 */
interface Coordinates {
  lat: number;
  long: number;
}