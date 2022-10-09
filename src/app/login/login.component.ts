import {Component, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {NgxPermissionsService} from "ngx-permissions";
import {SecurityService} from "../security.service";
import {CoreOperationsMessages} from "../core-operations-messages";
import {AuthenticatedUser} from "../model/api/authenticated-user";
import {notEmpty} from "../utils/string-utils";
import {removeCurrentJwt, removeCurrentUser, storeCurrentJwt, storeCurrentUser} from "../utils/local-storage-utils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnChanges {

  readonly CURRENT_USER = 'currentUser';
  readonly CURRENT_JWT = 'currentJwt';

  loginForm: FormGroup = this.createForm();
  httpError: HttpErrorResponse | undefined;
  operationMessage: string = '';

  constructor(private fb: FormBuilder,
              private router: Router,
              private securityService: SecurityService,
              private ngxPermissionsService: NgxPermissionsService) {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges: changes=' + changes);
  }

  createForm() {
    const loginForm = this.fb.group({
      userName : [null, [Validators.max(20), Validators.required]],
      userPassword : [null, [Validators.max(30), Validators.required]],
    });
    return loginForm
  }

  authenticate() {
    this.securityService.login(this.loginForm.controls['userName'].value, this.loginForm.controls['userPassword'].value)
      .subscribe(
        authenticatedUser => {
          this.onSuccessfulLogin(authenticatedUser);
        },
        err => {
          console.error('login.authenticate: err="' + err);
          removeCurrentJwt();
          removeCurrentUser();
          this.httpError = err;
          this.operationMessage = CoreOperationsMessages.AUTHENTICATE_USER;
        }
      );
  }

  private onSuccessfulLogin(authenticatedUser: AuthenticatedUser): void {
    console.log('onSuccessfulLogin: user=' + authenticatedUser);
    const perms = authenticatedUser.permissions.map(p => p.name).filter(notEmpty);
    this.ngxPermissionsService.loadPermissions(perms);
    const loadedPerms = this.ngxPermissionsService.getPermissions();
    storeCurrentJwt(authenticatedUser.token);
    storeCurrentUser(this.loginForm.controls['userName'].value);
    //
    this.httpError = undefined;
    //
    this.router.navigate(['home']);
  }

}
