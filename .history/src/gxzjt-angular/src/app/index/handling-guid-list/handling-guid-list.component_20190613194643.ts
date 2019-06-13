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
      name: '建设工程消防设计审核指南',
      src:"../../../assets/images/index/办事指南_03.jpg",
      tip:'审核依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》等消防法规；国家工程建设消防技术标准强制性要求。',
    },
    {
      path: '',
      src:"../../../assets/images/index/办事指南详情_10.jpg",
      name: '建设工程消防验收指南',
      tip: "验收依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》等消防法规；建设工程消防验收评定标准。",
      time: '2019-06-03 12:12',
    },
    {
      path: '',
      src:"../../../assets/images/index/办事指南_19.jpg",
      name: '公众聚集场所使用、营业前消防安全检查指南',
      tip: "检查依据：《中华人民共和国消防法》；《消防监督检查规定》",
      time: '2019-06-03 12:12',
    }
  ];
  rightList = [
    {
      path: '',
      name: '建设工程消防设计备案指南',
      src:"../../../assets/images/index/办事指南详情_16.jpg",
      tip: " 备案依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》；"
    },
    {
      path: '',
      name: '《建设工程消防监督管理规定》',
      src:"../../../assets/images/index/办事指南详情_18.jpg",
      tip: " 备案依据：《中华人民共和国消防法》；《建设工程消防监督管理规定》；"

    }
  ];

  ngOnInit(): void { }

}
