import {HistoricalDate} from './historical-date';
import {Title} from './title';
import {Place} from './place';
import {PersonTitle} from './person-title';
import {IAuditedDataType} from "../interfaces/audited-data-type";
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";
import {Constants} from "../constants";

export class Person implements IAuditedDataType {

  id: number;
  firstName: string;
  middleName: string;
  familyName: string;
  // gender: CodeLabel;
  gender: string;
  dateOfBirth: HistoricalDate;
  dateOfDeath: HistoricalDate;
  prefixTitle: Title | undefined;
  suffixTitle: Title | undefined;
  birthPlace: Place | undefined;
  deathPlace: Place | undefined;

  status: DataStatus;
  createdBy: string;
  updatedBy: string;
  lastUpdated: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  titles: PersonTitle[];

  constructor() {
    this.id = 0;
    this.firstName = '';
    this.middleName = '';
    this.familyName = '';
    this.gender = '';
    this.dateOfBirth = Constants.UNSET_HISTORICAL_DATE_VALUE;
    this.dateOfDeath = Constants.UNSET_HISTORICAL_DATE_VALUE;
    this.status = DataStatus.New;
    this.createdBy = '';
    this.updatedBy = '';
    this.lastUpdated = Constants.UNSET_DATE_VALUE;
    this.selected = false;
    this.action = DataAction.Add;
    this.isDataChanged = false;
    this.titles = [];
  }

  static toString(person: any): string {
    let str = '';
    // if (person.hasOwnProperty('id')) {
    //     str = str + 'id=' + person.id;
    // }
    str = this.appendVaue(str, person, 'id');
    str = ' ' + this.appendVaue(str, person, 'firstName') + ', ';
    str = ' ' + this.appendVaue(str, person, 'middleName') + ', ';
    str = ' ' + this.appendVaue(str, person, 'familyName') + ', ';
    str = ' ' + this.appendVaue(str, person, 'gender');

    str = ' ' + this.appendVaue(str, person, 'dateOfBirth');
    str = ' ' + this.appendVaue(str, person, 'dateOfDeath');
    str = ' ' + this.appendVaue(str, person, 'prefixTitle');
    str = ' ' + this.appendVaue(str, person, 'suffixTitle');
    str = ' ' + this.appendVaue(str, person, 'birthPlace');
    str = ' ' + this.appendVaue(str, person, 'deathPlace');

    return str;
  }

  static appendVaue(s: string, obj: any, key: string): string {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] instanceof HistoricalDate) {
        const hd = obj[key] as HistoricalDate;
        s = s + ' ' + key + '=' + hd.day + '/' + hd.month + '/' + hd.year;
      } else {
        s = s + ' ' + key + '=' + obj[key];
      }
    }
    return s;
  }

  public toString = (): string => {
    console.log('Person.toString called');
    return 'Person: ' +
      ' id=' + this.id +
      ' firstName=' + this.firstName +
      ' middleName=' + this.middleName +
      ' familyName=' + this.familyName +
      // ' gender=' + this.gender.label +
      ' gender=' + this.gender +
      ' dateOfBirth=' + this.dateOfBirth +
      ' dateOfDeath=' + this.dateOfDeath +
      ' prefixTitle=' + this.prefixTitle +
      ' suffixTitle=' + this.suffixTitle +
      ' birthPlace=' + this.birthPlace +
      ' deathPlace=' + this.deathPlace;
  }
}
