import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-user-center-modify-psw',
  templateUrl: './modify-psw.component.html',
  styleUrls: ['./modify-psw.component.less']
})
export class UserCenterModifyPswComponent implements OnInit {

  constructor(private http: _HttpClient, private modal: ModalHelper) { }
  modifying = false;
  ngOnInit() { }

  model: {
    OldPassword: "",
    Password: "",
    ConfirmPassword: "",
  };
  modify() {

  }
}
