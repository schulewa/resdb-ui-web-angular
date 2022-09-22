import {IDataChanged} from "../interfaces/data-changed";
import {DataStatus} from "../enums/data-status";
import {Constants} from "../constants";

export class River implements IDataChanged {
  id: number;
  name: string;
  status: DataStatus;
  createdBy: string;
  updatedBy: string;
  lastUpdated: Date;
  versionNumber: number;

  isDataChanged: boolean;

  constructor() {
    this.id = 0;
    this.name = '';
    this.status = DataStatus.New;
    this.createdBy = '';
    this.updatedBy = '';
    this.lastUpdated = Constants.UNSET_DATE_VALUE;
    this.versionNumber = 0;
    this.isDataChanged = false;
  }

  isSaveButtonEnabled(): boolean {
    return this.isDataChanged;
  }

}
