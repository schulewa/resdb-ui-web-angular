import {IAuditedNameDataType} from "../interfaces/audited-name-data-type";
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";

export class MeasureType implements IAuditedNameDataType {

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
    this.selected = false;
    this.name = '';
    this.versionStatus = DataStatus.New;
    this.versionCreatedBy = '';
    this.action = DataAction.Add;
    this.isDataChanged = false;
  }

  public toString(): string {
    return 'MeasureType: id=' + this.id + ' name=' + this.name + ' versionStatus=' + this.versionStatus + ' versionCreatedBy=' + this.versionCreatedBy +
            ' versionUpdatedBy=' + this.versionUpdatedBy + ' versionLastUpdated=' + this.versionLastUpdated + ' selected=' + this.selected + ' action=' + this.action +
            ' isDataChanged=' + this.isDataChanged;
  }
}
