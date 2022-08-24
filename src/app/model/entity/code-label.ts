export class CodeLabel {

  code: string;
  label: string;
  selected: boolean;

  constructor(code: string, label: string) {
    this.code = code;
    this.label = label;
    this.selected = false;
  }

  getCode(): string {
    return this.code;
  }

  getLabel() {
    return this.label;
  }

  isSelected(): boolean {
    return this.selected;
  }

  public equals(other: CodeLabel) {
    console.log('CodeLabel.equals: other=', other);
    if (other) {
      return this.code === other.code;
    }
    return false;
  }

  public toString(): string {
    return 'CodeLabel: code=' + this.code + ' label=' + this.label;
  }

}
