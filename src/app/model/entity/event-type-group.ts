import {IAuditedNameDataType} from "../interfaces/audited-name-data-type";
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";

export class EventTypeGroup implements IAuditedNameDataType {

  id?: number;
  name: string;
  status: DataStatus;
  createdBy: string;
  updatedBy?: string;
  lastUpdated?: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  constructor() {
    this.name = '';
    this.status = DataStatus.New;
    this.createdBy = '';
    this.selected = false;
    this.action = DataAction.Add;
    this.isDataChanged = false;
  }

  public toString(): string {
    return 'EventTypeGroup: id=' + this.id + ' name=' + this.name + ' status=' + this.status + ' createdBy=' + this.createdBy +
      ' updatedBy=' + this.updatedBy + ' lastUpdated=' + this.lastUpdated + ' selected=' + this.selected + ' action=' + this.action +
      ' isDataChanged=' + this.isDataChanged;
  }

}
