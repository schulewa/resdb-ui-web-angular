import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MenuComponent} from './menu/menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {ErrorMessageComponent} from './error-message/error-message.component';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from './home/home.component';
import {NgxPermissionsModule} from "ngx-permissions";
import {HttpClientModule} from "@angular/common/http";
import {AgGridModule} from "ag-grid-angular";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { CountryComponent } from './country/country.component';
import { PopupMenuComponent } from './popup-menu/popup-menu.component';
import { SimpleRefdataComponent } from './simple-refdata/simple-refdata.component';
import { TechnologyTypeGroupComponent } from './technology-type-group/technology-type-group.component';
import { TaleTypeComponent } from './tale-type/tale-type.component';
import { PublicationTypeComponent } from './publication-type/publication-type.component';
import { PersonTypeComponent } from './person-type/person-type.component';
import { RaceTypeComponent } from './race-type/race-type.component';
import { MeasureTypeComponent } from './measure-type/measure-type.component';
import { LanguageGroupComponent } from './language-group/language-group.component';
import { ImageTypeComponent } from './image-type/image-type.component';
import { HierarchyTypeComponent } from './hierarchy-type/hierarchy-type.component';
import { EventTypeGroupComponent } from './event-type-group/event-type-group.component';
import { EntityTypeComponent } from './entity-type/entity-type.component';
import { DeityTypeComponent } from './deity-type/deity-type.component';
import { CalendarTypeComponent } from './calendar-type/calendar-type.component';
import { ArtefactTypeComponent } from './artefact-type/artefact-type.component';
import { ArtefactGroupComponent } from './artefact-group/artefact-group.component';
import { AddressTypeComponent } from './address-type/address-type.component';
import { PlaceComponent } from './place/place.component';
import { AddPersonComponent } from './add-person/add-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';
import { PersonListComponent } from './person-list/person-list.component';
import { TitlesComponent } from './titles/titles.component';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { UserComponent } from './user/user.component';
import { AbstractPersonComponent } from './abstract-person/abstract-person.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { LanguageComponent } from './language/language.component';
import { YesNoCellRendererComponent } from './cell-renderers/yes-no-cell-renderer/yes-no-cell-renderer.component';
import { ThumbnailCellRendererComponent } from './cell-renderers/thumbnail-cell-renderer/thumbnail-cell-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ErrorMessageComponent,
    LoginComponent,
    HomeComponent,
    CountryComponent,
    PopupMenuComponent,
    SimpleRefdataComponent,
    TechnologyTypeGroupComponent,
    TaleTypeComponent,
    PublicationTypeComponent,
    PersonTypeComponent,
    RaceTypeComponent,
    MeasureTypeComponent,
    LanguageGroupComponent,
    ImageTypeComponent,
    HierarchyTypeComponent,
    EventTypeGroupComponent,
    EntityTypeComponent,
    DeityTypeComponent,
    CalendarTypeComponent,
    ArtefactTypeComponent,
    ArtefactGroupComponent,
    AddressTypeComponent,
    PlaceComponent,
    AddPersonComponent,
    EditPersonComponent,
    PersonListComponent,
    TitlesComponent,
    PersonDetailComponent,
    UserComponent,
    UserGroupComponent,
    LanguageComponent,
    YesNoCellRendererComponent,
    ThumbnailCellRendererComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AgGridModule,
    MatMenuModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    HttpClientModule,
    MatExpansionModule
  ],
  exports: [
    HttpClientModule,
    AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
