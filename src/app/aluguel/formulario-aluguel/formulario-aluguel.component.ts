import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import {Financiamento} from '../../models/financiamento-old/financiamento';
import {FinanciamentoService} from '../../services/financiamento-services';
import {IIdentifier} from '../../models/i-identifier';

@Component({
  selector: 'app-formulario-aluguel',
  templateUrl: './formulario-aluguel.component.html',
  providers: [FinanciamentoService]
})
export class FormularioAluguelComponent implements OnInit {

  private financiamentos: Array<IIdentifier>; 
  private financiamentoSelecionado: Financiamento = null;
  private aluguelInicial: number = 2200;
  private descricaoFinanciamento: string;

  @Output() sendFinanciamento = new EventEmitter<any>();
  
  constructor(private financiamentoService: FinanciamentoService) {}

  ngOnInit() {
      this.financiamentoService.BuscaTodos().then((financiamentos) => {
      this.financiamentos = financiamentos;
    })
  }

  private comparar(): void {
    this.sendFinanciamento.emit({fin: this.financiamentoSelecionado, aluguelInicial: this.aluguelInicial});
  }

  private onChangeFinanciamento(): void {
    if(this.financiamentoSelecionado) {
      this.descricaoFinanciamento = this.financiamentoSelecionado.Descricao;
    } else {
      this.descricaoFinanciamento = '';
    }
  }

  private isValid(): boolean {
    if(this.aluguelInicial > 0 && this.financiamentoSelecionado)
      return true;
  }
}