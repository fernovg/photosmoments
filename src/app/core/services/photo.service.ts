import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { UserPhoto } from '../models/photos.interface';
// import { Filesystem, Directory } from '@capacitor/filesystem';
// import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})

export class PhotoService {
  public photos: UserPhoto[] = [];

  constructor() { }

public async addNewToGallery(): Promise<UserPhoto | null> {
  const capturedPhoto = await Camera.getPhoto({
    resultType: CameraResultType.Base64,
    source: CameraSource.Camera,
    quality: 100
  });

  const newPhoto: UserPhoto = {
    filepath: new Date().getTime().toString(),
    webviewPath: capturedPhoto.webPath!,
    base64: `data:image/jpeg;base64,${capturedPhoto.base64String}`
  };

  this.photos.unshift(newPhoto);
  return newPhoto;
}



}
