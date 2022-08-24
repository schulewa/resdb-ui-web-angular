import {Constants} from "../constants";

export class TitleDto {
  id: number = 0;
  title: string = '';
  description: string = '';
  titleType: string = '';
  appliesTo: string = '';
  status: string = '';
  createdBy: string = '';
  updatedBy: string = '';
  lastUpdated: Date = Constants.UNSET_DATE_VALUE;
  selected: boolean = false;
  action: string = '';
  isDataChanged: boolean = false;
}
