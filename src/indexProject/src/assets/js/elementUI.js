// 导入自己需要的组件
import {
  Row,
  Col,
  Button,
  Select,
  Option,
  OptionGroup,
  Input,
  Dialog,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Table,
  TableColumn,
  Form,
  FormItem,
  Cascader,
  DatePicker,
  Pagination
} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(OptionGroup)
    Vue.use(Input)
    Vue.use(Dialog)
    Vue.use(Row)
    Vue.use(Button)
    Vue.use(Col)
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Card)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Cascader)
    Vue.use(DatePicker)
    Vue.use(Pagination)


  }
}
export default element
