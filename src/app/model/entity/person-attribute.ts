import {Person} from './person';
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";
import {AttributeType} from "./attribute-type";

export class PersonAttribute {

  id?: number | undefined;

  person: Person | undefined;
  attributeType: AttributeType | undefined;
  decimalValue: number | undefined;
  integerValue: number | undefined;
  stringValue: string | undefined;

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

    let attributeTypeAsString = 'Attribute []';
    if (this.attributeType) {
      console.log('PersonAttribute.attributeType: ' + this.attributeType.toString());
      attributeTypeAsString = 'AttributeType [' +
        'name=' + this.attributeType.name + ' ' +
        'dataType=' + this.attributeType.dataType
      + ']';
    }
    return personAsString + "\n" + attributeTypeAsString;
  }
}
