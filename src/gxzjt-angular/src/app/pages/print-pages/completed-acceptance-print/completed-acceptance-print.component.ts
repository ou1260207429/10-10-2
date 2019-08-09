import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-completed-acceptance-print',
  templateUrl: './completed-acceptance-print.component.html',
  styleUrls: ['../print.less']
})
export class CompletedAcceptancePrintComponent implements OnInit {
  constructor(private el: ElementRef) {
  }
  data: any;

  ngOnInit() {
    this.data = JSON.parse(this.getToken());
  }
  ngOnDestroy(): void {
    localStorage.removeItem('jsonPrintForm');
  }
  print(){
    window.print();
  }
  /**
   * 获取token的值
   * */
  getToken() {
    return localStorage.getItem('jsonPrintForm');
  }

  ngAfterViewInit() {
    let rows = this.el.nativeElement.querySelectorAll(".row");
    for (var i = 0; i < rows.length; i++) {
      let ss = rows[i].offsetTop / 1568;
      let num = Math.floor(ss);

      if (num > 0) {
        if (rows[i].offsetTop - 1568 * num < 130) {
          rows[i - 2].className = "breakPage row";
        }
      }else{
        if (1568 - rows[i].offsetTop < 50) {
          rows[i - 1].className = "breakPage row";
        }
      }
    }
    window.print();
    history.go(-1);
  }
}
