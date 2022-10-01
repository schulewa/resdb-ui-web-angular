import { TitleType } from '../enums/title-type';
import {Gender} from './gender';
import {PersonTitle} from './person-title';
import {IAuditedDataType} from "../interfaces/audited-data-type";
import {DataStatus} from "../enums/data-status";
import {DataAction} from "../enums/data-action";

export class Title implements IAuditedDataType {

  id?: number;
  title: string;
  description: string;
  titleType: TitleType | undefined;
  appliesTo: Gender | undefined; // CodeLabel;
  status: DataStatus;
  createdBy: string;
  updatedBy?: string;
  lastUpdated?: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  constructor() {
    this.title = '';
    this.description = '';
    this.status = DataStatus.New;
    this.createdBy = '';
    this.selected = false;
    this.action = DataAction.Add;
    this.isDataChanged = false;
  }

  public static from(personTitle: PersonTitle) {
      const title = new Title();
      title.id = personTitle!.title!.id;
      title.title = personTitle!.title!.title;
      title.description = personTitle!.title!.description;
      title.titleType = personTitle!.title!.titleType;
      title.appliesTo = personTitle!.title!.appliesTo;
      title.status = personTitle!.title!.status;
      title.createdBy = personTitle!.title!.createdBy;
      title.updatedBy = personTitle!.title!.updatedBy;
      title.lastUpdated = personTitle!.title!.lastUpdated;
      title.selected = personTitle!.title!.selected;
      title.action = personTitle!.title!.action;
      title.isDataChanged = personTitle!.title!.isDataChanged;
      return title;
  }

  public toString(): string {
    return 'Title: id=' + this.id + ' title=' + this.title + ' description=' + this.description + ' titleType=' + this.titleType +
      ' appliesTo=' + this.appliesTo +
      ' status=' + this.status + ' createdBy=' + this.createdBy +
      ' updatedBy=' + this.updatedBy + ' lastUpdated=' + this.lastUpdated + ' selected=' + this.selected + ' action=' + this.action +
      ' isDataChanged=' + this.isDataChanged;
  }
}
