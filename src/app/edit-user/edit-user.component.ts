import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractUserComponent} from "../abstract-user/abstract-user.component";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {User} from "../model/entity/user";
import {UserGroupMembership} from "../model/entity/user-group-membership";
import {ColDef, GridApi, GridOptions} from "ag-grid-community";
import {LanguageService} from "../language/language.service";
import {Language} from "../model/entity/language";
import {CoreOperationsMessages} from "../core-operations-messages";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent extends AbstractUserComponent implements OnInit {

  @Input() override user: User | undefined;

  @Output() userChange = new EventEmitter();

  protected userGroupMembershipRowData: UserGroupMembership[] = [];

  protected userGroupMembershipColumnDefs: ColDef[] = [];
  protected userGroupMembershipGridApi: GridApi | undefined;
  showUserGroupMembershipsPanel: boolean = false;

  protected languages: Language[] = [];
  protected isLanguageSubmitted = false;

  constructor(protected override router: Router,
              protected override fb: FormBuilder,
              protected override languageService: LanguageService) {
    super(router,fb, languageService)
  }

  override ngOnInit(): void {
    super.ngOnInit();
    console.log('app-edit-user: start of ngOnInit - User=' + this.user!.toString());

    this.initLanguageData();
    // set values based on passed in User
    if (this.user) {
      this.initUserGroupMembershipRowData();
      console.log('app-edit-user: call applyUser for ' + this.user.firstName + ' ' + this.user.familyName);
      this.applyUser(this.user);
      //
      console.log('app-edit-user: ')
    }
  }

  protected initLanguageData() {
    console.log('app-edit-user: initLanguageData');
    this.languages = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_LANGUAGE;
    this.languageService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (datum.hasOwnProperty(datum)) {
            const language: Language = data[datum];
            language.selected = false;
            language.isDataChanged = false;
          }
        }
        this.languages = data;
        this.httpError = undefined;
      },
      err => {
        console.error('app-edit-user: findAll: err="' + err + '"');
        this.httpError = err;
      });
  }

  protected getLanguages(): Language[] {
    return this.languages;
  }

  onChangeLanguage(event: any) {
    console.log('app-edit-user: onChangeLanguage - event.target.value=' + event.target.value);
    console.log('app-edit-user: onChangeLanguage - form control language=' + this.getUserForm().controls['preferredLanguage'].value);
    this.getUserForm().controls['preferredLanguage'].patchValue(event.target.value, {onlySelf: true});
  }

  compareLanguage(language1: Language, language2: Language): boolean {
    console.log('app-edit-user: compareLanguage');
    return language1 && language2 ? language1.name == language2.name : language1 === language2;
  }

  protected initUserGroupMembershipRowData(): UserGroupMembership[] {
    console.log('app-edit-user: initUserGroupMembershipsRowData');
    this.userGroupMembershipRowData = [];
    //
    if (this.user?.groupMemberships) {
      console.log('app-edit-user: initUserGroupMembershipsRowData');
      this.userGroupMembershipRowData = this.user!!.groupMemberships;
      // for (const datum:UserGroupMembership in this.user!!.groupMemberships) {
      //   this.userGroupMembershipRowData.push(datum);
      // }
    }

    return this.userGroupMembershipRowData;
  }

  protected createUserGroupMembershipColumnDefs(): any[] {
    return [
      {headerName: 'Selected', field: 'selected', width: 100, checkboxSelection: true, editable: true},
      {headerName: 'ID', field: 'id', width: 60, editable: false, filter: true},
      {headerName: 'Group Name', field: 'userGroupMembershipRowData.displayName', width: 100, editable: false, filter: true},
      {headerName: 'Valid From', field: 'userGroupMembershipRowData.validFrom', width: 100, editable: false, filter: true},
      {headerName: 'Valid Until', field: 'userGroupMembershipRowData.validTo', width: 100, editable: false, filter: true},
    ];
  }

  protected createUserGroupMembershipGridOptions(): GridOptions {
    return <GridOptions>{
      animateRows: true,
      enableCellChangeFlash: true,
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
      // onCellValueChanged: this.onChangeTitle, // TODO should this be commented out ?
      rowDeselection: false,
      rowSelection: 'multiple',
      statusBar: {
        statusPanels: [
          {statusPanel: 'agTotalRowCountComponent', align: 'left'},
          {statusPanel: 'agSelectedRowCountComponent'}
        ]
      },
      unSortIcon: true
    };
  }

  openCloseGroupMembershipsPanel() {
    console.log('app-edit-user: openCloseGroupMembershipsPanel - current showUserGroupMembershipsPanel=' + this.showUserGroupMembershipsPanel);
    this.showUserGroupMembershipsPanel = !this.showUserGroupMembershipsPanel;
  }

  protected onUserGroupMembershipSelectionChanged(event: any) {
    console.log('app-edit-user: onUserGroupMembershipSelectionChanged');
  }

  protected onUserGroupMembershipCellValueChanged(event: any) {
    console.log('app-edit-user: onUserGroupMembershipCellValueChanged');
  }

  protected getUserGroupMembershipRowData(): UserGroupMembership[] {
    return this.userGroupMembershipRowData;
  }

  protected onUserGroupMembershipGridReady(params: { api: GridApi<any> | undefined; }) {
    console.log('app-edit-user: onUserGroupMembershipGridReady');
    this.userGroupMembershipGridApi = params.api;
  }

  protected getUserGroupMembershipColumnDefs() {
    return this.userGroupMembershipColumnDefs;
  }

  haveGroupDataChanges(): boolean {
    // const changedData = this.getUserGroupMembershipRowData().filter(row => row.action != null);
    // return changedData && changedData.length > 0;
    return false;
  }

  saveChanges() {
    console.log('app-edit-user: saveChanges - TODO');
  }

  revertChanges() {
    console.log('app-edit-user: revertChanges - TODO');
  }
}
