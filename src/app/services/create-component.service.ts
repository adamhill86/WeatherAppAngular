import { 
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector } from '@angular/core';

import { CardComponent } from '../components/card/card.component';

@Injectable()
export class CreateComponentService {
  factoryResolver: ComponentFactoryResolver;
  rootViewContainer: any;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver;
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  addNewCard(cityName: string, state: string) {
    const factory = this.factoryResolver.resolveComponentFactory(CardComponent);
    // const component = factory.create(this.rootViewContainer.parentInjector);
    // this.rootViewContainer.insert(component.hostView);
    const componentRef = this.rootViewContainer.createComponent(factory);
    // cmpRef.instance.cityName = "Virginia Beach";
    // cmpRef.instance.stateName = "VA";
    (<CardComponent>componentRef.instance).cityName = cityName;
    (<CardComponent>componentRef.instance).stateName = state;
  }

}
