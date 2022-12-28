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
  versionStatus: DataStatus;
  versionCreatedBy: string;
  versionNumber?: number;
  versionUpdatedBy?: string;
  versionLastUpdated?: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  constructor() {
    this.title = '';
    this.description = '';
    this.versionStatus = DataStatus.New;
    this.versionCreatedBy = '';
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
      title.versionStatus = personTitle!.title!.versionStatus;
      title.versionCreatedBy = personTitle!.title!.versionCreatedBy;
      title.versionUpdatedBy = personTitle!.title!.versionUpdatedBy;
      title.versionLastUpdated = personTitle!.title!.versionLastUpdated;
      title.selected = personTitle!.title!.selected;
      title.action = personTitle!.title!.action;
      title.isDataChanged = personTitle!.title!.isDataChanged;
      return title;
  }

  public toString(): string {
    return 'Title: id=' + this.id + ' title=' + this.title + ' description=' + this.description + ' titleType=' + this.titleType +
      ' appliesTo=' + this.appliesTo +
      ' versionStatus=' + this.versionStatus + ' versionCreatedBy=' + this.versionCreatedBy +
      ' versionUpdatedBy=' + this.versionUpdatedBy + ' versionLastUpdated=' + this.versionLastUpdated + ' selected=' + this.selected + ' action=' + this.action +
      ' isDataChanged=' + this.isDataChanged;
  }
}
