import { CodeLabel } from '../entity/code-label';

export class DateLabelValue {

    codeLabel: CodeLabel;
    dateValue: Date;

    constructor(codeLabel: CodeLabel, dateValue: Date) {
        this.codeLabel = codeLabel;
        this.dateValue = dateValue;
    }

    getCodeLabel(): CodeLabel {
        return this.codeLabel;
    }

    getDateValue(): Date {
        return this.dateValue;
    }

    public equals(other: DateLabelValue) {
        console.log('DateLabelValue.equals: other=', other);
        if (other) {
            return this.codeLabel === other.codeLabel && this.dateValue === other.dateValue;
        }
        return false;
    }

    public toString(): string {
        return 'DateLabelValue: codeLabel=' + this.codeLabel.toString() + ' dateValue=' + this.dateValue;
    }
}
