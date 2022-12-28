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
import {DataAction} from "../model/enums/data-action";
import {Role} from "../model/entity/role";
import {AttributeType} from "../model/entity/attribute-type";
import {PersonRole} from "../model/entity/person-role";
import {PersonAttribute} from "../model/entity/person-attribute";
import {historicalDateFormatterYYYYMMDD} from "../formatters/date-formatters";

@Component({
  selector: 'app-abstract-person',
  templateUrl: './abstract-person.component.html',
  styleUrls: ['./abstract-person.component.scss']
})
export abstract class AbstractPersonComponent implements OnInit {

  protected httpError: HttpErrorResponse | undefined;
  protected operationMessage: string = '';

  protected person: Person | undefined;
  protected personForm: FormGroup | undefined;

  protected filteredTitles: PersonTitle[] = [];
  protected selectedTitle: PersonTitle | undefined;
  protected selectedTitles: PersonTitle[] = [];

  protected filteredRoles: PersonRole[] = [];
  protected selectedRole: PersonRole | undefined;
  protected selectedRoles: PersonRole[] = [];

  protected filteredAttributes: PersonAttribute[] = [];
  protected selectedAttribute: PersonAttribute | undefined;
  protected selectedAttributes: PersonAttribute[] = [];

  protected allGenders: CodeLabel[] = [];
  protected filteredGenders: CodeLabel[] = [];
  protected gender: Gender | undefined;
  protected selectedGenderCodeLabel: CodeLabel | undefined;

  protected allTitleTypes: CodeLabel[] = [];
  protected selectedTitleTypeLabel: CodeLabel | undefined;

  protected allTitles: Title[] = [];

  public rowSelectionMode = 'single';

  protected attributeTypesGridApi: GridApi | undefined;
  protected attributeTypesColumnDefs: ColDef[] = [];
  protected attributeTypesGridOptions: GridOptions | undefined;

  protected rolesGridApi: GridApi | undefined;
  protected rolesColumnDefs: ColDef[] = [];
  protected rolesGridOptions: GridOptions | undefined;

  protected titlesGridApi: GridApi | undefined;
  protected titlesColumnDefs: ColDef[] = [];
  protected titlesGridOptions: GridOptions | undefined;

  protected datesColumnDefs: ColDef[] = [];
  protected datesGridOptions: GridOptions | undefined;
  protected allDatesLabelValues: DateLabelValue[] = [];

  constructor(protected router: Router, protected fb: FormBuilder, protected titlesService: TitlesService) {
    console.log('app-abstract-person: constructor');
    this.titlesColumnDefs = this.createTitlesColumnDefs();
    this.titlesGridOptions = this.createTitlesGridOptions();
    //
    this.rolesColumnDefs = this.createTitlesColumnDefs();
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
    console.log('app-abstract-person: ngOnInit');
    this.initPersonForm();
  }

