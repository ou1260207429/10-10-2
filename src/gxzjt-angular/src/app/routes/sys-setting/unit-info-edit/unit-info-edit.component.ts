import { Component, OnInit, } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';

@Component({
  selector: 'app-sys-setting-unit-info-edit',
  templateUrl: './unit-info-edit.component.html',
})
export class SysSettingUnitInfoEditComponent implements OnInit {
  record: any = {};
  i: any;
  editmodel = {

  }
  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() {
    if (this.record)
      this.i = this.record;
    console.log(this.i.IsDiretor);
  }

  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

}
