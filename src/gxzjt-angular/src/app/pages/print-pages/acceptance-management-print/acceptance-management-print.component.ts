import { Component, OnInit } from '@angular/core';
import { dateTrans } from 'infrastructure/regular-expression';

@Component({
  selector: 'app-acceptance-management-print',
  templateUrl: './acceptance-management-print.component.html',
  styleUrls: ['../print.less']
})
export class AcceptanceManagementPrintComponent implements OnInit {

  constructor() {
    this.data = JSON.parse(this.getToken());
  }
  data: any;

  ngOnInit() {
    console.log(this.data)
  }
  goback() {
    window.print();
    history.go(-1);
  }

  print() {
    window.print();
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

    // setTimeout(() => {
    //   window.print();
    //   history.go(-1);

    // }, 100)

  }
}
