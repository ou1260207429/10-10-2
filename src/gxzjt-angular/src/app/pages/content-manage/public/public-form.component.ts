
import { FormBuilder, FormGroup } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
export class PublicFormComponent {


    searchHolder = "";
    searchKey = "";

    rangeTime: any;

    formResultData: any;

    pageSize = 50;


    isSearchForm = false;

    useSelect = false;



    //过滤菜单
    resetSearchFliterForm(): void {
        this.fliterForm.reset();
    }

    hiddenFliter = false;
    fliterForm: FormGroup;
    formBuilder;
    switchFilter() {
        this.hiddenFliter = !this.hiddenFliter;
    }

    constructor() {
        this.formBuilder = new FormBuilder();
        this.fliterForm = this.formBuilder.group({
            pro_no: [null],
            pro_name: [null],
            org_name: [null],
            date_range: [[]],

        });

        this.resetTime();
    }

    resetTime() {
        var startTime = new Date();
        startTime.setDate(startTime.getDate() - 1)
        this.rangeTime = [startTime, new Date()];
    }
}
