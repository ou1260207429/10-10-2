import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-download-list',
  templateUrl: './form-download-list.component.html',
  styleUrls: ['./form-download-list.less']
})
export class FormDownloadListComponent implements OnInit {
  record: any = {};
  i: any;
  router: any;

  constructor() { }
  currentIndex = 0;
  downLoadList = [


  ngOnInit(): void { }

  close() { }


  /**
   * 跳转进表单列表页
   */
  goFromList(item) {
    this.router.navigate(item.path);
  }

}
