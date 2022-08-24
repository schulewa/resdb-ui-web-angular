import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {TitlesService} from "../titles/titles.service";
import {AbstractPersonComponent} from "../abstract-person/abstract-person.component";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent extends AbstractPersonComponent implements OnInit {

  @Output() personChange = new EventEmitter();

  constructor(router: Router, fb: FormBuilder, titlesService: TitlesService) {
    super(router, fb, titlesService);
  }

  saveChanges() {
    console.log('app-edit-person.saveChanges() - TODO');
  }

}
