import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PublicServices } from 'services/public.services';
import { PANGBO_SERVICES_URL } from 'infrastructure/expression';

@Component({
  selector: 'app-tiny-editor',
  templateUrl: './tiny-editor.component.html',
  styles: []
})
export class TinyEditorComponent implements OnInit {

  constructor(private _publicServices: PublicServices, ) { }
  //从父页面传来的数据
  @Input() content: any
  @Input() params: any
  @Output() onEditorContentChange = new EventEmitter();
  editor;
  init = {
    //selector: '#textarea',  // change this value according to your HTML
    plugins: 'advlist autolink link image lists preview hr anchor pagebreak ' +
      'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime nonbreaking ' +
      'save table contextmenu directionality emoticons paste textcolor',
    toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | preview fullpage | forecolor backcolor emoticons',
    language_url: "../assets/langs/zh_CN.js",
    language: "zh_CN",
    width: '100%',
    height: 500,
    toolbar_drawer: 'sliding',   //工具栏太多，页面宽度太小时用省略号替代
    branding: false,
    menubar: true,
    // CONFIG: Paste
    paste_retain_style_properties: 'all',
    paste_word_valid_elements: '*[*]',        // word需要它
    paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
    paste_convert_word_fake_lists: false,     // 插入word文档需要该属性
    paste_webkit_styles: 'all',
    paste_merge_formats: true,
    nonbreaking_force_tab: false,
    paste_auto_cleanup_on_paste: false,

    // Image
    // imagetools_cors_hosts: ['mydomain.com', 'otherdomain.com'],
    // imagetools_credentials_hosts: ['192.168.100.66','192.168.100.60'],
    // imagetools_proxy: './static/tinymce/proxy.php',
    // imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
    image_caption: true,
    image_advtab: true,
    // images_upload_url: "http://222.84.250.158:8111/api/services/app/Attachment/EditorUploadFile",
    images_upload_url: PANGBO_SERVICES_URL,
    images_upload_base_path: PANGBO_SERVICES_URL,
    setup: editor => {
      this.editor = editor;
      editor.on('keyup change', () => {
        const content = editor.getContent();
        this.onEditorContentChange.emit(content);   // 通过keyup change事件将textarea 发送到父组件，可以自定义事件
      });
    },
    images_upload_handler: (blobInfo, success, failure) => {
      let formData = new FormData();
      formData.append("files", blobInfo.blob(), blobInfo.filename());
      this._publicServices.newUpload(formData, this.params).subscribe(data => {
        success(PANGBO_SERVICES_URL + data.data[0].localUrl);
      })
    },
    fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',  //字体大小
    font_formats: `
    微软雅黑=微软雅黑;
    宋体=宋体;
    黑体=黑体;
    仿宋=仿宋;
    楷体=楷体;
    隶书=隶书;
    幼圆=幼圆;
    Andale Mono=andale mono,times;
    Arial=arial, helvetica,
    sans-serif;
    Arial Black=arial black, avant garde;
    Book Antiqua=book antiqua,palatino;
    Comic Sans MS=comic sans ms,sans-serif;
    Courier New=courier new,courier;
    Georgia=georgia,palatino;
    Helvetica=helvetica;
    Impact=impact,chicago;
    Symbol=symbol;
    Tahoma=tahoma,arial,helvetica,sans-serif;
    Terminal=terminal,monaco;
    Times New Roman=times new roman,times;
    Trebuchet MS=trebuchet ms,geneva;
    Verdana=verdana,geneva;
    Webdings=webdings;
    Wingdings=wingdings,zapf dingbats`,
    style_formats: [  //行高设置
      {
        title: '行高',
        items: [
          { title: '0.5', styles: { 'line-height': '0.5' }, inline: 'span' },
          { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
          { title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span' },
          { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
          { title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span' },
          { title: '3', styles: { 'line-height': '3' }, inline: 'span' }
        ]
      }
    ],


  }
  ngOnInit() {
  }

}
