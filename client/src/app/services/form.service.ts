import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  onFormSubmitted = new EventEmitter<String>();
  constructor() { }
}
