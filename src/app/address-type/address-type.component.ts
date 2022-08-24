import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {AddressType} from "../model/entity/address-type";
import {AddressTypeService} from "./address-type.service";
import {CoreOperationsMessages} from "../core-operations-messages";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";

@Component({
  selector: 'app-address-type',
  templateUrl: './address-type.component.html',
  styleUrls: ['./address-type.component.scss']
})
export class AddressTypeComponent extends AuditedNamedEntityGridComponent<AddressType> implements OnInit {

  constructor(private addressTypeService: AddressTypeService) {
    super();
    console.log('AddressTypeComponent constructor');
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_ADDRESS_TYPE;
    this.addressTypeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const addressType: AddressType = data[datum];
            addressType.selected = false;
            addressType.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('AddressTypeComponent.findAll: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('AddressTypeComponent.revertChanges: TODO');
  }

  saveChanges() {
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const addressType of toBeSaved) {
        if (DataAction.Add === addressType.action) {
          this.operationMessage = CoreOperationsMessages.ADD_ADDRESS_TYPE;
          this.enrichAuditData(addressType);
          this.addressTypeService.add(addressType).subscribe(
            data => {
              console.log('Address type ' + addressType.action + 'ed - typeof result=' + typeof data);
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('AddressTypeComponent.add: err="' + err);
              this.httpError = err;
            });
        } else if (DataAction.Update === addressType.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_ADDRESS_TYPE;
          addressType.status = DataStatus.Amend;
          this.addressTypeService.update(addressType).subscribe(
            data => {
              console.log('Address type ' + addressType.action + 'ed - result=' + data);
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('AddressTypeComponent.update: err="' + err);
              this.httpError = err;
            }
          );

        } else if (DataAction.Delete === addressType.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_ADDRESS_TYPE;
          addressType.status = DataStatus.Delete;
          this.addressTypeService.delete(addressType).subscribe(
            data => {
              console.log('Address type ' + addressType.action + 'ed - result=' + data);
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
              // this.updateGrid(remainingRows);
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('AddressTypeComponent.delete: err="' + err);
              this.httpError = err;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): AddressType {
    return new AddressType();
  }

}

