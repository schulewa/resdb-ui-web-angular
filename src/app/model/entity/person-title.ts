import {Person} from './person';
import {Title} from './title';
import {DataStatus} from "../enums/data-status";
import {Constants} from "../constants";
import {DataAction} from "../enums/data-action";

export class PersonTitle {

  person: Person | undefined;
  title: Title | undefined;

  status: DataStatus;
  createdBy: string;
  updatedBy: string;
  lastUpdated: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  constructor() {
    this.status = DataStatus.New;
    this.createdBy = '';
    this.updatedBy = '';
    this.lastUpdated = Constants.UNSET_DATE_VALUE;
    this.selected = false;
    this.action = DataAction.Add;
    this.isDataChanged = false;
  }
}
