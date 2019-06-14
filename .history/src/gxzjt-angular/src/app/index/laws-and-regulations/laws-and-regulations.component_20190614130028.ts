import { Component, OnInit } from '@angular/core';
import { HomeServiceProxy, PageSize } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-laws-and-regulations',
  templateUrl: './laws-and-regulations.component.html',
  styleUrls: ['./laws-and-regulations.less']
})
export class LawsAndRegulationsComponent implements OnInit {
  record: any = {};
  i: any;
  router: any;

  constructor(private _homeService: HomeServiceProxy) { }
  currentIndex = 0;

  lawsList;
  lawsFiles;
  pageSize: PageSize = new PageSize();
  ngOnInit(): void {
    this.init()
  }
  init() {
    this.pageSize.page = 1;
    this.pageSize.size = 10;
    let params1 = this.pageSize;
    let params2 = this.pageSize;

    params1.group ="Regulation";
    params2.group ="Normative";

    this._homeService.homeRegulationList(params1).subscribe(data => {
      this.lawsList = data.data;
      console.log(this.lawsList);
    })
    this._homeService.homeRegulationList(params2).subscribe(data => {
      this.lawsList = data.data;
      console.log(this.lawsList);
    })
  }

  close() { }


  /**
   * 跳转进表单列表页
   */
  goFromList(item) {
    this.router.navigate(item.path);
  }

}
