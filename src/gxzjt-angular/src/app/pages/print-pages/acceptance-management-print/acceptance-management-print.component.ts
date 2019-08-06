import { Component, OnInit } from '@angular/core';
import { dateTrans } from 'infrastructure/regular-expression';

@Component({
  selector: 'app-acceptance-management-print',
  templateUrl: './acceptance-management-print.component.html',
  styleUrls: ['../print.less']
})
export class AcceptanceManagementPrintComponent implements OnInit {

  constructor() {
  }
  data: any;

  ngOnInit() {
    this.data = JSON.parse(this.getToken());
  }


  ngOnDestroy(): void {
    localStorage.removeItem('jsonPrintForm');
  }
  /**
   * 获取token的值
   * */
  getToken() {
    return localStorage.getItem('jsonPrintForm');
  }


  ngAfterViewInit() {
    window.print();
    history.go(-1);
  }
}
