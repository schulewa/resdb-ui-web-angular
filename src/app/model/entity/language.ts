import { LanguageGroup } from './language-group';
import { IAuditedNameDataType } from "../interfaces/audited-name-data-type";
import { DataStatus } from "../enums/data-status";
import { YesNo } from "../enums/yes-no";
import { DataAction } from "../enums/data-action";

export class Language implements IAuditedNameDataType {

  id?: number;
  name: string;
  nativeName: string;
  iso6391Code1: string;
  iso6392CodeAlpha2t: string;
  iso6392CodeAlpha2b: string;
  iso6392CodeAlpha3: string;
  deciphered: YesNo | undefined;
  living: YesNo | undefined;
  constructed: YesNo | undefined;
  macroLanguage: YesNo | undefined;
  languageGroup: LanguageGroup| undefined;
  notes: string;
  status: DataStatus;
  createdBy: string;
  updatedBy?: string;
  lastUpdated?: Date;
  selected: boolean;
  action: DataAction;
  isDataChanged: boolean;

  constructor() {
    this.isDataChanged = false;
    this.selected = false;
    this.name = '';
    this.nativeName = '';
    this.iso6391Code1 = '';
    this.iso6392CodeAlpha2t = '';
    this.iso6392CodeAlpha2b = '';
    this.iso6392CodeAlpha3 = '';
    this.notes = '';
    this.createdBy = '';
    this.action = DataAction.Add;
    this.status = DataStatus.New;
  }

  public toString(): string {
    return 'Language: id=' + this.id + ' name=' + this.name + ' nativeName=' + this.nativeName +
      ' iso6391Code1=' + this.iso6391Code1 + ' iso6392CodeAlpha2t=' + this.iso6392CodeAlpha2t +
      ' iso6392CodeAlpha2b=' + this.iso6392CodeAlpha2b + ' iso6392CodeAlpha3=' + this.iso6392CodeAlpha3 +
      ' deciphered=' + this.deciphered + ' living=' + this.living +
      ' constructed=' + this.constructed + 'macroLanguage=' + this.macroLanguage +
      ' status=' + this.status + ' createdBy=' + this.createdBy +
      ' updatedBy=' + this.updatedBy + ' lastUpdated=' + this.lastUpdated + ' selected=' + this.selected + ' action=' + this.action +
      ' isDataChanged=' + this.isDataChanged;
  }
}
