import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  message: string = '';

  constructor() {}

  addMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.clearMessage();
    }, 3000);
  }
  clearMessage() {
    this.message = '';
  }
}
