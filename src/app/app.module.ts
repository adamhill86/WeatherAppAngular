import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';

import { DataService } from './services/data.service';
import { NewCityService } from './services/new-city.service';
import { CreateComponentService } from './services/create-component.service';
import { ChangeUnitsService } from './services/change-units.service';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatButtonModule,
    NgbModule.forRoot()
  ],
  providers: [DataService, NewCityService, CreateComponentService, ChangeUnitsService],
  bootstrap: [AppComponent],
  entryComponents: [CardComponent]
})
export class AppModule {
  constructor() { }
 }