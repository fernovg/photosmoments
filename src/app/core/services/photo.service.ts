import { inject, Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { UserPhoto } from '../models/photos.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
// import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  private baseUrl = environment.base_url;
  private http = inject(HttpClient);
  public photos: UserPhoto[] = [];

  constructor() { }

  public async addNewToGallery(): Promise<UserPhoto | null> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      // resultType: CameraResultType.Base64,    
      source: CameraSource.Camera,
      quality: 90
    });

    const response = await fetch(capturedPhoto.webPath!);
    const blob = await response.blob();
    const file = new File([blob], `photo_${Date.now()}.jpeg`, { type: 'image/jpeg' });

    const newPhoto: UserPhoto = {
      // filepath: new Date().getTime().toString(),
      filepath: capturedPhoto.path || `photo_${Date.now()}.jpeg`,
      webviewPath: capturedPhoto.webPath!,
      // base64: `data:image/jpeg;base64,${capturedPhoto.base64String}`
      file: file,
    };

    this.photos.unshift(newPhoto);
    return newPhoto;
  }

  subirFotos(file: File, eventoId: string) {
    const formData = new FormData();
    formData.append('event_id', eventoId.toString());
    formData.append('image', file.name);
    return this.http.post<any>(`${this.baseUrl}/guest-photos`, formData);
  }

}
