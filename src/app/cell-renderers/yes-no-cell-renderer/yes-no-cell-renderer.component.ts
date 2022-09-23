import {Component, OnDestroy, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import {YesNo} from "../../model/enums/yes-no";
import {ICellRendererParams} from "ag-grid-community";

@Component({
  selector: 'app-yes-no-cell-renderer',
  templateUrl: './yes-no-cell-renderer.component.html',
  styleUrls: ['./yes-no-cell-renderer.component.scss']
})
export class YesNoCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {

  protected cellValue: any;

  constructor() {}

  ngOnInit(): void {
  }

  yesNoClickHandler(event: any) {
    let checked = event.target.checked;
    let colId = this.cellValue.column.colId;
    this.cellValue.node.setDataValue(colId, checked);
  }

  agInit(params: ICellRendererParams): void {
    this.cellValue = params;
  }

  ngOnDestroy(): void {
  }

  refresh(params: ICellRendererParams<any>): boolean {
    this.cellValue = this.getValueToDisplay(params);
    return true;
  }

  getValueToDisplay(params: ICellRendererParams) {
    return params.valueFormatted ? params.valueFormatted : params.value;
  }

}
