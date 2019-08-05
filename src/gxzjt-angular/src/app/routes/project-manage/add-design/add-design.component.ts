import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';


@Component({
  selector: 'app-project-manage-add-design',
  templateUrl: './add-design.component.html',
  styleUrls: ['../public/public.css'],
})
export class ProjectManageAddDesignComponent implements OnInit {


  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {

  }

}
