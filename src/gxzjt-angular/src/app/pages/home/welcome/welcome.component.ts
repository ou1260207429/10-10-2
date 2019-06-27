import { Component, OnInit, ViewChild } from '@angular/core';


import { MenuService } from '@delon/theme';

/**
 * 
 */
@Component({
  selector: 'sys-welcome',
  templateUrl: './welcome.html',
})
export class WelcomeComponent implements OnInit {

  constructor(
    private _MenuService: MenuService,
  ) {

  }

  ngOnInit() {
 
    this._MenuService.resume();
  }




}
