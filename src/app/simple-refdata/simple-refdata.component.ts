import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgxPermissionsService} from "ngx-permissions";
import {NonEmptyDropdownValidator} from "../validators/non-empty-dropdown.validator";

@Component({
  selector: 'app-simple-refdata',
  templateUrl: './simple-refdata.component.html',
  styleUrls: ['./simple-refdata.component.scss']
})
export class SimpleRefdataComponent implements OnInit, OnChanges {

  refDataTypeForm: FormGroup = this.createRefDataTypeForm(); //| undefined;
  selectedAddressType: boolean = false;
  selectedArtefactGroup: boolean = false;
  selectedArtefactType: boolean = false;
  selectedCalendarType: boolean = false;
  selectedDeityType: boolean = false;
  selectedEntityType: boolean = false;
  selectedEventTypeGroup: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private ngxPermissionsService: NgxPermissionsService) {
    console.log('simple-refdata constructor');
    this.createRefDataTypeForm();
  }

  ngOnInit() {
    console.log('simple-refdata.ngOnit');
    this.selectedAddressType = false;
    this.selectedArtefactGroup = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('simple-refdata.ngOnChanges: changes=' + changes);
  }

  createRefDataTypeForm() {
    console.log('simple-refdata.createRefDataTypeForm');
    return this.refDataTypeForm = this.fb.group({
      refDataType : ['Please select', [Validators.required, NonEmptyDropdownValidator]]
    });
  }

  onChangedRefDataType(event: any) {
    console.log('simple-refdata.onChangedRefDataType: refDataTypeForm.controls[\'refDataType\']=' +
      this.refDataTypeForm!.controls['refDataType']);
    console.log('simple-refdata.onChangedRefDataType: event.target.value=' + event.target.value);
  }

  loadSelectedRefDataType() {
    const selectedRefDataType = this.refDataTypeForm!.controls['refDataType'];
    console.log('Loading selected reference data type = ' + selectedRefDataType);
    // display appropriate grid/form in panel
    this.disableAllRefDataTypeForms();
    switch (this.refDataTypeForm!.controls['refDataType'].value) {
      case 'Address type':
        this.selectedAddressType = true;
        break;
      case 'Artefact group':
        this.selectedArtefactGroup = true;
    }
  }

  disableRefDataTypeSubmit(): boolean {
    if (this.refDataTypeForm && this.refDataTypeForm.controls['refDataType'].value) {
      return this.refDataTypeForm.controls['refDataType'].value === 'Please select';
    } else {
      return false;
    }
  }

  isAddressTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Address type');
  }

  isArtefactGroupDataRefType(): boolean {
    return this.formContains('refDataType', 'Artefact group');
  }

  isArtefactTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Artefact type');
  }

  isCalendarTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Calendar type');
  }

  isDeityTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Deity type');
  }

  isEntityTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Entity type');
  }

  isEventTypeGroupDataRefType(): boolean {
    return this.formContains('refDataType', 'Event type group');
  }

  isHierarchyTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Hierarchy type');
  }

  isImageTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Image type');
  }

  isLanguageGroupDataRefType(): boolean {
    return this.formContains('refDataType', 'Language group');
  }

  isMeasureTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Measure type');
  }

  isPersonTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Person type');
  }

  isPublicationTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Publication type');
  }

  isRaceTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Race type');
  }

  isTaleTypeDataRefType(): boolean {
    return this.formContains('refDataType', 'Tale type');
  }

  isTechnologyTypeGroupDataRefType(): boolean {
    return this.formContains('refDataType', 'Technology type group');
  }

  formContains(controlName: string, value: string): boolean {
    return this.refDataTypeForm != null &&
      this.refDataTypeForm.controls[controlName] &&
      this.refDataTypeForm.controls[controlName].value === value
  }

  disableAllRefDataTypeForms() {
    this.selectedAddressType = false;
    this.selectedArtefactGroup = false;
    this.selectedArtefactType = false;
    this.selectedCalendarType = false;
    this.selectedDeityType = false;
    this.selectedEntityType = false;
    this.selectedEventTypeGroup = false;
  }
}
