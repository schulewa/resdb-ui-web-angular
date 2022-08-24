import {CodeLabel} from './code-label';

export class Gender {

  readonly genders: CodeLabel[];
  readonly MALE: CodeLabel;
  readonly FEMALE: CodeLabel;
  readonly UNKNOWN: CodeLabel;

  current: CodeLabel;

  static fromCodeLabel(codeLabel: CodeLabel): Gender {
      const g = new Gender();
      g.current = g.genderAsCodeLabel(codeLabel.getLabel());
      return g;
  }

  constructor() {
    this.genders = [];
    this.MALE = new CodeLabel('M', 'Male');
    this.genders.push(this.MALE);
    this.FEMALE = new CodeLabel('F', 'Female');
    this.genders.push(this.FEMALE);
    this.UNKNOWN = new CodeLabel('UNKNOWN', 'Unknown');
    this.genders.push(this.UNKNOWN);
    this.current = this.UNKNOWN;
  }

  genderAsCodeLabel(label: string): CodeLabel {
      if (label) {
          if (this.MALE.label === label) {
              return this.MALE;
          } else if (this.FEMALE.label === label) {
              return this.FEMALE;
          }
      }
      return this.UNKNOWN;
  }

  getGenders(): CodeLabel[] {
    return this.genders;
  }

  isMale(gender: CodeLabel): boolean {
    if (gender !== undefined) {
      if (this.MALE.equals(gender)) {
        return true;
      }
    }
    return false;
  }

  isFemale(gender: CodeLabel): boolean {
    if (gender !== undefined) {
      if (this.FEMALE.equals(gender)) {
        return true;
      }
    }
    return false;
  }

  equals(other: Gender): boolean {
    if (this.current && other.current) {
      return this.current.equals(other.current);
    }
    return false;
  }

}
