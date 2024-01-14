// ANGULAR MODULES
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

// BASE URL API FILE
import { environment } from 'src/environments/environment';

// SERVICES
import { MomentsService } from 'src/app/services/momentsService/moments.service';
import { CommentsService } from 'src/app/services/commentsService/comments.service';
import { MessageService } from 'src/app/services/messageService/message.service';

// INTERFACES
import { Moments } from 'src/app/interfaces/moments';
import { Comments } from 'src/app/interfaces/comments';

// ICONS
import {
  faArrowLeft,
  faEdit,
  faTimes,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css'],
})
export class MomentComponent implements OnInit {
  baseApiUrl: string = environment.baseApiUrl;

  momentDetail?: Moments;

  faReturn = faArrowLeft;
  faEdit = faEdit;
  faDelete = faTimes;
  faAdd = faPlus;

  commentForm!: FormGroup;

  constructor(
    private ServiceMoments: MomentsService,
    private route: ActivatedRoute,
    private router: Router,
    private ServiceMessage: MessageService,
    private ServiceComment: CommentsService
  ) { }

  ngOnInit(): void {
    // moment data
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.ServiceMoments.getMoment(id).subscribe((items) => {
      const data = items.data;
      data.created_at = new Date(data.created_at!).toLocaleDateString('pt-BR');
      this.momentDetail! = data;
    });

    // comment of moment data
    this.commentForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
    });
  }

  // get comment form
  get username() {
    return this.commentForm.get('username');
  }

  get text() {
    return this.commentForm.get('text');
  }

  async submitComment(formDirective: FormGroupDirective) {
    if (this.commentForm.invalid) {
      return;
    }

    const data: Comments = this.commentForm.value;

    data.moment_id = this.momentDetail!.id!;

    await this.ServiceComment.createComment(data).subscribe({
      next: (r) => {
        this.ServiceMessage.addMessage(
          r.message!
        );
      },
      error: (err) => {
        this.ServiceMessage.addMessage(
          err.error.message!
        );
      }
    });



    // resetar form
    this.commentForm.reset(); //reseta no front

    formDirective.resetForm(); //reseta no back

    this.closeFormComment();
  }

  // ACTIONS MOMMENT
  return(): void {
    this.router.navigate(['/']);
  }

  editMoment(id: number): void {
    this.router.navigate([`moments/edit/${id}`]);
  }

  async removeMoment(id: number) {
    await this.ServiceMoments.removeMoment(id).subscribe({
      next: (r) => {
        this.ServiceMessage.addMessage(r.message!);
        this.router.navigate(['/']);
      }, error: (err) => {
        this.ServiceMessage.addMessage(err.error.message!);
      }
    });
  }

  addComment(): void {
    const formContainer = document.querySelector('.form-container');

    formContainer?.classList.toggle('form-comment-container');
  }

  closeFormComment(): void {
    const formContainer = document.querySelector('.form-container');

    formContainer?.classList.remove('form-comment-container');
  }

  viewComments() {
    const commentsContainer = document.querySelector('.comments-container');
    const verMais = document.querySelector('.verMais');
    const verMenos = document.querySelector('.verMenos');

    commentsContainer?.classList.toggle('activeted');
    verMais!.innerHTML = '';
    verMenos!.innerHTML = 'Ver menos...';
  }

  closeViewComments() {
    const commentsContainer = document.querySelector('.comments-container');
    const verMais = document.querySelector('.verMais');
    const verMenos = document.querySelector('.verMenos');

    commentsContainer?.classList.toggle('activeted');
    verMais!.innerHTML = 'Ver mais...';
    verMenos!.innerHTML = '';
  }
}
