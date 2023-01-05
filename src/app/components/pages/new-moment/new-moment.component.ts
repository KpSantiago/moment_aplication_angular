import { Component, OnInit } from '@angular/core';
import { Moments } from 'src/app/interfaces/moments';

// fazendo redirect para home ao postar uma publicação
// precisa-se do router
import { Router } from '@angular/router';

// service
import { MomentsService } from 'src/app/services/momentsService/moments.service';
import { MessageService } from 'src/app/services/messageService/message.service';

MessageService;
@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css'],
})
export class NewMomentComponent implements OnInit {
  buttonText: string = 'Compartilhar';
  constructor(
    private serviceMoments: MomentsService,
    private ServiceMessage: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  async createHandler(moment: Moments) {
    // utilizaremos a classe formData para o envio dos dados
    // como trabalharemos com a API teremos de usar a function como async

    const formData = new FormData();

    // para trabalhar e adicionar no formData os paremetros do append() são
    // parametro 1: atributo/campo
    // parametro 2: o que vai ser adicionado nesse campo(parametro 1)
    formData.append('title', moment.title);

    formData.append('description', moment.description);

    if (moment.image) {
      formData.append('image', moment.image);
    }

    await this.serviceMoments.postMoment(formData).subscribe();

    // navigate é o método utilizado para redirect
    this.ServiceMessage.addMessage('Momento compartilhado!!');
    this.router.navigate(['/']);
  }
}
