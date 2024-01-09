import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor() {}

  encodeImage(file: File): Observable<string> {
    const reader = new FileReader();
    if (file) {
      return new Observable<string>((obs) => {
        reader.onloadend = () => {
          const base64 = reader.result as string;
          obs.next(base64);
          obs.complete();
        };

        reader.readAsDataURL(file);
      }).pipe(
        catchError((err) => {
          console.log('Error converting file to base64 string:', err);
          return EMPTY;
        })
      );
    }
    return EMPTY;
  }
}
