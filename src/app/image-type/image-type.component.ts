import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {ImageType} from "../model/entity/image-type";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {ImageTypeService} from "./image-type.service";

@Component({
  selector: 'app-image-type',
  templateUrl: './image-type.component.html',
  styleUrls: ['./image-type.component.scss']
})
export class ImageTypeComponent extends AuditedNamedEntityGridComponent<ImageType> implements OnInit {

  constructor(private imageTypeService: ImageTypeService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_IMAGE_TYPE;
    this.imageTypeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (data.hasOwnProperty(datum)) {
            const imageType: IAuditedNameDataType = data[datum];
            imageType.selected = false;
            imageType.isDataChanged = false;
          }
        }
        this.rowData = data;
        this.httpError = undefined;
      },
      err => {
        console.error('ImageTypeComponent.findall: err="' + err);
        this.httpError = err;
      });
  }

  revertChanges() {
    console.log('ImageTypeComponent.revertChanges: TODO');
  }

  saveChanges() {
    console.log('ImageTypeComponent.saveChanges - entry - number of rows = ' + this.rowData.length);
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const imageType of toBeSaved) {
        if (DataAction.Add === imageType.action) {
          this.operationMessage = CoreOperationsMessages.ADD_IMAGE_TYPE;
          this.enrichAuditData(imageType);
          this.imageTypeService.add(imageType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('ImageTypeComponent.add: err="' + err);
              this.httpError = err;
            });
        } else if (DataAction.Update === imageType.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_IMAGE_TYPE;
          imageType.status = DataStatus.Amend;
          this.imageTypeService.update(imageType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              console.error('ImageTypeComponent.update: err="' + err);
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === imageType.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_IMAGE_TYPE;
          imageType.status = DataStatus.Delete;
          this.imageTypeService.delete(imageType).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.status)));
              this.gridApi!.setRowData(remainingRows);
              this.gridApi!.refreshCells();
            },
            err => {
              console.error('ImageTypeComponent.delete: err="' + err);
              this.httpError = err;
            }
          );
        }
      }
    }

  }

  protected createNewEntity(): ImageType {
    return new ImageType();
  }

}
