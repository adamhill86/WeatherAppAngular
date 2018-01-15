/**
 * This service is used to pass messages from the F and C unit buttons on the page to the CardComponents to tell them to change units
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ChangeUnitsService {
  private unit = new BehaviorSubject<string>("f"); // set the default unit type to Fahrenheit
  currentUnit = this.unit.asObservable();

  constructor() { }

  /**
   * This method sets the unit to either 'c' or 'f' depending on which button called this method
   * @param unit The new unit type (either Fahrenheit 'f' or Celsius 'c')
   */
  changeUnit(unit: string) {
    this.unit.next(unit);
  }
}
