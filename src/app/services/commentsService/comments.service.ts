import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { Comments } from 'src/app/interfaces/comments';
import { Response } from 'src/app/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private baseApiUrl = environment.baseApiUrl;

  private apiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) {}

  createComment(comment: Comments): Observable<Response<Comments>> {
    return this.http.post<Response<Comments>>(
      `${this.apiUrl}/${comment.momentId}/comments`,
      comment
    );
  }
}
