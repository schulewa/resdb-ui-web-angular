import {HistoricalDate} from "./entity/historical-date";

export class Constants {

  public static get UNSET_DATE_VALUE(): Date { return new Date(9999, 12, 31, 23, 59, 59, 0); }

  public static get UNSET_HISTORICAL_DATE_VALUE(): HistoricalDate {
    const hd = new HistoricalDate()
    hd.day = 0;
    hd.month = 0;
    hd.year = 0;
    return hd;
  }

}
