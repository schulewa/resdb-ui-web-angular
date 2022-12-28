import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from "../model/entity/person";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {TitlesService} from "../titles/titles.service";
import {AbstractPersonComponent} from "../abstract-person/abstract-person.component";
import {CoreOperationsMessages} from "../core-operations-messages";

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.scss']
})
export class EditPersonComponent extends AbstractPersonComponent implements OnInit {

  @Input() override person: Person | undefined;

  @Output() personChange = new EventEmitter();


  constructor(router: Router, fb: FormBuilder, titlesService: TitlesService) {
    super(router, fb, titlesService);
  }

  override ngOnInit() {
    super.ngOnInit();
    console.log('app-edit-person: start of ngOnInit - Person=' + this.person!.toString());

    // set values based on passed in Person
    if (this.person) {
      this.applyPerson(this.person);
    }
    // console-person-maint.log('app-edit-person: ngOnInit - Person.gender=' + this.person?.gender);
    //
    // this.getPersonForm()!.controls['gender'].setValue(this.person?.gender, {onlySelf: true});

    console.log('app-edit-person: end of ngOnInit');
  }

  saveChanges() {
    console.log('app-edit-person.saveChanges() - TODO');
  }
}

