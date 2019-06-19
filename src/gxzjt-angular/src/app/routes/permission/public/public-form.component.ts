
import { FormBuilder, FormGroup } from '@angular/forms';
import { _HttpClient } from '@delon/theme';

// import {  ViewChild } from '@angular/core';

// import { UploadFileComponent} from "@shared/components/tranfile/uploadfile"

export class PublicFormComponent {

    
    // @ViewChild('upload1')
    // view1:UploadFileComponent
    // @ViewChild('upload1')
    // view2:UploadFileComponent

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
    needPagination = false
    //过滤菜单
    resetSearchFliterForm(): void {

        // console.log(this.view1.fileList);
        // console.log(this.view2.fileList);
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
