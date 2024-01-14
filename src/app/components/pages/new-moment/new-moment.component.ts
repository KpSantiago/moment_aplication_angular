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
  ) { }

  ngOnInit(): void { }

  async createHandler(momentData: Moments) {
    // utilizaremos a classe formData para o envio dos dados
    // como trabalharemos com a API teremos de usar a function como async

    const formData = new FormData();
    formData.append('title', momentData.title)
    formData.append('description', momentData.description)
    formData.append('image', momentData.image)


    await this.serviceMoments.postMoment(formData).subscribe({
      next: () => {
        // navigate é o método utilizado para redirect
        this.ServiceMessage.addMessage('Momento compartilhado!!');
        this.router.navigate(['/']);
      }, error: (err) => {
        this.ServiceMessage.addMessage(err.error.message);
      }
    });
  }
}
