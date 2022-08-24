import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TitlesService} from "../titles/titles.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Title} from "../model/entity/title";
import {PersonTitle} from "../model/entity/person-title";
import {Person} from "../model/entity/person";
import {CodeLabel} from "../model/entity/code-label";
import {Gender} from "../model/entity/gender";
import {ColDef, GridApi, GridOptions} from "ag-grid-community";
import {DateLabelValue} from "../model/dto/DateLabelValue";
import {TitleType} from "../model/enums/title-type";
import {Constants} from "../model/constants";
import {hasFormFieldChanged} from "../utils/form-utils";

@Component({
  selector: 'app-abstract-person',
  templateUrl: './abstract-person.component.html',
  styleUrls: ['./abstract-person.component.scss']
})
export abstract class AbstractPersonComponent implements OnInit {

  protected httpError: HttpErrorResponse | undefined;
  protected operationMessage: string = '';

  protected person: Person | undefined
  protected personForm: FormGroup | undefined;

  protected selectedTitle: Title | undefined;
  protected selectedTitles: Title[] = [];

  protected allGenders: CodeLabel[] = [];
  protected selectedGenderCodeLabel: CodeLabel | undefined;
  protected gender: Gender | undefined;

  protected allTitleTypes: CodeLabel[] = [];
  protected selectedTitleTypeLabel: CodeLabel | undefined;

  protected allTitles: Title[] = [];

  public rowSelectionMode = 'single';
  // selectedTitle: Title | undefined;
  // selectedTitles: Title[] = [];

  protected titlesGridApi: GridApi | undefined;
  protected titlesColumnDefs: ColDef[] = [];
  protected titlesGridOptions: GridOptions | undefined;

  protected datesColumnDefs: ColDef[] = [];
  protected datesGridOptions: GridOptions | undefined;
  protected allDatesLabelValues: DateLabelValue[] = [];

  constructor(protected router: Router, protected fb: FormBuilder, protected titlesService: TitlesService) {
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
  }

  ngOnInit(): void {
    this.initPersonForm();
  }

  protected applyPerson(existingPerson: Person) {

  }

  protected closeForm() {
    this.router.navigate(['persons']);
  }

