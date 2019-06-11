import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlowServices } from 'services/flow.services';
/**
 * 已办流程的详情
 */
@Component({
  selector: 'app-already-done-details',
  templateUrl: './already-done-details.component.html',
})
export class AlreadyDoneDetailsComponent implements OnInit {

  workFlow_Instance_Id;

  data;
  constructor(private _flowServices: FlowServices, private _activatedRoute: ActivatedRoute, ) {
    this.workFlow_Instance_Id = parseInt(this._activatedRoute.snapshot.paramMap.get('workFlow_Instance_Id'));
  }

  ngOnInit() {
    this._flowServices.getWorkFlow_NodeRecordAndAuditorRecords(this.workFlow_Instance_Id).subscribe(data => {
      this.data = data.result
    })
  }



}
