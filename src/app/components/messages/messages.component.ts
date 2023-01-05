import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { MessageService } from 'src/app/services/messageService/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  faTimes = faTimes;

  // colocamos como "public" pois será acessada também no template
  // com o privete teríamos acessor apenas aqui onde fica a lógica
  constructor(public ServiceMessage: MessageService) {}

  ngOnInit(): void {}
}
