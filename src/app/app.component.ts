import { Component, inject, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { UserInfoService } from './core/services/user-info.service';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private userInfoService = inject(UserInfoService);
  constructor(private platform: Platform) {
     this.platform.ready().then(() => {
    StatusBar.setStyle({ style: Style.Default });
    StatusBar.setOverlaysWebView({ overlay: true }); // ⚠️ IMPORTANTE
  });
  }

  ngOnInit() {
    
  }
}
