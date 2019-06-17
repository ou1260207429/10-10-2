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
  }
}
export default element
