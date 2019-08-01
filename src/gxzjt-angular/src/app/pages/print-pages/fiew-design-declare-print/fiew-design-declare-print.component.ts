import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fiew-design-declare-print',
  templateUrl: './fiew-design-declare-print.component.html',
  styleUrls: ['../print.less']
})
export class FiewDesignDeclarePrintComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute) {
    this.data = JSON.parse(this.getToken());
    // this.data.planStartTime = this.data.planStartTime ? moment(this.data.planStartTime).format("YYYY-MM-DD") : '';
    // this.data.planEndTime = this.data.planEndTime ? moment(this.data.planEndTime).format("YYYY-MM-DD") : "";
    console.log(JSON.parse(this.getToken()))

  }
  data: any;

  ngOnInit() {

    console.log(this.data.projectCategoryId)
  }
  goback() {
    window.print();
    history.go(-1);
  }

  print() {
    window.print();
  }
  ngOnDestroy(): void {
    localStorage.removeItem('jsonPrintForm')

  }
  /**
   * 获取token的值
   * */
  getToken() {
    return localStorage.getItem('jsonPrintForm');
  }

  /**
   * 移除token的值
   * */
  removeToken() {

  }
  ngAfterViewInit() {
    // window.print();
    // history.go(-1);

    // setTimeout(() => {
    //   window.print();
    // }, 20)

  }
}
