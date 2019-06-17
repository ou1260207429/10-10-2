import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement-information',
  templateUrl: './announcement-information.component.html',
  styleUrls: ['./announcement-information.less']
})
export class AnnouncementInformationComponent implements OnInit {
  record: any = {};
  i: any;
  router: any;

  constructor() { }
  currentIndex = 0;
  navList = [
    {
      type: 'index',
      name: '消防设计审查',
    },
    {
      path: '/form-download',
      name: '消防验收',
    },
    {
      path: '/laws-and-regulations',
      name: '竣工验收消防备案',
    },
  ];


  ngOnInit(): void { }

  close() { }


  /**
   * 跳转进表单列表页
   */
  goFromList() {
    // this.router.navigate(item.path);
  }

}
