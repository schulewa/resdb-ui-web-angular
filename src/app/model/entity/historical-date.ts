export class HistoricalDate {
  day: number | undefined;
  month: number | undefined;
  year: number | undefined;

    public toString(): string {
        return 'HistoricalDate: ' +
            ' day=' + this.day + ' month=' + this.month + ' year=' + this.year;
    }
}
