import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Financiamento } from '../models/financiamento';
import { FinanciamentoFdc } from '../models/financiamento-fdc';

declare var cfx;

@Component({
  selector: 'app-grafico-financiamento-2',
  templateUrl: './grafico-financiamento-2.component.html',
  styleUrls: ['./grafico-financiamento-2.component.css']
})
export class GraficoFinanciamento2Component implements OnInit, OnChanges {
  
  @Input() financiamento: Financiamento;
  
  constructor() {
    this.chart1 = new cfx.Chart(); 
   }
    opaopa: HTMLDivElement;
    chart1: any;    

    ngOnInit() {
        this.loadChart();
    }

    ngOnChanges() {
        this.PopulaComFinanciamento();
    }
    
    loadChart(): void {
      var titles = this.chart1.getTitles();
      var title = new cfx.TitleDockable();
      title.setText("Evolução do Patrimônio a Valor Presente");
      titles.add(title);
      this.chart1.getAxisY().getLabelsFormat().setFormat(cfx.AxisFormat.Currency);

      var opa = document.getElementById('oi');
      this.chart1.create(opa);
     }
	 
	PopulaComFinanciamento(): void {
        let items = [];
        for(var i=1;i<this.financiamento.Prestacoes.length;i++) {
            items.push({ "Fin": this.financiamento.Prestacoes[i].vpVariacao });
        }
        this.chart1.setDataSource(items);
    }
}
