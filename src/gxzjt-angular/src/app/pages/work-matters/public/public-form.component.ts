
import { FormBuilder, FormGroup } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
export class PublicFormComponent {


    proName = "";
    orgName = "";
    rangeTime: any;

    formResultData: any;




    isSearchForm = false;

    useSelect = false;
    //选择单位
    isOrgSearchLoading = false;
    orgList = [];
    selectedOrg: any;
    onSearchOrg(value: string): void {
        this.orgList = [
            {
                'value': 1,
                'text': value
            },
            {
                'value': 1,
                'text': value
            },
        ];
    }

    //选择工程
    isProSearchLoading = false;
    proList = [];
    selectedPro: any;
    onSearchPro(value: string): void {
        this.proList = [
            {
                'value': 1,
                'text': value
            },
            {
                'value': 1,
                'text': value
            },
        ];
    }


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
            proNo: [null],
            proName: [null],
            orgName: [null],
            dateRange: [[]],

        });

        var startTime = new Date();
        startTime.setDate(startTime.getDate() - 1)
        this.rangeTime = [startTime, new Date()];
    }
}
