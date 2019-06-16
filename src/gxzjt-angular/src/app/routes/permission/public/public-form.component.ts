
import { FormBuilder, FormGroup } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
export class PublicFormComponent {
    treeCardTitle = "结构";
    treeData = [
        {
            title: 'parent 1',
            key: '100',
            expanded: true,
            children: [
                {
                    title: 'parent 1-0',
                    key: '1001',
                    expanded: true,
                    children: [
                        { title: 'leaf', key: '10010', isLeaf: true },
                        { title: 'leaf', key: '10011', isLeaf: true },
                        { title: 'leaf', key: '10012', isLeaf: true }
                    ]
                },

            ]
        }
    ];

    formResultData: any;

    pageSize = 50;


    isSearchForm = false;

    useSelect = false;

    searchInputs = [
        // {
        //     searchKey: "",
        //     formControlName: "",
        //     placeholder:""
        // }
    ];

    needAdd = false;
    needInport = false;
    needRxport = false;
    needTreeForm = false;
    needSingleForm = true;

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
            search: [null],


        });


    }

    add() { };
    inportXlsx() { };
}
