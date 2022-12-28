import { Component, OnInit } from '@angular/core';
import {AuditedNamedEntityGridComponent} from "../audited-named-entity-grid.component";
import {PublicationType} from "../model/entity/publication-type";
import {CoreOperationsMessages} from "../core-operations-messages";
import {IAuditedNameDataType} from "../model/interfaces/audited-name-data-type";
import {DataAction} from "../model/enums/data-action";
import {DataStatus} from "../model/enums/data-status";
import {PublicationTypeService} from "./publication-type.service";

@Component({
  selector: 'app-publication-type',
  templateUrl: './publication-type.component.html',
  styleUrls: ['./publication-type.component.scss']
})
export class PublicationTypeComponent extends AuditedNamedEntityGridComponent<PublicationType> implements OnInit {

  constructor(private publicationTypeService: PublicationTypeService) {
    super();
    this.columnDefs = this.createColumnDefs();
    this.gridOptions = this.createGridOptions(this.onCellValueChanged);
  }

  initRowData() {
    this.rowData = [];
    //
    this.operationMessage = CoreOperationsMessages.FINDALL_PUBLICATION_TYPE;
    this.publicationTypeService.findAll().subscribe(
      data => {
        for (const datum in data) {
          if (datum.hasOwnProperty(datum)) {
            const publicationType: IAuditedNameDataType = data[datum];
            publicationType.selected = false;
            publicationType.isDataChanged = false;
          }
        }
        this.rowData = data;
      });
  }

  revertChanges() {
    console.log('PublicationTypeService.revertChanges: TODO');
  }

  saveChanges() {
    // save only new and modified rows
    const toBeSaved = this.rowData.filter(row => row.action != null);

    if (toBeSaved) {
      for (const datum of toBeSaved) {
        const publicationType = datum as PublicationType;
        if (DataAction.Add === publicationType.action) {
          this.operationMessage = CoreOperationsMessages.ADD_PUBLICATION_TYPE;
          this.enrichAuditData(publicationType);
          this.publicationTypeService.add(publicationType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            });
        } else if (DataAction.Update === publicationType.action) {
          this.operationMessage = CoreOperationsMessages.UPDATE_PUBLICATION_TYPE;
          publicationType.versionStatus = DataStatus.Amend;
          this.publicationTypeService.update(publicationType).subscribe(
            data => {
              this.httpError = undefined;
              this.updateGrid(data);
            },
            err => {
              this.httpError = err;
            }
          );
        } else if (DataAction.Delete === publicationType.action) {
          this.operationMessage = CoreOperationsMessages.DELETE_PUBLICATION_TYPE;
          publicationType.versionStatus = DataStatus.Delete;
          this.publicationTypeService.delete(publicationType).subscribe(
            data => {
              this.httpError = undefined;
              const remainingRows: IAuditedNameDataType[] = this.rowData.filter(r => (this.liveStatuses.includes(r.versionStatus!)));
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

  protected createNewEntity(): PublicationType {
    return new PublicationType();
  }
}
