import {DataStatus} from "../enums/data-status";
import {IAuditedNameDataType} from "../interfaces/audited-name-data-type";
import {DataAction} from "../enums/data-action";

export class Role implements IAuditedNameDataType {
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

}