  protected createDatesColumnDefs(): any[] {
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

  protected createDatesGridOptions(): GridOptions {
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

  protected createTitlesColumnDefs(): any[] {
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
  protected getDateOfBirthDay(): number {
    return <number>this.person?.dateOfBirth?.day;
  }

  protected getDateOfBirthMonth(): number {
    return <number>this.person?.dateOfBirth?.month;
  }

  protected getDateOfBirthYear(): number {
    return <number>this.person?.dateOfBirth?.year;
  }

  protected getDateOfDeathDay(): number {
    return <number>this.person?.dateOfDeath?.day;
  }

  protected getDateOfDeathMonth(): number {
    return <number>this.person?.dateOfDeath?.month;
  }

  protected getDateOfDeathYear(): number {
    return <number>this.person?.dateOfDeath?.year;
  }

  protected getGenders(): CodeLabel[] {
    const gender = new Gender();
    return gender.genders;
  }

  protected getPersonForm(): FormGroup {
    return this.personForm!;
  }

  protected getTitles(): Title[] {
    console.log('app-edit-person.getTitles: start');

    this.selectedTitles = [];
    if (!this.person?.titles) {
      return this.selectedTitles;
    }

    console.log('app-edit-person.getTitles: no of person titles = ' + this.person.titles.length);

    for (const datum in this.person.titles) {
      if (this.person.titles.hasOwnProperty(datum)) {
        console.log('app-edit-person.getTitles: map PersonTitle to Title');
        const personTitle: PersonTitle = this.person.titles[datum];

        if (personTitle != null && personTitle.title != null) {
          const title: Title = new Title();
          title.id = personTitle.title?.id;
          title.title = personTitle.title.title;
          title.description = personTitle.title.description;
          title.titleType = personTitle.title.titleType;
          title.appliesTo = personTitle.title.appliesTo;
          title.status = personTitle.title.status;
          title.createdBy = personTitle.title.createdBy;
          title.updatedBy = personTitle.title.updatedBy;
          title.lastUpdated = personTitle.title.lastUpdated;
          title.selected = personTitle.title.selected;
          title.action = personTitle.title.action;
          title.isDataChanged = personTitle.title.isDataChanged;
          console.log('app-edit-person.getTitles: constructed Title = ' + title.title);
          this.selectedTitles.push(title);
        }
      }
    }

    // this.selectedTitles = this.person && this.person.titles &&
    //     this.person.titles.map(personTitle => <Title> {
    //         id: personTitle.title.id,
    //         title: personTitle.title.title,
    //         description: personTitle.title.description,
    //         titleType: personTitle.title.titleType,
    //         appliesTo: personTitle.title.appliesTo,
    //         status: personTitle.title.status,
    //         createdBy: personTitle.title.createdBy,
    //         updatedBy: personTitle.title.updatedBy,
    //         lastUpdated: personTitle.title.lastUpdated,
    //         selected: personTitle.title.selected,
    //         action: personTitle.title.action,
    //         isDataChanged: personTitle.title.isDataChanged
    //     });

    console.log('app-edit-person.getTitles: end');

    return this.selectedTitles;
  }

  protected getTitleTypes(): CodeLabel[] {
    return this.allTitleTypes;
  }

  protected hasFirstNameFieldChanged() {
    return hasFormFieldChanged(this.getPersonForm(), 'firstName');
  }

  protected initAllDatesCodeLabels() {
    console.log('app-edit-person: calling initAllDatesCodeLabels');
    this.allDatesLabelValues = [];

    const dobLabel = new CodeLabel('DOB', 'Date of birth');
    const dob = new DateLabelValue(dobLabel, Constants.UNSET_DATE_VALUE);

    const dodLabel = new CodeLabel('DOD', 'Date of death');
    const dod = new DateLabelValue(dodLabel, Constants.UNSET_DATE_VALUE);

    this.allDatesLabelValues.push(dob);
    this.allDatesLabelValues.push(dod);

    console.log('app-edit-person.initAllDatesCodeLabels: allDatesLabelValues=' + this.allDatesLabelValues);
  }

  protected initGenders() {
    console.log('app-edit-person: calling initGenders');
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

  protected initPersonForm() {
    this.personForm = this.fb.group({
      firstName: [null, [Validators.max(30), Validators.required]],
      middleName: [null, Validators.max(30)],
      familyName: [null, [Validators.max(50), Validators.required]],
      gender: [null, [Validators.required]],
      titles: [],
      // titles: this.person.titles,
      dateOfBirthYear: null,
      dateOfBirthMonth: [null, Validators.min(0)],
      dateOfBirthDayOfMonth: [null, Validators.min(0)],
      dateOfDeathYear: null,
      dateOfDeathMonth: [null, Validators.min(0)],
      dateOfDeathDayOfMonth: [null, Validators.min(0)],
      birthPlaceName: null,
      birthPlaceAltitude: null,
      birthPlaceLatitude: null,
      birthPlaceLongitude: null,
      deathPlaceName: null,
      deathPlaceAltitude: null,
      deathPlaceLatitude: null,
      deathPlaceLongitude: null
    });
  }

  protected initTitles() {
    console.log('abstract-person: calling initTitles');
    this.titlesService.findAll().subscribe(
      data => {
        this.allTitles = data;
        this.httpError = undefined;
      },
      err => {
        console.error('app-edit-person.findAll: err=', err);
        this.httpError = err;
      }
    );
  }

  protected initTitleTypes() {
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

  protected onChangeGender() {
    console.log('app-edit-person: onChangeGender - form control gender=' + this.getPersonForm()!.controls['gender'].value);
    const selected: CodeLabel = this.getPersonForm()!.controls['gender'].value; // results in 'selected' of string NOT CodeLabel
    const thisRef = this;
    // this.gender.current = selected;

    // if (selected) {
    //     if (this.gender.isMale(selected) || this.gender.isFemale(selected)) {
    //         this.filteredGenders = this.allGenders.filter(gender => gender === selected);
    //         // this.filteredTitles = this.allTitles.filter(title => title.appliesTo === this.gender);
    //         this.filteredTitles = this.filterTitles();
    //         console.log('onChangeGender: filteredGenders size = ', this.filteredGenders.length);
    //     }
    //     console.log('onChangeGender 1: TRUE selected=', selected, ' selected=', selected);
    // }
  }

  protected onChangeTitle() {
    const selected: Title = this.getPersonForm()!.controls['title'].value;
    console.log('app-edit-person.onChangeTitle: new title=' + selected);
    this.selectedTitle = selected;
  }

  protected onChangeTitleType() {
    this.selectedTitleTypeLabel = this.getPersonForm()!.controls['titleType'].value;
  }

  protected onRowSelectedTitle(event: any) {
    const title: Title = event.node.selected;
    event.data.selected = event.node.selected;
    console.log('app-edit-person.onRowSelectedTitle: title=' + title);
    // this.selectedTitles = this.titlesGridApi.getSelectedRows();
  }

  protected onRowSelectedTitleChanged(event: any) {
    const title: Title = event.node.selected;
    console.log('app-edit-person.onRowSelectedTitleChanged: title=' + title);
    // this.selectedTitles = this.titlesGridApi.getSelectedRows();
  }
}
