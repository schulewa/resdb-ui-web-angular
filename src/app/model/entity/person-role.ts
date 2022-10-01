import {Person} from './person';
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";
import {Role} from "./role";
import {HistoricalDate} from "./historical-date";

export class PersonRole {

  id?: number | undefined;

  person: Person | undefined;
  role: Role | undefined;

  userModifiable: boolean | undefined;

  roleStarted: HistoricalDate | undefined;
  roleEnded: HistoricalDate | undefined;

  status: DataStatus;
  createdBy: string;
  updatedBy?: string;
  lastUpdated?: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  constructor() {
    this.status = DataStatus.New;
    this.createdBy = '';
    this.selected = false;
    this.action = DataAction.Add;
    this.isDataChanged = false;
  }

  public toString(): string {
    let personAsString = 'Person []';
    if (this.person) {
      console.log('PersonTitle.person: ' + this.person.toString());
      personAsString = 'Person [' +
        'firstName=' + this.person.firstName + ' ' +
        'middleName=' + this.person.middleName + ' ' +
        'familyName=' + this.person.familyName
      + ']';
    }

    let roleAsString = 'Role []';
    if (this.role) {
      console.log('PersonRole.role: ' + this.role.toString());
      roleAsString = 'Role [' +
        'name=' + this.role.name + ' ' +
      + ']';
    }
    return personAsString + "\n" + roleAsString;
  }
}
