import { 
  Component,
  Inject, 
  OnInit,
  ViewChild,
  ViewContainerRef } from '@angular/core';

import { NewCityService } from './services/new-city.service';
import { CreateComponentService } from './services/create-component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    '../../node_modules/weather-underground-icons/dist/wu-icons-style.css',
    './app.component.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'app';
  message: string;
  service: CreateComponentService;
  footerClass: string;
  numCards: number;

  @ViewChild("dynamic", {
    read: ViewContainerRef
  }) viewContainerRef: ViewContainerRef;

  constructor(private data: NewCityService, @Inject(CreateComponentService) service, @Inject(ViewContainerRef) viewContainerRef) {
    this.service = service;
    // service.setRootViewContainerRef(viewContainerRef);
    // service.addNewCard();
  }

  ngOnInit() {
    this.numCards = 1;
    this.footerClass = "footer footer-sticky";
    this.data.currentMessage.subscribe(message => {
      if (message !== "default message") {
        console.log(`Message received: ${message}`);
        const array = message.split(',');
        // console.log(city);
        const city = array[0];
        const state = array[1].substring(1); // there will be a space before the state abbreviation
        console.log(city, state);
        this.service.addNewCard(city, state);
        this.numCards++;
        if (this.numCards >= 3) {
          this.footerClass = "footer";
        }
      }
      this.message = message;
    });
    this.service.setRootViewContainerRef(this.viewContainerRef);
    // this.service.addNewCard();
    // this.service.addNewCard();
    // this.service.addNewCard();
  }
}
