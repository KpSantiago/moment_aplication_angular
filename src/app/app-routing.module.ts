//  MÓDULOS
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { NewMomentComponent } from './components/pages/new-moment/new-moment.component';
import { MomentComponent } from './components/pages/moment/moment.component';
import { EditMomentComponent } from './components/pages/edit-moment/edit-moment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'moments/new', component: NewMomentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'moments/:id', component: MomentComponent },
  { path: 'moments/edit/:id', component: EditMomentComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingComponent {}
