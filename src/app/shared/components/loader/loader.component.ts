import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [IonSpinner, CommonModule],
})
export class LoaderComponent implements OnInit {

  @Input() mensaje: string = 'Cargando';
  @Input() visible: boolean = false;

  constructor() { }

  ngOnInit() { 
  }

}
