/**
 * This service is used to fetch weather data from the Weather Underground API
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { weatherUndergroundKey } from './apikeys'

@Injectable()
export class DataService {

  constructor(public http: HttpClient) { 
    // console.log("Data service connected");
  }

  /**
   * This method fetches data about Virginia Beach
   * This is called when geolocation isn't available
   */
  getDefaultWeatherData() {
    return this.http.get(`https://api.wunderground.com/api/${weatherUndergroundKey}/conditions/forecast/q/VA/Virginia_Beach.json`);
  }

  /**
   * This method fetches data about a given lat,long
   * @param lat Latitude
   * @param long Longitude
   */
  getWeatherDataLatLong(lat: number, long: number) {
    return this.http.get(`https://api.wunderground.com/api/${weatherUndergroundKey}/conditions/forecast/q/${lat},${long}.json`);
  }

  /**
   * This method fetches data about a given city and state
   * @param city The city
   * @param state The state
   */
  getWeatherData(city: string, state: string) {
    return this.http.get(`https://api.wunderground.com/api/${weatherUndergroundKey}/conditions/forecast/q/${state}/${city}.json`);
  }

}
