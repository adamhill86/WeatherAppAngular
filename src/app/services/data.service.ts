import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { weatherUndergroundKey } from './apikeys'

@Injectable()
export class DataService {

  constructor(public http: HttpClient) { 
    console.log("Data service connected");
  }

  getDefaultWeatherData() {
    return this.http.get(`http://api.wunderground.com/api/${weatherUndergroundKey}/conditions/forecast/q/VA/Virginia_Beach.json`);
  }

  getWeatherDataLatLong(lat: number, long: number) {
    return this.http.get(`http://api.wunderground.com/api/${weatherUndergroundKey}/conditions/forecast/q/${lat},${long}.json`);
  }

  getWeatherData(city: string, state: string) {
    return this.http.get(`http://api.wunderground.com/api/${weatherUndergroundKey}/conditions/forecast/q/${state}/${city}.json`);
  }

}
