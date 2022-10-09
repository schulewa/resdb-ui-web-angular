import {Person} from './person';
import {Title} from './title';
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";

export class PersonTitle {

  id?: number | undefined;

  person: Person | undefined;
  title: Title | undefined;
  position: number | undefined;

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

    let titleAsString = 'Title []';
    if (this.title) {
      console.log('PersonTitle.title: ' + this.title.toString());
      titleAsString = 'Title [' +
        'title=' + this.title.title + ' ' +
        'titleType=' + this.title.titleType
      + ']';
    }
    return personAsString + "\n" + titleAsString;
  }
}