  // apply all values from Person that dod not rely on GridApi such as titlesGridApi
  // as onGridReady is called after ngOnInit
  protected applyPerson(existingPerson: Person) {
    console.log('app-abstract-person: applyPerson');
    let titlesLen = 0;
    if (existingPerson && existingPerson.titles)
      titlesLen = existingPerson.titles.length;
    console.log('app-abstract-person.applyPerson: existingPerson.titles length=' + titlesLen);
      this.getPersonForm().controls['firstName'].patchValue(existingPerson.firstName, { emitEvent: false });
      this.getPersonForm().controls['middleName'].patchValue(existingPerson.middleName, { emitEvent: false });
      this.getPersonForm().controls['familyName'].patchValue(existingPerson.familyName, { emitEvent: false });
      this.getPersonForm().controls['gender'].patchValue(existingPerson.gender, { emitEvent: false });
      //
      // existingPerson.titles.forEach((personTitle) => this.logPersonTitle(personTitle));
      this.getPersonForm().controls['titles'].patchValue(existingPerson.titles, {emitEvent: false});

      this.getPersonForm().controls['dateOfBirthDayOfMonth'].patchValue(existingPerson.dateOfBirth?.day)
      this.getPersonForm().controls['dateOfBirthMonth'].patchValue(existingPerson.dateOfBirth?.month)
      this.getPersonForm().controls['dateOfBirthYear'].patchValue(existingPerson.dateOfBirth?.year)

      this.getPersonForm().controls['dateOfDeathDayOfMonth'].patchValue(existingPerson.dateOfDeath?.day)
      this.getPersonForm().controls['dateOfDeathMonth'].patchValue(existingPerson.dateOfDeath?.month)
      this.getPersonForm().controls['dateOfDeathYear'].patchValue(existingPerson.dateOfDeath?.year)

    if (existingPerson.birthPlace) {
      this.getPersonForm().controls['birthPlaceName'].patchValue(existingPerson.birthPlace.name)
      this.getPersonForm().controls['birthPlaceAltitude'].patchValue(existingPerson.birthPlace.altitude)
      this.getPersonForm().controls['birthPlaceLatitude'].patchValue(existingPerson.birthPlace.latitude)
      this.getPersonForm().controls['birthPlaceLongitude'].patchValue(existingPerson.birthPlace.longitude)
    }

    if (existingPerson.deathPlace) {
      this.getPersonForm().controls['deathPlaceName'].patchValue(existingPerson.deathPlace.name)
      this.getPersonForm().controls['deathPlaceAltitude'].patchValue(existingPerson.deathPlace.altitude)
      this.getPersonForm().controls['deathPlaceLatitude'].patchValue(existingPerson.deathPlace.latitude)
      this.getPersonForm().controls['deathPlaceLongitude'].patchValue(existingPerson.deathPlace.longitude)
    }

    if (existingPerson.titles?.length > 0) {
      this.selectedTitles = [];
      for (const personTitle of existingPerson.titles) {
        if (personTitle != null) {
          this.selectedTitles.push(personTitle);
        }
      }
      this.selectedTitles.forEach((personTitle) => this.logPersonTitle(personTitle));
    }

    if (existingPerson.roles?.length > 0) {
      this.selectedRoles = [];
      for (const personRole of existingPerson.roles) {
        if (personRole != null) {
          this.selectedRoles.push(personRole);
        }
      }
      this.selectedRoles.forEach((role) => this.logPersonRole(role));
    }

    if (existingPerson.attributes?.length > 0) {
      this.selectedAttributes = [];
      for (const personAttribute of existingPerson.attributes) {
        if (personAttribute != null) {
          this.selectedAttributes.push(personAttribute);
        }
      }
      this.selectedAttributes.forEach((attribute) => this.logPersonAttribute(attribute));
    }
  }

  protected logPersonAttribute(personAttribute: PersonAttribute) {
    console.log('app-abstract-person.logPersonAttribute: personAttribute ' +
      ' attribute=' + personAttribute.attributeType?.name + ' dataType=' + personAttribute.attributeType?.dataType);
  }

  protected logPersonRole(personRole: PersonRole) {
    console.log('app-abstract-person.logPersonRole: personRole ' +
      ' role=' + personRole.role + ' roleStarted=' + personRole.roleStarted + ' roleEnded=' + personRole.roleEnded);
  }

  protected logPersonTitle(personTitle: PersonTitle) {
    console.log('app-abstract-person.logPersonTitle: personTitle ' +
        ' name=' + [personTitle.person?.firstName, personTitle.person?.middleName, personTitle.person?.familyName].join(' ') +
        ' title=' + personTitle.title?.title + ' ' + personTitle.title?.titleType + ' ' + personTitle.title?.appliesTo);
  }

