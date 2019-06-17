import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PublicModel } from 'infrastructure/public-model';
import { timeTrans } from 'infrastructure/regular-expression';
import { NzMessageService } from 'ng-zorro-antd';
import { EventEmiter } from 'infrastructure/eventEmiter';

@Component({
  selector: 'app-form-download-detail',
  templateUrl: './form-download-detail.component.html',
  styles: []
})
export class FormDownloadDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
