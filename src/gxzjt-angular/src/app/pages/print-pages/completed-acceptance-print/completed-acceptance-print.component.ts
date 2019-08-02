import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { dateTrans } from 'infrastructure/regular-expression';

@Component({
  selector: 'app-completed-acceptance-print',
  templateUrl: './completed-acceptance-print.component.html',
  styleUrls: ['../print.less']
})
export class CompletedAcceptancePrintComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute) {
    this.data = JSON.parse(this.getToken());
    // this.data.planStartTime = this.data.planStartTime ? dateTrans(this.data.planStartTime) : '';
    // this.data.planEndTime = this.data.planEndTime ? dateTrans(this.data.planEndTime) : "";

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
