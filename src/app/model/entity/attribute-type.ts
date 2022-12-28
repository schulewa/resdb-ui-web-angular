import {IAuditedNameDataType} from "../interfaces/audited-name-data-type";
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";
import {DataType} from "../enums/data-type";

export class AttributeType implements IAuditedNameDataType {

  id?: number;
  name: string;
  dataType: DataType;
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
    this.dataType = DataType.Unknown;
    this.versionStatus = DataStatus.New;
    this.versionCreatedBy = '';
    this.selected = false;
    this.action = DataAction.Add;
    this.isDataChanged = false;
  }

  public toString(): string {
    return 'AttributeType: id=' + this.id + ' name=' + this.name + ' dataType=' + this.dataType +
            ' versionStatus=' + this.versionStatus + ' versionCreatedBy=' + this.versionCreatedBy +
            ' versionUpdatedBy=' + this.versionUpdatedBy + ' versionLastUpdated=' + this.versionLastUpdated +
            ' selected=' + this.selected + ' action=' + this.action +
            ' isDataChanged=' + this.isDataChanged;
  }
}
