import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {CoreOperationsMessages} from "../core-operations-messages";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {Role} from "../model/entity/role";
import {RoleService} from "./role.service";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends AuditedNamedEntityGridComponent<Role> implements OnInit {

  constructor(private roleService: RoleService) {
    super();
    console.log('RoleComponent constructor');
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_ROLE;
    this.roleService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const role: Role = data[datum];
            role.selected = false;
            role.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('RoleComponent.findAll: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('RoleComponent.revertChanges: TODO');
  }

  saveChanges() {
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const datum of toBeSaved) {
        const role = datum as Role;
        if (DataAction.Add === role.action) {
          this.operationMessage = CoreOperationsMessages.ADD_ROLE;
          this.enrichAuditData(role);
          this.roleService.add(role).subscribe(
            data => {
              console.log('Role ' + role.action + 'ed - typeof result=' + typeof data);
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('RoleComponent.add: err="' + err);
              this.httpError = err;
            });
        } else if (DataAction.Update === role.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_ROLE;
          role.versionStatus = DataStatus.Amend;
          this.roleService.update(role).subscribe(
            data => {
              console.log('Role ' + role.action + 'ed - result=' + data);
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('RoleComponent.update: err="' + err);
              this.httpError = err;
            }
          );

        } else if (DataAction.Delete === role.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_ROLE;
          role.versionStatus = DataStatus.Delete;
          this.roleService.delete(role).subscribe(
            data => {
              console.log('Role ' + role.action + 'ed - result=' + data);
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.versionStatus!)));
              // this.updateGrid(remainingRows);
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('RoleComponent.delete: err="' + err);
              this.httpError = err;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): Role {
    const role = new Role();
    return role;
  }

}

