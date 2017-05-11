import { Component, Input } from '@angular/core';

import {ExtratoFinanciamento} from '../../models/financiamento/extrato-financiamento';

@Component({
  selector: 'app-extrato-fgts',
  templateUrl: './extrato-fgts.component.html'
})
export class ExtratoFgtsComponent {

  @Input() extrato: Array<ExtratoFinanciamento>;
  
}
