import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-module',
  templateUrl: './form-module.component.html',
  styleUrls: ['./form-module.component.less']
})
export class FormModuleComponent implements OnInit {
  checked=false;
  constructor() { }
  
  //特殊建设工程列表
listArr=[
  {
    value:"",
  title:"建筑总面积大于500平方米",
  arr:[{
    name:"歌舞厅",
    checked:false
  },{
    name:"歌舞厅",
    checked:false,
    value:"歌舞厅"

  },{
    name:"歌舞厅",
    checked:false,
    value:"1"
  },{
    name:"歌舞厅",
    checked:false,
    value:"2"
  },{
    name:"歌舞厅",
    checked:false,
    value:"13"
  },{
    name:"歌舞厅",
    checked:false,
    value:"14"
  },{
    name:"歌舞厅",
    checked:false,
    value:"15"
  },{
    name:"歌舞厅",
    checked:false,
    value:"16"
  },{
    name:"歌舞厅",
    checked:false,
    value:"17"
  },{
    name:"歌舞厅",
    checked:false,
    value:"18"
  },{
    name:"歌舞厅",
    checked:false,
    value:"19"
  },{
    name:"歌舞厅",
    checked:false,
    value:"110"
  },{
    name:"歌舞厅",
    checked:false,
    value:"11"
  },{
    name:"歌舞厅",
    checked:false,
    value:"122"
  }]
},{
  value:"",
  title:"建筑总面积大于500平方米",
  arr:[{
    name:"歌舞厅",
    checked:false,
    value:"歌舞厅"
  },{
    name:"歌舞厅",
    checked:false,
    value:"144"
  },{
    name:"歌舞厅",
    checked:false,
    value:"111"
  },{
    name:"歌舞厅",
    checked:false,
    value:"133"
  },{
    name:"歌舞厅",
    checked:false,
    value:"155"
  },{
    name:"歌舞厅",
    checked:false,
    value:"166"
  },{
    name:"歌舞厅",
    checked:false,
    value:"77"
  },{
    name:"歌舞厅",
    checked:false,
    value:"188"
  },{
    name:"歌舞厅",
    checked:false,
    value:"199"
  },{
    name:"歌舞厅",
    checked:false,
    value:"177"
  },{
    name:"歌舞厅",
    checked:false,
    value:"166"
  },{
    name:"歌舞厅",
    checked:false,
    value:"188"
  },{
    name:"歌舞厅",
    checked:false,
    value:"1979"
  },{
    name:"歌舞厅",
    checked:false,
    value:"1555"
  }]
}]
 //类别
 radiotype="A";
 checkOptionsOne={
   isAllChecked:false,
   data:[
    { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
    { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
  ]
 }
checkOptionsTwo = {
  isAllChecked:false,
  data:[
    { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
    { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
  ]
};
checkOptionsThree = {
  isAllChecked:false,
  data:[
    { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
    { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
  ]
};
checkOptionsFour = {
  isAllChecked:false,
  data:[
  { label: '润健股份有限公司——润健创研院大楼', value: 'Apple', checked: false },
  { label: '润健股份有限公司——润健创研院大楼', value: 'Pear', checked: false },
]};
ngOnInit() {
  }
  checkAll(name){
    let objList = this[name];
    objList.isAllChecked=!objList.isAllChecked;
      objList.data.map(item=>{
        if(objList.isAllChecked){
        item.checked=true;
    }else{
      item.checked=false;

    }

      })
    
  }
}
