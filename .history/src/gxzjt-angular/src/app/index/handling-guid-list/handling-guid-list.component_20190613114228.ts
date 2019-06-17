import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-handling-guid-list',
  templateUrl: './handling-guid-list.component.html',
  styleUrls: ['./handling-guid-list.less']
})
export class HandlingGuidListComponent implements OnInit {
  record: any = {};
  i: any;
  router: any;

  constructor() { }
  currentIndex = 0;
  xukeList = [
    {
      path: '',
      name: '公众聚集场所使用、营业前消防安全检查指南',
      tip:"审核依据：《中华人民共和国消防法》；《建设工程消防监督管
      理规定》等消防法规；国家工程建设消防技术标准强制性要求。",
      time: '2019-06-03 12:12',
    },
    {
      path: '',
      name: '建设工程消防设计审查申请表',
      tip:"777777777777777777777777777777777777777777777777",
      time: '2019-06-03 12:12',
    },
    {
      path: '',
      name: '建设工程消防验收申请表',
      tip:"777777777777777777777777777777777777777777777777",
      time: '2019-06-03 12:12',
    }
  ];
  lawList = [
    {
      path: '',
      name: '中华人民共和国消防法',
    },
    {
      path: '',
      name: '《建设工程消防监督管理规定》',
    },
    {
      path: '',
      name: '《消防监督检查规定》',
    },
  ];

  ngOnInit(): void { }

  close() { }


  /**
   * 跳转进表单列表页
   */
  goFromList(item) {
    this.router.navigate(item.path);
  }
}
