import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-add-postwork',
  templateUrl: './add-postwork.component.html',
  styles: []
})
export class AddPostworkComponent implements OnInit {

  //从上个页面传来的
  title
  editName
  addForm
  operate
  constructor(public subject: NzModalRef) { }

  ngOnInit() {
  }

  close(res) {
    this.subject.destroy({
      opt: res,
      // auditors: this.radioValue,
    })
  }

}
