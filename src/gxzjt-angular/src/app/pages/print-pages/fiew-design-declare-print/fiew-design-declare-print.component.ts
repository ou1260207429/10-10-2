import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiew-design-declare-print',
  templateUrl: './fiew-design-declare-print.component.html',
  styleUrls: ['../print.less']
})
export class FiewDesignDeclarePrintComponent implements OnInit {
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
    setTimeout(() => {
      window.print();
      history.go(-1);
    }, 150)

  }
}
