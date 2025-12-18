import { CommonModule, formatDate } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonToolbar, ModalController, IonList, IonLabel, IonToggle, IonBadge, IonFooter } from '@ionic/angular/standalone';
import { ServiciosService } from 'src/app/core/services/servicios.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidatorsForm } from 'src/app/core/services/validator.service';
import { FechaModalComponent } from '../fecha-modal/fecha-modal.component';
@Component({
  selector: 'app-crear-evento-modal',
  standalone: true,
  templateUrl: './crear-evento-modal.component.html',
  styleUrls: ['./crear-evento-modal.component.scss'],
  imports: [IonLabel, IonList,
    FormsModule, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonToolbar, ReactiveFormsModule, IonToggle, CommonModule, IonBadge, IonFooter]
})
export class CrearEventoModalComponent implements OnInit {

  private modalCtrl = inject(ModalController);
  private fb = inject(FormBuilder);
  private toastService = inject(ToastService);
  private valiService = inject(ValidatorsForm);
  private servicios = inject(ServiciosService);

  isLoading = false;

  fechaSeleccionada: string | null = null;

  public cEvento: FormGroup = this.fb.group({
    name: ['', [Validators.required,]],
    event_date: ['', Validators.required],
    address: ['', Validators.required],
    // close_date: ['', Validators.required],
    total_guests: [10, Validators.required],
    max_photos_per_guest: [10, Validators.required],
    can_view_photos_before_event: [true],
    can_upload_photos_before_event: [true],
    days_before_upload: [1, Validators.required],
  });

  constructor() { }

  ngOnInit() { }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {

    if (this.cEvento.invalid) {
      console.log(this.cEvento.value);
      this.toastService.error('Completa todos los campos requeridos');
      return;
    }

    const raw = this.cEvento.value;

    const payload = {
      name: raw.name,
      event_date: formatDate(raw.event_date, 'yyyy-MM-dd HH:mm', 'en'),
      address: raw.address,
      // close_date: formatDate(raw.close_date, 'yyyy-MM-dd', 'en'),
      total_guests: Number(raw.total_guests),
      max_photos_per_guest: Number(raw.max_photos_per_guest),
      can_view_photos_before_event: !!raw.can_view_photos_before_event,
      can_upload_photos_before_event: !!raw.can_upload_photos_before_event,
      days_before_upload: Number(raw.days_before_upload)
    };

    console.log(payload);

    // this.isLoading = true;
    // this.servicios.guardarDatos('events', payload).subscribe({
    //   next: (data) => {
    //     this.isLoading = false;
    //     this.toastService.success('Creado Correctamente');
    //     this.modalCtrl.dismiss(data, 'confirm');
    //   },
    //   error: (error) => {
    //     this.isLoading = false;
    //     this.toastService.error('Error al crear el evento');
    //   }
    // })
  }

  valVerFotos() {
    this.cEvento.get('can_view_photos_before_event')!.markAsTouched();
  }

  valSubirFotos() {
    this.cEvento.get('can_upload_photos_before_event')!.markAsTouched();
  }

  public invitados = [10, 15, 20, 30];
  public fotos = [10, 25, 50, 100, 150, 250];
  public dias = [1, 7, 14];

  public customInvitados = false;
  public customFotos = false;
  public customDays = false;

  setInvitados(value: number | 'custom') {
    if (value === 'custom') {
      this.customInvitados = true;
      this.cEvento.patchValue({ total_guests: null });
    } else {
      this.customInvitados = false;
      this.cEvento.patchValue({ total_guests: value });
    }
  }

  setFotos(value: number | 'custom') {
    if (value === 'custom') {
      this.customFotos = true;
      this.cEvento.patchValue({ max_photos_per_guest: null });
    } else {
      this.customFotos = false;
      this.cEvento.patchValue({ max_photos_per_guest: value });
    }
  }

  setDias(value: number | 'custom') {
    if (value === 'custom') {
      this.customDays = true;
      this.cEvento.patchValue({ days_before_upload: null });
    } else {
      this.customDays = false;
      this.cEvento.patchValue({ days_before_upload: value });
    }
  }

  async abrirFecha() {
    const modal = await this.modalCtrl.create({
      component: FechaModalComponent,
      breakpoints: [0, 0.32, 0.5],
      initialBreakpoint: 0.32,
    });

    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data) {
      this.fechaSeleccionada = data;
      this.cEvento.patchValue({ event_date: data });
    }
  }

}
