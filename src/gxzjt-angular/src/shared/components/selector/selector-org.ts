
import { Component, Input, Output, EventEmitter, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';


import { HomeServiceProxy, EnterpriseDto } from '@shared/service-proxies/service-proxies'


// import { ControlContainer, NgForm, FormGroup } from '@angular/forms';

@Component({
  selector: 'nz-rj-selector-org',
  encapsulation: ViewEncapsulation.None,
  // viewProviders: [{ provide: ControlContainer, useExisting: NgForm}],
  template: `


   <div class="org-input">
    <input  nz-input 
      [name]="name"
      [placeholder]="placeHolder"
     
      [(ngModel)]="ngModel"
      (input)="onInput($event.target?.value)"
      [nzAutocomplete]="auto"
      (ngModelChange)="onChange($event)"
      [required]="required"
      [readonly]="readonly"
    />
    <nz-autocomplete nzBackfill #auto>
      <nz-auto-option *ngFor="let option of orgList" [nzValue]="option.name">
        {{ option.name }}
      </nz-auto-option>
    </nz-autocomplete>
    
    </div>
   
    `
  ,
  styles: [
    `
      .org-input {
      
      }
    `]
})
export class SelectorOrgComponent {
  constructor(
    private _HomeServiceProxy: HomeServiceProxy) {

  }

  // AfterViewInit(){
  //   this.inRequired = this.inputRequired;
  // }

  isLoading = false;






  orgList: EnterpriseDto[];

  @Input() ngModel: any;

  @Output() ngModelChange = new EventEmitter();

  @Input()
  name: string;

  @Input()
  required: boolean;

  @Input()
  readonly: boolean = false

  @Input()
  placeHolder = "请输入单位名称";



  @Output() onSelectorEvent = new EventEmitter<EnterpriseDto>();

  onChange(value) {
    this.ngModelChange.emit(value);
    if (this.orgList && this.orgList.length > 0) {
      for (let i of this.orgList) {
        if (i.name == value) {
          this.onSelectorEvent.emit(i);
          return;
        }

      }
    }

  }


  onInput(value: string): void {
    this.isLoading = true;

    this._HomeServiceProxy.getOrganizationsByName(value).subscribe((res: EnterpriseDto[]) => {
      this.isLoading = false;

      this.orgList = res;
      // console.log(res);

    }, err => {
      // console.log(err);
      this.isLoading = false;
      this.orgList = [];
    });
  }
}