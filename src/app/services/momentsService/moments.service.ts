import { Injectable } from '@angular/core';

// como trabalharemos com o formData não precisaremos do HttpHeaders
// para coonfigurar em JSON, pois o formData não precisa de configuração
// pacote http
import { HttpClient } from '@angular/common/http';

// observable
import { Observable } from 'rxjs';

// enviroment com o URL base da API
import { environment } from 'src/environments/environment';

import { Moments } from 'src/app/interfaces/moments';

import { Response } from 'src/app/interfaces/response';

@Injectable({
  providedIn: 'root',
})
export class MomentsService {
  // aqui será a URL base da nossa API
  private baseApiUrl: string = environment.baseApiUrl;

  // aqui será a rota que utilizaremos para a requisição
  private ApiUrl = `${this.baseApiUrl}api/moments`;

  constructor(private http: HttpClient) { }

  // tipamos como FormData logicament porque são dados de um forms
  postMoment(formData: FormData): Observable<FormData> {
    // para a utilização do método post:
    // parametro 1: URL da API utilizada
    // parametro 2: Dado que será salvo no banco
    return this.http.post<FormData>(this.ApiUrl, formData);
  }

  // pegando os moments para a home
  // fazemos a tipagem assim para que os dados do que vem do banco junto da resposta
  // sejam tratados corretamente
  getAllMoments(): Observable<Response<Moments[]>> {
    return this.http.get<Response<Moments[]>>(this.ApiUrl);
  }

  getMoment(id: number): Observable<Response<Moments>> {
    return this.http.get<Response<Moments>>(`${this.ApiUrl}/${id}`);
  }

  removeMoment(id: number): Observable<Response<Moments>> {
    return this.http.delete<Response<Moments>>(`${this.ApiUrl}/${id}`);
  }

  updateMoment(
    id: number,
    momentData: FormData
  ): Observable<Response<Moments>> {
    const url = `${this.ApiUrl}/${id}`;

    return this.http.put<Response<Moments>>(url, momentData);
  }
}
