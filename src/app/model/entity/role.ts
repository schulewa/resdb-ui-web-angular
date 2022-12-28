import {DataStatus} from "../enums/data-status";
import {IAuditedNameDataType} from "../interfaces/audited-name-data-type";
import {DataAction} from "../enums/data-action";

export class Role implements IAuditedNameDataType {
  id?: number;
  name: string;
  versionStatus?: DataStatus;
  versionCreatedBy?: string;
  versionNumber?: number;
  versionUpdatedBy?: string;
  versionLastUpdated?: Date;
  selected: boolean;
  action: DataAction;

  isDataChanged: boolean;

  constructor() {
    this.name = '';
    this.versionStatus = DataStatus.New;
    this.versionCreatedBy = '';
    this.selected = false;
    this.action = DataAction.Add;
    this.isDataChanged = false;
  }

}
