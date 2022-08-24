import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AuditedEntityGridComponent} from "../audited-entity-grid.component";
import {User} from "../model/entity/user";
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {CoreOperationsMessages} from "../core-operations-messages";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {DateFormatters} from "../formatters/date-formatters";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent extends AuditedEntityGridComponent<User> implements OnInit, OnChanges {

  constructor(private router: Router,
              private userService: UserService) {
    super();
    console.log('UserComponent constructor');
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('UserComponent.ngOnChanges: changes=' + changes);
  }


  protected initRowData(): User[] {
    this.rowData = [];
    this.operationMessage = CoreOperationsMessages.FINDALL_USER;
    this.userService.findAll()
      .subscribe(
        data => {
          this.rowData = data;
          this.httpError = undefined;
          console.log('UserComponent.initRowData: found ' + this.rowData.length + ' users');
          // localStorage.setItem('currentUser', this.loginForm.controls['userName'].value); // store current user for later use
        },
        err => {
          console.error('UserComponent.initRowData: err="' + err);
          this.rowData = [];
          this.httpError = err;
          this.operationMessage = CoreOperationsMessages.FINDALL_USER;
        }
      );
    return this.rowData
  }

  protected override createColumnDefs(): any[] {
    return [
      { headerName: '', field: 'selected', width: 30, headerCheckboxSelection: true, checkboxSelection: true, editable: true },
      { headerName: 'ID', field: 'id', width: 60, editable: false, filter: true },
      { headerName: 'Logon', field: 'logonName', width: 150, editable: false, filter: true },
      { headerName: 'First name', field: 'firstName', width: 150, editable: false, filter: false },
      { headerName: 'Family name', field: 'familyName', width: 150, editable: false, filter: false },
      { headerName: 'Status', field: 'status', width: 100, editable: false, filter: true },
      { headerName: 'Template', field: 'templateUser', width: 100, editable: false, filter: true },
      {
        headerName: 'Password Uptd',
        width: 150,
        editable: false,
        filter: true,
        valueFormatter: DateFormatters.dateWithTimeAsString
      },
      { headerName: 'Invalid Access Count', field: 'invalidAccessCount', width: 150, editable: false, filter: false },
      { headerName: 'Last logon', field: 'lastLogon', width: 175, editable: false, filter: false },
      { headerName: 'Created by', field: 'createdBy', width: 110, editable: false, filter: true },
      {
        headerName: 'Last updated',
        field: 'lastUpdated',
        width: 160,
        editable: false,
        filter: true,
        valueFormatter: DateFormatters.dateWithTimeAsString
      },
      { headerName: 'Action', field: 'action', width: 100, editable: false, filter: true }
    ];
  }

  saveChanges() {
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const user of toBeSaved) {
        if (DataAction.Add === user.action) {
          this.operationMessage = CoreOperationsMessages.ADD_ADDRESS_TYPE;
          this.enrichAuditData(user);
          this.userService.add(user).subscribe(
            data => {
              console.log('User ' + user.action + 'ed - typeof result=' + typeof data);
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('UserComponent.saveChanges: err="' + err);
              this.httpError = err;
            });
        } else if (DataAction.Update === user.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_USER;
          user.status = DataStatus.Amend;
          this.userService.update(user).subscribe(
            data => {
              console.log('User ' + user.action + 'ed - result=' + data);
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('UserComponent.update: err="' + err);
              this.httpError = err;
            }
          );

        } else if (DataAction.Delete === user.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_USER;
          user.status = DataStatus.Delete;
          this.userService.delete(user).subscribe(
            data => {
              console.log('User ' + user.action + 'ed - result=' + data);
              this.httpError = undefined;
              const remainingRows: User[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
              // this.updateGrid(remainingRows);
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('UserComponent.delete: err="' + err);
              this.httpError = err;
            }
          );
        }
      }
    }

  }

  revertChanges() {
    console.log('UserComponent.revertChanges: TODO');
  }

  protected createNewEntity(): User {
    return new User();
  }
}

