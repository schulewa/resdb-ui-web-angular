import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { PopupMenuComponent } from './popup-menu/popup-menu.component';
import { DataStatus } from './model/enums/data-status';
import { DataAction } from './model/enums/data-action';
import { HttpErrorResponse } from '@angular/common/http';
import { DateFormatters } from './formatters/date-formatters';
import { IAuditedDataType } from './model/interfaces/audited-data-type';
import {DataPopupMenuAction} from "./model/enums/data-popup-menu-action";

@Component({
  template: ''
})
export abstract class AuditedEntityGridComponent<T extends IAuditedDataType> implements OnInit {

  @ViewChild(PopupMenuComponent) menu: PopupMenuComponent | undefined;

  @ViewChild('nameCell') nameCell: TemplateRef<any> | undefined;

  protected columnDefs: ColDef[] | undefined;
  protected gridApi: GridApi | undefined;
  protected gridOptions: GridOptions | undefined;
  protected haveEmptyRow: boolean = false;
  protected rowData: T[] = [];
  protected rowSelection: T | undefined;
  protected selectedRow: T | undefined;

  protected httpError: HttpErrorResponse | undefined;
  protected operationMessage: string = '';

  protected liveStatuses: Array<DataStatus> = [];

  protected constructor() { }

  ngOnInit() {
    this.initRowData();
    this.haveEmptyRow = false;
    console.log('AuditedNamedEntityGridComponent: user language=' + navigator.language);
    this.liveStatuses.push(DataStatus.New);
    this.liveStatuses.push(DataStatus.Amend);
  }

  onGridReady(params: { api: GridApi<any> | undefined; }) {
    this.gridApi = params.api;
  }

  protected abstract createNewEntity(): T

  protected abstract initRowData(): T[];

