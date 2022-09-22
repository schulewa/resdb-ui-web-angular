import {formatDate} from '@angular/common';
import {HistoricalDate} from "../model/entity/historical-date";

export class DateFormatters {

  public static dateWithTimeAsString(params: any): string {
    if (params && params.value ) {
      return formatDate(params.value, 'dd MMM yyyy HH:MM', navigator.language);
    } else {
      return '';
    }
  }
}


export function historicalDateFormatterYYYYMMDD(params: any): string {
  var historicalDate: HistoricalDate = params.value;
  if (historicalDate) {
    var formattedDate = '';
    if (historicalDate.year) {
      formattedDate = historicalDate.year.toString()
    }
    if (historicalDate.month) {
      if (formattedDate != '') {
        formattedDate = formattedDate.concat('-')
      }
      formattedDate + historicalDate.month;
    }
    if (historicalDate.day) {
      if (formattedDate != '') {
        formattedDate = formattedDate.concat('-')
      }
      formattedDate = formattedDate + historicalDate.day;
    }
    return formattedDate;
  } else {
    return '';
  }
}
