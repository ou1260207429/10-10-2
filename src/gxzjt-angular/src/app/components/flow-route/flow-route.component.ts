import { Component, OnInit, Input } from '@angular/core';

/**
 * 流程的路径模块
 */
@Component({
  selector: 'app-flow-route',
  templateUrl: './flow-route.component.html',
  
})
export class FlowRouteComponent implements OnInit {

  //路径的对象
  @Input() data: any;

  @Input() flowPathType:any
  constructor() { }

  ngOnInit() {
  }
  extraTemplate = "";
 
}