  protected createColumnDefs(): any[] {
    return [
      { headerName: '', field: 'selected', width: 30, headerCheckboxSelection: true, checkboxSelection: true, editable: true },
      { headerName: 'ID', field: 'id', width: 60, editable: false, filter: true },
      { headerName: 'Status', field: 'status', width: 100, editable: false, filter: true },
      { headerName: 'Created by', field: 'createdBy', width: 110, editable: false, filter: true },
      { headerName: 'Last updated by', field: 'updatedBy', width: 150, editable: false, filter: true },
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

  protected createGridOptions(cellValueChanged: any): GridOptions {
    return <GridOptions> {
      animateRows: true,
      enableCellChangeFlash: true,
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
      onCellValueChanged: cellValueChanged,
      rowDeselection: false,
      rowSelection: 'single',
      statusBar: {
        statusPanels: [
          { statusPanel: 'agTotalRowCountComponent', align: 'left' },
          { statusPanel: 'agSelectedRowCountComponent' }
        ]
      },
      unSortIcon: true
    };
  }

  protected enrichAuditData(auditData: T) {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser != null) {
      if (!auditData.createdBy) {
        auditData.createdBy = currentUser;
      }
      if (!auditData.updatedBy) {
        auditData.updatedBy = currentUser;
      }
    }
    if (!auditData.lastUpdated) {
      auditData.lastUpdated = new Date();
    }
  }

  protected createNewRowDatum(): any {
    const datum = this.createNewEntity();
    datum.status = DataStatus.New;
    datum.action = DataAction.Add;
    return datum;
  }

  addEmptyRow() {
    if (this.haveEmptyRow) {
      console.log('addEmptyRow: haveEmptyRow is true so return without adding another');
      return;
    }

    this.rowData.push(this.createNewRowDatum());
    this.gridApi!.setRowData(this.rowData);

    //
    // set focus to Name column on new row; should be in edit mode and in that Name cell
    //
    const rowIndex = this.rowData.length  - 1;
    this.haveEmptyRow = true;
    this.gridApi!.setFocusedCell(rowIndex, 'name');
  }

  protected  markRowForDeletion() {
    console.log('AuditedNamedEntityGridComponent.markRowForDeletion');
    let nameOfAction;
    this.rowData.filter(this.isSelected).forEach(function (value) {
      value.action = DataAction.Delete;
      nameOfAction = DataAction[value.action];
      console.log('AuditedNamedEntityGridComponent.delete: mark for deletion - ' + value + '     name of action=' + nameOfAction);
    } );
    this.gridApi!.setRowData(this.rowData);
    this.gridApi!.refreshCells();
  }

  protected removeEmptyRow() {
    //
    // TODO need to check that this removes the row from the grid AND from this.rowData; LOOKED LIKE ROW ADDED TWICE...
    //
    console.log('removeEmptyRow: Removing empty row');
    if (this.selectedRow && this.isUnsavedRow(this.selectedRow)) {
      const otherRows: IAuditedDataType[] = [];
      this.rowData.filter(entry => !entry.selected).forEach(entry => otherRows.push(entry));
      console.log('removeEmptyRow: otherRows size = ' + otherRows.length);
      this.gridApi!.setRowData(otherRows);
      this.gridApi!.refreshCells();
    }
  }

  protected isSelected(element: { selected: any; }, index: any, array: any) {
    return element.selected;
  }

  protected getColumnDefs() {
    return this.columnDefs;
  }

  protected getRowData(): any[] {
    return this.rowData;
  }

  isUnsavedRow(row: IAuditedDataType) {
    return row && row.id === 0;
  }

  protected actionSelected(popupMenuAction: any) {
    console.log('AuditedEntityGridComponent.actionSelected: popupMenuAction=' + popupMenuAction);
    switch (popupMenuAction) {
      case DataPopupMenuAction.AddEmptyRow:
        this.addEmptyRow();
        break;
      case DataPopupMenuAction.MarkForDeletion:
        this.markRowForDeletion();
        break;
      case DataPopupMenuAction.RemoveRow:
        this.removeEmptyRow();
        break;
      case DataPopupMenuAction.UnmarkForDeletion:
        this.unmarkForDeletion();
        break;
      default:
        console.error('AuditedEntityGridComponent.actionSelected: popup menu action not recognized');
    }
  }

  protected  unmarkForDeletion() {
    console.log('TODO: AuditedEntityGridComponent. Unmarking row for deletion');
  }

  protected   updateGrid(saved: T) {
    if (saved) {
      const newRowData: T[] = [];
      this.rowData.forEach( (entry) => {
        if (saved.isDataChanged) {
          newRowData.push(saved);
        } else {
          newRowData.push(entry);
        }
      });
      this.gridApi!.setRowData(newRowData);
      // this.gridApi!.refreshView();  // refreshView no longer exists
    }

    console.log('AuditedEntityGridComponent.updateGrid: Data updated');
  }

  protected onCellValueChanged(event: any) {
    // handle updated 'name' value
    console.log('AuditedEntityGridComponent.onCellValueChanged - entry: event=' + event + ' haveEmptyRow=' + this.haveEmptyRow);
    if (event.data && event.data.id && event.data.id > 0) {
      event.data.action = DataAction.Update;
      this.gridApi!.refreshCells();
    }

    const nameColDef = this.gridApi!.getColumnDef('name');
    if (nameColDef === event.colDef) {
      console.log('AuditedEntityGridComponent.onCellValueChanged: event.colDef == name column - set haveEmptyRow to false');
      this.haveEmptyRow = false;
    }

    console.log('AuditedEntityGridComponent.onCellValueChanged - exit: haveEmptyRow=' + this.haveEmptyRow);
  }

  protected onRowSelected(event: any) {
    //
    // need to de-select all rows first then select the newly selected one.
    // this is to ensure we don't leave the previously selected row marked as still selected.
    //
    this.deselectAllRows();
    event.data.selected = event.node.selected;
    this.selectedRow = event.node.data;
    this.menu!.open(event);
  }

  protected onSelectionChanged(event: any) {
    const rowCount = event.api.getSelectedNodes().length;
    console.log('AuditedEntityGridComponent.onSelectionChanged: ' + rowCount + ' rows selected');
  }

  protected deselectAllRows() {
    this.rowData.forEach(entry => entry.selected = false);
  }

  onContextPopupMenu(event: any) {
    event.preventDefault(); // Suppress the browser's context menu
    console.log('AuditedEntityGridComponent: onContextPopupMenu - event=' + event);
    this.menu!.open(event);
  }

}
