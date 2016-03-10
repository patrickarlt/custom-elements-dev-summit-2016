import {Component, View, bootstrap} from 'angular2/angular2';

// Annotation section
@Component({
  selector: 'my-app'
})
@View({
  templateUrl: 'app.html'
})
// Component controller
class MyAppComponent {
  zoom: number;
  lat: number;
  lng: number;
  basemap: string;
  url: string;

  constructor() {
    this.zoom = 11;
    this.lat = 37.75;
    this.lng = -122.33;
    this.basemap = 'topo';
    this.url = 'http://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Alternative_Fueling_Stations/FeatureServer/0';
  }

  toggled ($event) {
    console.log('Basemap toggle in Angular 2:', $event);
  }
}

bootstrap(MyAppComponent);