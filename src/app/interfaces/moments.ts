export interface Moments {
  /* aqui eu falo que o id nem sempre será incrementado, pois já é autoincrementado no banco, então não 
  necessariamente eu precisarei enviar o id */
  id?: number;
  title: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
  comments?: [{ text: string; username: string }];
}
