import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { UserRightService } from '../userright.service';
import { NzDropdownService, NzMenuItemDirective, NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-userright-orgedit',
  templateUrl: './orgedit.component.html',
  styleUrls: ['./orgedit.component.less']
})
export class UserrightOrgeditComponent implements OnInit {
  dropdown;
  nodes;
  orgarray = []


  constructor(private http: _HttpClient,
    private nzDropdownService: NzDropdownService,
    private modal: ModalHelper,
    private message: NzMessageService,
    private UserRightService: UserRightService) { }

  ngOnInit() {
    this.getTreeData();
  }

  add() {

  }
  getTreeData() {
    this.UserRightService.GetTreeData().subscribe(
      res => {
        this.nodes = res.data;
        console.log(this, this.nodes)
      },
    );
  }
  // 创建右键菜单和关闭右键菜单的代码
  contextMenu($event: MouseEvent, template: TemplateRef<void>): void {
    // console.log(event);
    // console.log(template);
    this.dropdown = this.nzDropdownService.create($event, template);
  }

  close(e: NzMenuItemDirective): void {
    this.dropdown.close();
  }

  nzEvent(event: NzFormatEmitEvent): void {
    //  console.log(event.keys)
    this.nodes.forEach(element => {
      if (element.key == event.keys[0]) {
        this.orgarray = element.children;

      } else {
        element.children.forEach(city => {
          if (city.key == event.keys[0]) {
            this.orgarray = city.children;

          } else {
            city.children.forEach(conuty => {
              if (conuty.key == event.keys[0]) {
                this.orgarray = conuty.children;

              } else {
                conuty.children.forEach(xz => {
                  if (xz.key == event.keys[0]) {
                    this.orgarray = [];
                  }

                });

              }
            });
          }

        });
      }

    });

    if (this.orgarray.length == 0) {
      this.message.warning("已无下级组织");
    }

  }

  log(value: string[]): void {
    // console.log(value);
  }

  defaultCheckedKeys;

  deleteData() {

  }
}
