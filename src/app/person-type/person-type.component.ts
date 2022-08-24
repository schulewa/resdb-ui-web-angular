import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {PersonType} from "../model/entity/person-type";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {PersonTypeService} from "./person-type.service";

@Component({
  selector: 'app-person-type',
  templateUrl: './person-type.component.html',
  styleUrls: ['./person-type.component.scss']
})
export class PersonTypeComponent extends AuditedNamedEntityGridComponent<PersonType> implements OnInit {

  constructor(private personTypeService: PersonTypeService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_PERSON_TYPE;
    this.personTypeService.findAll().subscribe((resp) => {
      for (const datum in resp) {
        if (datum.hasOwnProperty(datum)) {
          const personType: IAuditedNameDataType = resp[datum];
          personType.selected = false;
          personType.isDataChanged = false;
        }
      }
      this.rowData = resp;
    });
  }

  revertChanges() {
    console.log('PersonTypeComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('PersonTypeComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const personType of toBeSaved) {
        if (DataAction.Add === personType.action) {
          this.operationMessage = CoreOperationsMessages.ADD_PERSON_TYPE;
          this.enrichAuditData(personType);
          this.personTypeService.add(personType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            });
        } else if (DataAction.Update === personType.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_PERSON_TYPE;
          personType.status = DataStatus.Amend;
          this.personTypeService.update(personType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === personType.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_PERSON_TYPE;
          personType.status = DataStatus.Delete;
          this.personTypeService.delete(personType).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              this.httpError = err;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): PersonType {
    return new PersonType();
  }

}
