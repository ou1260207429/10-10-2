// import { HttpClient} from '@angular/common/http';
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

import { Observable, Observer } from 'rxjs';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';

import { HomeServiceProxy, EnterpriseDto } from '@shared/service-proxies/service-proxies'

@Component({
    selector: 'nz-rj-selector-org',
    encapsulation: ViewEncapsulation.None,
    //     template: `
    //     <nz-select
    //     style="width: 100%;"

    //     [(ngModel)]="inputOrg"
    //     [nzPlaceHolder]="placeHolder"
    //     nzAllowClear
    //     nzShowSearch
    //     [nzServerSearch]="true"
    //     (nzOnSearch)="onSearch($event)"
    //     (ngModelChange)="onSelectItem()"
    //   >
    //     <ng-container *ngFor="let item of orgList">
    //       <nz-option *ngIf="!isLoading" [nzValue]="item.name" [nzLabel]="item.name"></nz-option>
    //     </ng-container>
    //     <nz-option *ngIf="isLoading" nzDisabled nzCustomContent>
    //       <i nz-icon type="loading" class="loading-icon"></i>加载中...
    //     </nz-option>
    //   </nz-select>
    //   `,
    template: ` <div class="org-input">
    <input
      [placeholder]="placeHolder"
      nz-input 
      [(ngModel)]="inputOrg"
      (input)="onInput($event.target?.value)"
      [nzAutocomplete]="auto"
      (ngModelChange)="onChange($event)"
    />
    <nz-autocomplete nzBackfill #auto>
      <nz-auto-option *ngFor="let option of orgList" [nzValue]="option.name">
        {{ option.name }}
      </nz-auto-option>
    </nz-autocomplete>
    </div>`
    ,
    styles: [
        `
      .org-input {
      
      }
    `]
})
export class SelectorOrgComponent {
    constructor(
        private msg: NzMessageService,
        private _tokenService: TokenService,
        private _HomeServiceProxy: HomeServiceProxy) { }


    isLoading = false;

    @Input()
    @Output()
    orgList: EnterpriseDto[];

    @Input()
    @Output()
    inputOrg: string;


    @Output()
    placeHolder = "请输入单位名称";




    @Output() onSelectorEvent = new EventEmitter<EnterpriseDto>();

    onChange(value) {
        this.onSelectorEvent.emit(value);
    }

    onInput(value: string): void {
        this.isLoading = true;
        // this.searchChange$.next(value);
        this._HomeServiceProxy.getOrganizationsByName(value).subscribe((res: EnterpriseDto[]) => {
            this.isLoading = false;

            // var data = [];
            // if (this.inputOrg && this.inputOrg.length > 0) {

            // }
            this.orgList = res;
            // console.log(res);

        }, err => {
            // console.log(err);
            this.isLoading = false;
            this.orgList = [];
        });
    }
}