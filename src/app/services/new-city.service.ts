/**
 * This service is used to pass city and state strings from the ModalComponent to the main App Component so it can create a new CardComponent
 * with that city and state
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class NewCityService {
  private cityState = new BehaviorSubject<string>("default message");
  currentCityState = this.cityState.asObservable();

  constructor() { }

  changeCityState(newCityState: string) {
    this.cityState.next(newCityState);
  }

}
