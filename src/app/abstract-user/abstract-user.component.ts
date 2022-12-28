import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

import {User} from "../model/entity/user";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {hasFormFieldChanged, isFormFieldInvalid} from "../utils/form-utils";
import {LanguageService} from "../language/language.service";

@Component({
  selector: 'app-abstract-user',
  templateUrl: './abstract-user.component.html',
  styleUrls: ['./abstract-user.component.scss']
})
export abstract class AbstractUserComponent implements OnInit {

  protected httpError: HttpErrorResponse | undefined;
  protected operationMessage: string = '';

  protected user: User | undefined;
  protected userForm: FormGroup | undefined;

  protected selectedRow: User | undefined;

  constructor(protected router: Router,
              protected fb: FormBuilder,
              protected languageService: LanguageService) {
    console.log('app-abstract-user: constructor');
  }

  ngOnInit(): void {
    console.log('app-abstract-user: ngOnInit');
    this.initUserForm();
  }

  protected getUserForm(): FormGroup {
    return this.userForm!;
  }

  protected getFormControl(name: string) {
    return this.getUserForm()!.controls[name];
  }

  protected getFormControlValue(name: string): any {
    if (!this.getFormControl(name)) return undefined;
    return this.getFormControl(name).value;
  }

  protected closeForm() {
    this.router.navigate(['users']);
  }

  protected initUserForm() {
    console.log('app-abstract-user: initUserForm')
    this.userForm = this.fb.group({
      firstName: [null, [Validators.max(30), Validators.required]],
      familyName: [null, [Validators.max(50), Validators.required]],
      logonName: [null, [Validators.max(30), Validators.required]],
      lastLogon: [null, ],
      preferredLanguage: [null, Validators.required],
      invalidAccessCount: [null, Validators.min(0)],
      createdBy: [null, [Validators.required]],
      userGroupName: [null]
    });
  }

  // apply all values from User that dod not rely on GridApi such as titlesGridApi
  // as onGridReady is called after ngOnInit
  protected applyUser(existingUser: User) {
    console.log('app-abstract-user: applyUser - user is set=' + !(existingUser==undefined));
    console.log('app-abstract-user: applyUser - preferredLanguage name=' + existingUser.preferredLanguage?.name);
    this.getUserForm().controls['firstName'].patchValue(existingUser.firstName, {emitEvent: false});
    this.getUserForm().controls['familyName'].patchValue(existingUser.familyName, {emitEvent: false});
    this.getUserForm().controls['logonName'].patchValue(existingUser.logonName, {emitEvent: false});
    this.getUserForm().controls['lastLogon'].patchValue(existingUser.lastLogon, {emitEvent: false});
    this.getUserForm().controls['preferredLanguage'].patchValue(existingUser.preferredLanguage, {emitEvent: false});
    this.getUserForm().controls['invalidAccessCount'].patchValue(existingUser.invalidAccessCount, {emitEvent: false});
    this.getUserForm().controls['createdBy'].patchValue(existingUser.versionCreatedBy, {emitEvent: false});
  }

  protected hasFirstNameFieldChanged() {
    return hasFormFieldChanged(this.getUserForm(), 'firstName');
  }

  protected hasFamilyNameFieldChanged() {
    return hasFormFieldChanged(this.getUserForm(), 'familyName');
  }

  protected isLogonNameFieldInvalid() {
    return isFormFieldInvalid(this.getUserForm(), 'logonName');
  }

}
