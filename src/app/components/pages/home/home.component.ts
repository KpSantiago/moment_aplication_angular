import { Component, OnInit } from '@angular/core';

import { Moments } from 'src/app/interfaces/moments';

import { MomentsService } from 'src/app/services/momentsService/moments.service';

import { environment } from 'src/environments/environment';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  baseApiUrl = environment.baseApiUrl;

  // array principal
  allMomentsHome: Moments[] = [];
  // array de busca por publicação
  momentsHome: Moments[] = [];

  // search icon
  faSearch = faSearch;

  // busca
  searchMoment: string = '';

  constructor(private ServiceMoments: MomentsService) {}

  ngOnInit(): void {
    this.ServiceMoments.getAllMoments().subscribe((items) => {
      // o items tem duas propriedades, o "data" e o "message"
      const data = items.data;

      // manipulando a data para a Brasileira
      data.map((items) => {
        items.created_at = new Date(items.created_at!).toLocaleDateString(
          'pt-BR'
        );
      });

      this.allMomentsHome = data;
      console.log(this.allMomentsHome);
      this.momentsHome = data;
    });
  }
  // search
  search(e: Event): void {
    const target = e.target as HTMLInputElement;

    const valueInput = target.value.toLowerCase();

    this.momentsHome = this.allMomentsHome.filter((search) => {
      const data = search.title.toLowerCase();
      return data.includes(valueInput);
    });
  }
}
