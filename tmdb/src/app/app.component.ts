import { Component } from '@angular/core';
import { ConfigurationsService } from './services/configurations/configurations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'tmdb';
  constructor(private configurationsService: ConfigurationsService) {
    configurationsService.getConfigurations();
  }
}
