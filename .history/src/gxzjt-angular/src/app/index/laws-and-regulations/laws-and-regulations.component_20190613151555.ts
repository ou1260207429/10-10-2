import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-laws-and-regulations',
  templateUrl: './laws-and-regulations.component.html',
  styleUrls: ['./laws-and-regulations.less']
})
export class LawsAndRegulationsComponent implements OnInit {
  record: any = {};
  i: any;
  router: any;

  constructor() { }
  currentIndex = 0;

  downLoadList = [
    {
      path: '',
      name: '建设工程消防设计审查申请表',
      time: '2019-06-03 12:12',
      forms:"——全国人民代表大会常务委员会"
    },
    {
      path: '',
      name: '建设工程消防设计审查申请表',
      time: '2019-06-03 12:12',
      forms:"——全国人民代表大会常务委员会"
    },
    {
      path: '',
      name: '建设工程消防验收申请表',
      time: '2019-06-03 12:12',
      forms:"——全国人民代表大会常务委员会"
    },
    {
      path: '',
      name: '建设工程竣工验收消防设备案申请表',
      time: '2019-06-03 12:12',
      forms:"——全国人民代表大会常务委员会"
    },
    {
      path: '',
      name: '建设工程竣工验收消防设备案申请表',
      time: '2019-06-03 12:12',
      forms:"——全国人民代表大会常务委员会"
    },
    {
      path: '',
      name: '建设工程竣工验收消防设备案申请表',
      time: '2019-06-03 12:12',
      forms:"——全国人民代表大会常务委员会"
    },
    {
      path: '',
      name: '建设工程竣工验收消防设备案申请表',
      time: '2019-06-03 12:12',
      forms:"——全国人民代表大会常务委员会"
    },
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
