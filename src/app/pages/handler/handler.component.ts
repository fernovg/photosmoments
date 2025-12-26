import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { IonSpinner } from '@ionic/angular/standalone';
@Component({
  selector: 'app-handler',
  imports: [IonSpinner],
  templateUrl: './handler.component.html',
  styleUrls: ['./handler.component.scss'],
})
export class HandlerComponent  implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    console.log("Handler works!");
    if(this.auth.isAuthenticated()){
      this.router.navigate(['tabs/inicio']);
    } else {
      this.router.navigate(['signin']);
    }
  }

}
