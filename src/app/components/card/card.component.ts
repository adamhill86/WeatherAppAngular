import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ChangeUnitsService } from '../../services/change-units.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cityName;
  @Input() stateName;

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
  units: string;
  forecastToday: string;
  forecastTonight: string;

  position: Coordinates;

  backgroundColorClass: string;

  closeResult: string;

  constructor(private dataService: DataService, private changeUnitsService: ChangeUnitsService) { 
    //console.log(`cityName: ${this.cityName}, stateName: ${this.stateName}`);
  }

  ngOnInit() {
    console.log(`cityName: ${this.cityName}, stateName: ${this.stateName}`);
    if (this.cityName !== undefined && this.stateName !== undefined) {
      this.setCityStateData();
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
          this.position = {
            lat: position["coords"]["latitude"],
            long: position["coords"]["longitude"]
          };
          console.log(this.position);
          this.setLatLongData();
        }, error => {
          console.log("Geolocation is not supported by this browser");
          this.setDefaultCityStateData();
        });
      }
    }

    this.changeUnitsService.currentMessage.subscribe(message => {
      console.log("Message changed", message);
      this.units = message;
      if (this.weatherData !== undefined) {
        // make sure data has been set before
        // if it has, update to new units
        this.setWeatherData(this.weatherData, this.units);
      }
    });
  }

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

  setLatLongData() {
    this.dataService.getWeatherDataLatLong(this.position.lat, this.position.long).subscribe(data => {
      this.setWeatherData(data, this.units);
    });
  }

  setDefaultCityStateData() {
    this.dataService.getDefaultWeatherData().subscribe(data => {
      this.setWeatherData(data, this.units);
    });
  }

  setCityStateData() {
    this.dataService.getWeatherData(this.cityName, this.stateName).subscribe(data => {
      this.setWeatherData(data, this.units);
    });
  }

  setWeatherData(data, unit) {
    this.weatherData = data;
    console.log(this.weatherData);
    this.location = this.weatherData["current_observation"]["display_location"]["full"];
    this.temp = Math.round(this.weatherData["current_observation"][`temp_${unit}`]);
    this.conditions = this.weatherData["current_observation"]["weather"];
    this.icon = this.weatherData["current_observation"]["icon"];
    this.iconClass = "white"; // default white outline with colored components
    this.windSpeed = this.weatherData["current_observation"]["wind_mph"];
    this.windDirection = this.weatherData["current_observation"]["wind_dir"];
    this.uv = this.weatherData["current_observation"]["UV"];
    this.humidity = this.weatherData["current_observation"]["relative_humidity"];
    this.dewPoint = this.weatherData["current_observation"][`dewpoint_${unit}`];
    this.feelsLike = this.weatherData["current_observation"][`feelslike_${unit}`];
    this.windChill = this.weatherData["current_observation"][`windchill_${unit}`];
    this.pressure = this.weatherData["current_observation"]["pressure_mb"];
    this.visibility = this.weatherData["current_observation"]["visibility_mi"];

    // get descriptive forecast strings for today and tonight
    if (this.units === "f") {
      // use these if we're using degrees F
      this.forecastToday = this.weatherData["forecast"]["txt_forecast"]["forecastday"][0]["fcttext"];
      this.forecastTonight = this.weatherData["forecast"]["txt_forecast"]["forecastday"][1]["fcttext"];
    } else {
      // use these if we're using degrees C
      this.forecastToday = this.weatherData["forecast"]["txt_forecast"]["forecastday"][0]["fcttext_metric"];
      this.forecastTonight = this.weatherData["forecast"]["txt_forecast"]["forecastday"][1]["fcttext_metric"];
    }

    this.setBackgroundColor();
  }

  // setCityName(cityName: string) {
  //   this.cityName = cityName;
  //   console.log(`Inside setCityName, cityName: ${this.cityName}, stateName: ${this.stateName}`);
  // }
}

interface Coordinates {
  lat: number;
  long: number;
}