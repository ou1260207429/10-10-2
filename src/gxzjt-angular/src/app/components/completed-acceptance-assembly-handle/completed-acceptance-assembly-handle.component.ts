import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ArchitectureTypeEnum, OptionsEnum, RefractoryEnum } from 'infrastructure/expression';
import { objDeleteType, genID } from 'infrastructure/regular-expression';
import { PublicModel } from 'infrastructure/public-model';
import { UploadFile } from 'ng-zorro-antd';
import { PublicServices } from 'services/public.services';

/**
 * 消竣工验收的表单模块的办理或者结果
 */
@Component({
  selector: 'app-completed-acceptance-assembly-handle',
  templateUrl: './completed-acceptance-assembly-handle.component.html',
  styles: []
})
export class CompletedAcceptanceAssemblyHandleComponent implements OnInit {

  //0是受理凭证  1是合格  2是不合格
  @Input() type = 0

  //从父页面传来的数据
  @Input() data: any
  
  constructor() { }

  ngOnInit() {
  }

}
