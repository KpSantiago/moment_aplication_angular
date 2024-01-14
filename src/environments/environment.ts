// aqui no enviroments nós colocaremos dados que serão possíveis
// ser acessados de qualquer local da aplicação

interface env {
  production: boolean;
  baseApiUrl: string;
}
export const environment: env = {
  production: false,

  // URL API
  baseApiUrl: 'https://moments-api-8cks.onrender.com/',
};

