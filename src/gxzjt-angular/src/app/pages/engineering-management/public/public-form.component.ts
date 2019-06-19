
import { FormBuilder, FormGroup } from '@angular/forms';
import { _HttpClient } from '@delon/theme';
export class PublicFormComponent {
    hiddenFliter;
    switchFilter() {
        this.hiddenFliter = !this.hiddenFliter;
    }

}
