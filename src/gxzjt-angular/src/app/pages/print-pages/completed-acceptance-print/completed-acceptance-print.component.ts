import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-completed-acceptance-print',
  templateUrl: './completed-acceptance-print.component.html',
  styleUrls: ['../print.less']
})
export class CompletedAcceptancePrintComponent implements OnInit {
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
    setTimeout(function () {
      window.print();
      history.go(-1);
    },120)
  }
}
