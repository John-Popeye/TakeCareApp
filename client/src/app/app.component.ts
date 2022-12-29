import { Component } from '@angular/core';
import { LoadingService } from './common/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  showFiller = false;


  constructor(public loadingService: LoadingService) {
  }
}
