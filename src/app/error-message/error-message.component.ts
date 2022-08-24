import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {

  constructor() { }

  @Input() error?: HttpErrorResponse = undefined;
  @Input() failedOperation: string = '';

  ngOnInit(): void {
  }

}
