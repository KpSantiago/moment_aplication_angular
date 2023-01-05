export interface Response<T> {
  // a reposta, aqui, virá com mais dados
  message?: string; // messagem dada ao usuário
  data: T; // dados que virão, pode ser um moment ou um comment
}