  protected logTitle(title: Title) {
    console.log('app-abstract-person.logTitle: title ' +
      ' title=' + title.title + ' titleType=' + title.titleType + ' appliesTo=' + title.appliesTo);
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

  protected createPersonAttributesColumnDefs(): any[] {
    return [
      {headerName: 'Selected', field: 'selected', width: 100, checkboxSelection: true, editable: true},
      {headerName: 'ID', field: 'id', width: 60, editable: false, filter: true},
      {headerName: 'Name', field: 'attributeType.name', width: 100, editable: false, filter: true},
      {headerName: 'Position', field: 'position', width: 100, editable: false, filter: true},
      {headerName: 'Type', field: 'attributeType.dataType', width: 75, editable: false, filter: false},
      {headerName: 'Decimal Value', field: 'decimalValue', width: 100, editable: false, filter: false},
      {headerName: 'Integer Value', field: 'integerValue', width: 100, editable: false, filter: false},
      {headerName: 'String Value', field: 'stringValue', width: 100, editable: false, filter: false},
    ];
  }

  onAttributeTypesGridReady(params: any) {
    console.log('app-abstract-person: onAttributeTypesGridReady');
    this.reloadRoles();
    if (this.attributeTypesGridApi) {
      var params: any = {
        force: false,
        suppressFlash: true,
      };
      this.attributeTypesGridApi!.refreshCells(params);
    }
  }

  protected createRolesColumnDefs(): any[] {
    return [
      {headerName: 'Selected', field: 'selected', width: 100, checkboxSelection: true, editable: true},
      {headerName: 'ID', field: 'id', width: 60, editable: false, filter: true},
      {headerName: 'Name', field: 'role.name', width: 200, editable: false, filter: true},
      {headerName: 'Started', field: 'roleStarted', valueFormatter: historicalDateFormatterYYYYMMDD, width: 100, editable: false, filter: true},
      {headerName: 'Ended', field: 'roleEnded', valueFormatter: historicalDateFormatterYYYYMMDD, width: 100, editable: false, filter: true},
    ];
  }

  protected createRolesGridOptions(): GridOptions {
    return <GridOptions>{
      animateRows: true,
      enableCellChangeFlash: true,
      enableColResize: true,
      enableFilter: true,
      enableSorting: true,
      onCellValueChanged: this.onChangeRole,
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

  protected createTitlesColumnDefs(): any[] {
    return [
      {headerName: 'Selected', field: 'selected', width: 100, checkboxSelection: true, editable: true},
      {headerName: 'ID', field: 'id', width: 60, editable: false, filter: true},
      {headerName: 'Title', field: 'title.title', width: 100, editable: false, filter: true},
      {headerName: 'Description', field: 'title.description', width: 200, editable: false, filter: true},
      {headerName: 'Position', field: 'position', width: 75, editable: false, filter: true},
      {headerName: 'Type', field: 'title.titleType', width: 200, editable: false, filter: true},
      {headerName: 'M/F', field: 'title.appliesTo', width: 80, editable: false, filter: true}
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

  protected filterTitles(): PersonTitle[] {
    console.log('app-abstract-person: filterTitles');

    return [];
    // return this.allTitles.filter(title =>
    //   this.gender !== undefined && title.appliesTo === this.gender &&
    //   this.selectedTitleTypeLabel !== undefined && personTitle.title.titleType === this.selectedTitleTypeLabel.getLabel()
    // );
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

  protected getTitles(): PersonTitle[] {
    console.log('app-abstract-person.getTitles: start');

    this.selectedTitles = [];
    if (!this.person?.titles) {
      return this.selectedTitles;
    }

    console.log('app-abstract-person.getTitles: no of person titles = ' + this.person.titles.length);

    for (const datum in this.person.titles) {
      if (this.person.titles.hasOwnProperty(datum)) {
        console.log('app-abstract-person.getTitles: map PersonTitle to Title');
        const personTitle: PersonTitle = this.person.titles[datum];

        // if (personTitle != null) {
        //   const title: PersonTitle = new PersonTitle();
        //   title.id = personTitle.title?.id;
        //   title.title.title = personTitle.title.title;
        //   title.description = personTitle.title.description;
        //   title.titleType = personTitle.title.titleType;
        //   title.appliesTo = personTitle.title.appliesTo;
        //   title.status = personTitle.title.status;
        //   title.createdBy = personTitle.title.createdBy;
        //   title.updatedBy = personTitle.title.updatedBy;
        //   title.lastUpdated = personTitle.title.lastUpdated;
        //   title.selected = personTitle.title.selected;
        //   title.action = personTitle.title.action;
        //   title.isDataChanged = personTitle.title.isDataChanged;
        //   console-person-maint.log('app-abstract-person.getTitles: constructed Title = ' + title.title);
        //   this.selectedTitles.push(title);
        // }
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

    console.log('app-abstract-person.getTitles: end');

    return this.selectedTitles;
  }

  protected getTitleTypes(): CodeLabel[] {
    return this.allTitleTypes;
  }

  protected hasFirstNameFieldChanged() {
    return hasFormFieldChanged(this.getPersonForm(), 'firstName');
  }

  protected hasFamilyNameFieldChanged() {
    return hasFormFieldChanged(this.getPersonForm(), 'familyName');
  }

  protected initAllDatesCodeLabels() {
    console.log('app-abstract-person: calling initAllDatesCodeLabels');
    this.allDatesLabelValues = [];

    const dobLabel = new CodeLabel('DOB', 'Date of birth');
    const dob = new DateLabelValue(dobLabel, Constants.UNSET_DATE_VALUE);

    const dodLabel = new CodeLabel('DOD', 'Date of death');
    const dod = new DateLabelValue(dodLabel, Constants.UNSET_DATE_VALUE);

    this.allDatesLabelValues.push(dob);
    this.allDatesLabelValues.push(dod);

    console.log('app-abstract-person.initAllDatesCodeLabels: allDatesLabelValues=' + this.allDatesLabelValues);
  }

  protected initGenders() {
    console.log('app-abstract-person: initGenders');
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
    console.log('app-abstract-person: initPersonForm')
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
    console.log('app-abstract-person: initTitles');
    this.titlesService.findAll().subscribe(
      data => {
        this.allTitles = data;
        this.httpError = undefined;
      },
      err => {
        console.error('app-abstract-person.findAll: err=', err);
        this.httpError = err;
      }
    );
  }

  protected initTitleTypes() {
    console.log('app-abstract-person: initTitleTypes');
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

  onTitlesCellValueChanged(event: any) {
    // handle updated 'name' value
    console.log('onTitlesCellValueChanged - entry: event=' + event);
    if (event.data && event.data.id && event.data.id > 0) {
      event.data.action = DataAction.Update;
      this.titlesGridApi!.refreshCells();
    }
  }

  protected onChangeGender(event: any) {
    console.log('app-abstract-person: onChangeGender - event=' + event);
    console.log('app-abstract-person: onChangeGender - form control gender=' + this.getPersonForm().controls['gender'].value);
    const selected: CodeLabel = this.getPersonForm()!.controls['gender'].value.gender; // results in 'selected' of string NOT CodeLabel
    this.selectedGenderCodeLabel = selected
    const selectedGender = Gender.fromCodeLabel(this.selectedGenderCodeLabel)
    // this.gender.current = selected;

    if (selectedGender) {
        if (selectedGender.isMale(selected) || selectedGender.isFemale(selected)) {
            this.filteredGenders = this.allGenders.filter(gender => gender === selected);
            // this.filteredTitles = this.allTitles.filter(title => title.appliesTo === this.gender);
            this.filteredTitles = this.filterTitles();
            console.log('onChangeGender: filteredGenders size = ', this.filteredGenders.length);
        }
        console.log('onChangeGender 1: TRUE selected=', selected, ' selected=', selected);
    }
  }

  protected onChangeTitle() {
    const selected: PersonTitle = this.getPersonForm()!.controls['title'].value;
    console.log('app-abstract-person.onChangeTitle: new title=' + selected);
    this.selectedTitle = selected;
  }

  protected onChangeTitleType() {
    this.selectedTitleTypeLabel = this.getPersonForm()!.controls['titleType'].value;
  }

  onTitlesGridReady(params: any) {
    console.log('app-abstract-person: onTitlesGridReady');
    this.reloadTitles();
    if (this.titlesGridApi) {
      var params: any = {
        force: false,
        suppressFlash: true,
      };
      this.titlesGridApi!.refreshCells(params);
    }
  }

  protected onRowSelectedAttributeType(event: any) {
    const attributeType: AttributeType = event.node.selected;
    event.data.selected = event.node.selected;
    console.log('app-abstract-person.onRowSelectedAttributeType: attributeType=' + attributeType);
  }

  protected onRowSelectedAttributeTypeChanged(event: any) {
    const attributeType: AttributeType = event.node.selected;
    console.log('app-abstract-person.onRowSelectedAttributeTypeChanged: role=' + attributeType);
  }

  onAttributeTypesCellValueChanged(event: any) {
    // handle updated 'name' value
    console.log('onAttributeTypesCellValueChanged - entry: event=' + event);
    if (event.data && event.data.id && event.data.id > 0) {
      event.data.action = DataAction.Update;
      this.rolesGridApi!.refreshCells();
    }
  }

  protected onRowSelectedRole(event: any) {
    const role: Role = event.node.selected;
    event.data.selected = event.node.selected;
    console.log('app-abstract-person.onRowSelectedRole: role=' + role);
  }

  protected onRowSelectedRoleChanged(event: any) {
    const role: Role = event.node.selected;
    console.log('app-abstract-person.onRowSelectedRoleChanged: role=' + role);
  }

  onRolesCellValueChanged(event: any) {
    // handle updated 'name' value
    console.log('onRolesCellValueChanged - entry: event=' + event);
    if (event.data && event.data.id && event.data.id > 0) {
      event.data.action = DataAction.Update;
      this.rolesGridApi!.refreshCells();
    }
  }

  protected onChangeRole() {
    const selected: Role = this.getPersonForm()!.controls['role'].value; // what should this be ?
    console.log('app-abstract-person.onChangeRole: new role=' + selected);
    // this.selectedRole = selected; // TODO change selectedRole to new selection
  }

  protected onRowSelectedTitle(event: any) {
    const title: Title = event.node.selected;
    event.data.selected = event.node.selected;
    console.log('app-abstract-person.onRowSelectedTitle: title=' + title);
    // this.selectedTitles = this.titlesGridApi.getSelectedRows();
  }

  protected onRowSelectedTitleChanged(event: any) {
    const title: Title = event.node.selected;
    console.log('app-abstract-person.onRowSelectedTitleChanged: title=' + title);
    // this.selectedTitles = this.titlesGridApi.getSelectedRows();
  }

  onRolesGridReady(params: any) {
    console.log('app-abstract-person: onRolesGridReady');
    this.reloadRoles();
    if (this.rolesGridApi) {
      var params: any = {
        force: false,
        suppressFlash: true,
      };
      this.rolesGridApi!.refreshCells(params);
    }
  }

  protected reloadRoles() {
    let rolesLen = (this.person && this.person.roles) ? this.person?.roles?.length : 0;
    console.log('app-abstract-person: reloadRoles - person roles length = ' + rolesLen);
    // if (this.person?.roles && this.person?.roles?.length > 0) {

      // this.selectedTitles = []
      // for (let i=0; i < this.person.titles.length; i++) {
      //   const personTitle = this.person.titles[i] as PersonTitle;
      //   if (personTitle != null && personTitle.title != null) {
      //     console.log('app-abstract-person: reloadTitles - title=' + personTitle.title.title + ' titleType=' + personTitle.title.titleType + ' appliesTo=' + personTitle.title.appliesTo);
      //     const currentTitle = personTitle.title as Title;
      //     // const currentTitleType = personTitle.title.titleType as TitleType;
      //     console.log('app-abstract-person: reloadTitles - currentTitle title=' + currentTitle.title + ' titleType=' + currentTitle.titleType?.toString());
      //     this.selectedTitles.push(personTitle.title);
      //   }
      // }
      // this.selectedTitles = this.person?.titles?.map((title) => title?.title);
      console.log('reloadRoles: selectedRoles=' + this.selectedRoles);
      this.getPersonForm().controls['roles'].patchValue(this.selectedRoles, {emitEvent: false});
    // }
  }

  protected reloadTitles() {
    let titlesLen = (this.person && this.person.titles) ? this.person?.titles?.length : 0;
    console.log('app-abstract-person: reloadTitles - person titles length = ' + titlesLen);
    if (this.person?.titles && this.person?.titles?.length > 0) {
        // this.selectedTitles = []
        // for (let i=0; i < this.person.titles.length; i++) {
        //   const personTitle = this.person.titles[i] as PersonTitle;
        //   if (personTitle != null && personTitle.title != null) {
        //     console.log('app-abstract-person: reloadTitles - title=' + personTitle.title.title + ' titleType=' + personTitle.title.titleType + ' appliesTo=' + personTitle.title.appliesTo);
        //     const currentTitle = personTitle.title as Title;
        //     // const currentTitleType = personTitle.title.titleType as TitleType;
        //     console.log('app-abstract-person: reloadTitles - currentTitle title=' + currentTitle.title + ' titleType=' + currentTitle.titleType?.toString());
        //     this.selectedTitles.push(personTitle.title);
        //   }
        // }
      // this.selectedTitles = this.person?.titles?.map((title) => title?.title);
        console.log('applyPerson: selectedTitles=' + this.selectedTitles);
        this.getPersonForm().controls['titles'].patchValue(this.selectedTitles, {emitEvent: false});
      }
  }

}
