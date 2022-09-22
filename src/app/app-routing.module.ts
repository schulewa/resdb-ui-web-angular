import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CountryComponent} from "./country/country.component";
import {PlaceComponent} from "./place/place.component";
import {SimpleRefdataComponent} from "./simple-refdata/simple-refdata.component";
import {PersonListComponent} from "./person-list/person-list.component";
import {PersonDetailComponent} from "./person-detail/person-detail.component";
import {TitlesComponent} from "./titles/titles.component";
import {UserComponent} from "./user/user.component";
import {UserGroupComponent} from "./user-group/user-group.component";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'countries', component: CountryComponent },
  { path: 'login', component: LoginComponent },
  { path: 'persons', component: PersonListComponent },
  { path: 'addperson', component: PersonDetailComponent },
  { path: 'places', component: PlaceComponent },
  { path: 'simple-refdata', component: SimpleRefdataComponent },
  {path: 'users', component: UserComponent},
  {path: 'usergroups', component: UserGroupComponent},
  { path: 'titles', component: TitlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
