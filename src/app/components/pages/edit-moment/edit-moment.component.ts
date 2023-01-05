import { Component, OnInit } from '@angular/core';

import { Moments } from 'src/app/interfaces/moments';
import { MomentsService } from 'src/app/services/momentsService/moments.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageService } from 'src/app/services/messageService/message.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css'],
})
export class EditMomentComponent implements OnInit {
  baseApiUrl: string = 'http://localhost:3333/';

  moment?: Moments;

  btnText: string = 'Editar';

  constructor(
    private ServiceMoments: MomentsService,
    private routes: ActivatedRoute,
    private router: Router,
    private ServiceMessage: MessageService
  ) {}

  ngOnInit(): void {
    const id = Number(this.routes.snapshot.paramMap.get('id'));

    this.ServiceMoments.getMoment(id).subscribe((items) => {
      const data = items.data;

      data.created_at = new Date(data.created_at!).toLocaleDateString('pt-BR');

      this.moment = data;
    });
  }

  async editMoment(momentData: Moments) {
    const id = momentData.id;

    const formData = new FormData();

    formData.append('title', momentData.title);

    formData.append('description', momentData.description);

    if (momentData.image) {
      formData.append('image', momentData.image);
    }

    await this.ServiceMoments.updateMoment(id!, formData).subscribe();

    this.ServiceMessage.addMessage(
      `Momento ${momentData.title} editado com sucesso!`
    );

    this.router.navigate(['/']);
  }
}
