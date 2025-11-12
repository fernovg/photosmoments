import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { UserInfoService } from './core/services/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private userInfoService = inject(UserInfoService);
  constructor() {}

  ngOnInit() {
    this.userInfoService.cargarInfo();
  }
}
