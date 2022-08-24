import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Person} from "../model/entity/person";
import {HttpErrorResponse} from "@angular/common/http";
import {Gender} from "../model/entity/gender";
import {CodeLabel} from "../model/entity/code-label";
import {Title} from "../model/entity/title";
import {ColDef, GridApi, GridOptions} from "ag-grid-community";
import {DateLabelValue} from "../model/dto/DateLabelValue";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TitlesService} from "../titles/titles.service";
import {Constants} from "../model/constants";
import {TitleType} from "../model/enums/title-type";
import {DataStatus} from "../model/enums/data-status";
import {DataAction} from "../model/enums/data-action";
import {hasFormFieldChanged} from "../utils/form-utils";

@Component({
  selector: 'app-person-details',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {

  @Input() person: Person | undefined;

  @Output() personChange = new EventEmitter();

  httpError: HttpErrorResponse | undefined;
  operationMessage: string = '';

  isExistingPerson: boolean = false;

  private gender: Gender | undefined;
  // private gender: CodeLabel;
  private allGenders: CodeLabel[] = [];
  private filteredGenders: CodeLabel[] = [];
  private selectedGenderCodeLabel: CodeLabel | undefined;

  private allTitlesCodeLabels: CodeLabel[] = [];
  private filteredTitles: Title[] = [];
  allTitles: Title[] = [];

  private allTitleTypes: CodeLabel[] = [];
  private selectedTitleTypeLabel: CodeLabel | undefined;

  public rowSelectionMode = 'single';
  private selectedTitle: Title | undefined;
  private selectedTitles: Title[] = [];

  private datesGridApi: GridApi | undefined;
  private datesColumnDefs: ColDef[] = [];
  private datesGridOptions: GridOptions;
  private allDatesLabelValues: DateLabelValue[] = [];

  private titlesGridApi: GridApi | undefined;
  private titlesColumnDefs: ColDef[];
  private titlesGridOptions: GridOptions;

  personDetailForm: FormGroup = this.createPersonDetailForm();

  // datePickerOptions: INgxMyDpOptions = {
  //     // other options...
  //     dateFormat: 'dd.mm.yyyy',
  // };

  constructor(private router: Router, private fb: FormBuilder, private titlesService: TitlesService) {
    this.titlesColumnDefs = this.createTitlesColumnDefs();
    this.titlesGridOptions = this.createTitlesGridOptions();
    //
    this.datesColumnDefs = this.createDatesColumnDefs();
    this.datesGridOptions = this.createDatesGridOptions();
    //
    this.initGenders();
    this.initTitles();
    this.initTitleTypes();

    this.initAllDatesCodeLabels();

    // set default values for dropdowns on form
    // this.personDetailForm.controls['gender'].setValue(this.allGenders[0], {onlySelf: true});

  }

  onGridReady(params: any) {
    this.titlesGridApi = params.api;
    this.datesGridApi = params.api; // TODO do we need separate api's ?
  }

  ngOnInit() {
    this.createPersonDetailForm();

    if (this.person) {
      this.initForUpdate();
    } else {
      this.initForAdd();
    }

  }

  initForAdd() {
    console.log('person-detail.initForAdd: start');
    this.person = new Person();
    this.isExistingPerson = false;

    this.personDetailForm.controls['gender'].setValue(this.allGenders[0], {onlySelf: true});
    this.personDetailForm.controls['titleType'].setValue(this.allTitleTypes[0], {onlySelf: true});
    // this.personDetailForm.controls['title'].setValue(this.filteredTitlesLabels[0], {onlySelf: true}); // TODO

    console.log('person-detail.initForAdd: end');
  }

  initForUpdate() {
    console.log('person-detail.initForUpdate: start');
    this.isExistingPerson = true;
    const genders = new Gender();
    // this.gender = genders.genderAsCodeLabel(this.person.gender.label);
    this.gender = genders;
    console.log('person-detail.initForUpdate: end');
  }

  createPersonDetailForm(): FormGroup {
    return this.personDetailForm = this.fb.group({
      firstName: [null, [Validators.max(30), Validators.required]],
      middleName: [null, Validators.max(30)],
      familyName: [null, [Validators.max(50), Validators.required]],
      gender: [null, [Validators.required]],
      title: ['Please select'],
      titleType: null,
      dateOfBirthYear: [null],
      dateOfBirthMonth: [null, Validators.min(0)],
      dateOfBirthDayOfMonth: [null],
      dateOfDeathYear: [null],
      dateOfDeathMonth: [null],
      dateOfDeathDayOfMonth: [null],
      birthPlaceName: [null],
      birthPlaceAltitude: [null],
      birthPlaceLatitude: [null],
      birthPlaceLongitude: [null],
      deathPlaceName: [null],
      deathPlaceAltitude: [null],
      deathPlaceLatitude: [null],
      deathPlaceLongitude: [null]
    });
  }

  createTitlesColumnDefs(): any[] {
    return [
      {headerName: 'Selected', field: 'selected', width: 100, checkboxSelection: true, editable: true},
      {headerName: 'ID', field: 'id', width: 60, editable: false, filter: true},
      {headerName: 'Title', field: 'title', width: 100, editable: false, filter: true},
      {headerName: 'Description', field: 'description', width: 200, editable: false, filter: true},
      {headerName: 'Type', field: 'titleType', width: 200, editable: false, filter: true},
      {headerName: 'M/F', field: 'appliesTo', width: 80, editable: false, filter: true}
    ];
  }

  protected createTitlesGridOptions(): GridOptions {
    return <GridOptions>{
      animateRows: true,
      enableCellChangeFlash: true,
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
      onCellValueChanged: this.onChangeTitle, // TODO should this be commented out ?
      rowDeselection: false,
      rowSelection: 'multiple',
      statusBar: {
        statusPanels: [
          {statusPanel: 'agTotalRowCountComponent', align: 'left'},
          {statusPanel: 'agSelectedRowCountComponent'}
        ]
      },
      unSortIcon: true
    };
  }

  createDatesColumnDefs(): any[] {
    return [
      {
        headerName: 'Code',
        field: 'codeLabel.code',
        width: 80,
        editable: false,
        filter: true
      },
      {
        headerName: 'Description',
        field: 'codeLabel.label',
        width: 200,
        editable: false,
        filter: true
      },
      {
        headerName: 'Date',
        field: 'dateValue',
        width: 200,
        editable: true,
        // cellEditor: HistoricalDateCellEditor,
        filter: true
      }
    ];
  }

  createDatesGridOptions(): GridOptions {
    return <GridOptions>{
      animateRows: true,
      enableCellChangeFlash: true,
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
      // onCellValueChanged: this.onChangeTitle, // TODO should this be commented out ?
      rowDeselection: false,
      rowSelection: 'single',
      statusBar: {
        statusPanels: [
          {statusPanel: 'agTotalRowCountComponent', align: 'left'},
          {statusPanel: 'agSelectedRowCountComponent'}
        ]
      },
      unSortIcon: true
    };
  }

  initAllDatesCodeLabels() {
    this.allDatesLabelValues = [];

    const dobLabel = new CodeLabel('DOB', 'Date of birth');
    const dob = new DateLabelValue(dobLabel, Constants.UNSET_DATE_VALUE);

    const dodLabel = new CodeLabel('DOD', 'Date of death');
    const dod = new DateLabelValue(dodLabel, Constants.UNSET_DATE_VALUE);

    this.allDatesLabelValues.push(dob);
    this.allDatesLabelValues.push(dod);

    console.log('initAllDatesCodeLabels: allDatesLabelValues=' + this.allDatesLabelValues);
  }

  initGenders() {
    const thisRef = this;
    this.gender = new Gender();
    this.allGenders = [];
    const pleaseSelect = new CodeLabel('', 'Please select');
    this.allGenders.push(pleaseSelect);
    this.gender.getGenders().forEach(function (codeLabel) {
      thisRef.allGenders.push(codeLabel);
    });
    this.selectedGenderCodeLabel = pleaseSelect;
    this.gender = Gender.fromCodeLabel(this.gender.UNKNOWN);
  }

  getGenders(): CodeLabel[] {
    return this.allGenders;
  }

  onChangeGender() {
    console.log('onChangeGender: form control gender=' + this.personDetailForm.controls['gender'].value);
    const selected: CodeLabel = this.personDetailForm.controls['gender'].value; // results in 'selected' of string NOT CodeLabel
    const thisRef = this;
    this.gender!.current = selected;

    if (selected && this.gender != null) {
      if (this.gender.isMale(selected) || this.gender.isFemale(selected)) {
        this.filteredGenders = this.allGenders.filter(gender => gender === selected);
        // this.filteredTitles = this.allTitles.filter(title => title.appliesTo === this.gender);
        this.filteredTitles = this.filterTitles();
        console.log('onChangeGender: filteredGenders size = ', this.filteredGenders.length);
      }
      console.log('onChangeGender 1: TRUE selected=', selected, ' selected=', selected);
    }
  }

  initTitleTypes() {
    const titleTypes = [];
    titleTypes.push(TitleType.Prefix, TitleType.Suffix);
    const keys = Object.keys(TitleType); // Prefix, Suffix

    this.allTitleTypes = [];
    const pleaseSelect = new CodeLabel('', 'Please select');
    this.allTitleTypes.push(pleaseSelect);
    for (const tt in keys) {
      if (keys.hasOwnProperty(tt)) {
        const value = keys[tt];
        // @ts-ignore
        const codeLabel = new CodeLabel(TitleType[value], value);
        this.allTitleTypes.push(codeLabel);
      }
    }
    this.selectedTitleTypeLabel = pleaseSelect;
  }

  getTitleTypes(): CodeLabel[] {
    return this.allTitleTypes;
  }

  onChangeTitleType() {
    this.selectedTitleTypeLabel = this.personDetailForm.controls['titleType'].value;
  }

  initTitles() {
    this.titlesService.findAll().subscribe(
      data => {
        this.allTitles = data;
        this.httpError = undefined;
      },
      err => {
        console.error('PersonDetailComponent.findAll: err=', err);
        this.httpError = err;
      }
    );
  }

  // clearDate(): void {
  //   // Clear the date using the patchValue function
  //   this.personDetailForm.patchValue({dateOfBirth: null});
  // }

  onRowSelectedDateLabelValue(event: any) {
    const dateLabelValue: DateLabelValue = event.node.selected;
    event.data.selected = event.node.selected;
    console.log('onRowSelectedDate: dateLabelValue=' + dateLabelValue);
    this.selectedTitles = this.titlesGridApi!.getSelectedRows();
  }

  onRowSelectedDateLabelValueChanged(event: any) {
    const dateLabelValue: DateLabelValue = event.node.selected;
    console.log('onRowSelectedDateChanged: dateLabelValue=' + dateLabelValue);
    // this.selectedTitles = this.titlesGridApi.getSelectedRows();
  }

  //

  getPleaseSelectTitle(): Title {
    const pleaseSelect = new Title();
    pleaseSelect.id = 0;
    pleaseSelect.description = 'Please select';
    return pleaseSelect;
  }

  onChangeTitle() {
    const selected: Title = this.personDetailForm.controls['title'].value;
    console.log('onChangeTitle: new title=' + selected);
    this.selectedTitle = selected;
  }

  onRowSelectedTitle(event: any) {
    const title: Title = event.node.selected;
    event.data.selected = event.node.selected;
    console.log('onRowSelectedTitle: title=' + title);
    this.selectedTitles = this.titlesGridApi!.getSelectedRows();
  }

  onRowSelectedTitleChanged(event: any) {
    const title: Title = event.node.selected;
    console.log('onRowSelectedTitleChanged: title=' + title);
    this.selectedTitles = this.titlesGridApi!.getSelectedRows();
  }

  addTitle() {
    console.log('addTitle: selectedTitle=' + this.selectedTitle);
    // this.allTitles.push(this.selectedTitle);
    this.selectedTitle = this.getPleaseSelectTitle();
    this.titlesGridApi!.setRowData(this.allTitles);
  }

  disableAddTitleButton(): boolean {
    return this.personDetailForm?.get('title')?.value === 'Please select';
  }

  filterTitles(): Title[] {
    return this.allTitles.filter(title =>
      // this.gender.current !== this.gender.UNKNOWN && title.appliesTo === this.gender
      this.gender !== undefined && title.appliesTo === this.gender &&
      this.selectedTitleTypeLabel !== undefined && title.titleType === this.selectedTitleTypeLabel.getLabel()
    );
  }

  protected actionValueGetter(params: any) {
    // @ts-ignore
    console.log('actionValueGetter: params.data.action=' + params.data.action + ' DataAction[params.data.action]=' + DataAction[params.data.action]);
    // @ts-ignore
    return params.data.action ? DataAction[params.data.action] : '';
  }

  protected statusValueGetter(params: any) {
    // @ts-ignore
    return params.data.status ? DataStatus[params.data.status] : DataStatus.New;
  }

  getPleaseSelectCodeLabel(): CodeLabel {
    return new CodeLabel('', 'Please select');
  }

  closeForm() {
    this.router.navigate(['persons']);
  }

  saveChanges() {
    console.log('PersonDetailComponent.saveChanges() - TODO');
  }

  hasFirstNameFieldChanged() {
    return hasFormFieldChanged(this.personDetailForm, 'firstName');
  }
}

