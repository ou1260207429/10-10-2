import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-home-index',
  templateUrl: './index.component.html',
})
export class HomeIndexComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(public http: _HttpClient) { }

  ngOnInit(): void { }

  close() {

  }
}
