import { Component, OnInit, Input } from '@angular/core';

import { Financiamento } from '../models/financiamento';
import { FinanciamentoFdc } from '../models/financiamento-fdc';

declare var cfx;

@Component({
  selector: 'app-grafico-financiamento-2',
  templateUrl: './grafico-financiamento-2.component.html',
  styleUrls: ['./grafico-financiamento-2.component.css']
})
export class GraficoFinanciamento2Component implements OnInit {
  
  constructor() {
    this.chart1 = new cfx.Chart(); 
   }
    opaopa: HTMLDivElement;
    chart1: any;
    teste: any;       

    ngOnInit() {
        this.loadChart();
    } 
    
    loadChart(): void
    {        
      this.chart1.getDataGrid().setVisible(true);
      this.PopulateProductSales(this.chart1);
      var titles = this.chart1.getTitles();
      var title = new cfx.TitleDockable();
      title.setText("Evolução do Patrimônio a Valor Presente");
      titles.add(title);
      this.chart1.getAxisY().getLabelsFormat().setFormat(cfx.AxisFormat.Currency);

      var opa = document.getElementById('oi');
      this.chart1.create(opa);
     }
	 
	PopulaComFinanciamento(chart1: any, financiamento: Financiamento) {
        var item = { "Month": "Jan", "Financiamento": 0 };
        var colecao = [];

        var intervalo = financiamento.Prestacoes.length/12;

        for(var i = 0; i< financiamento.Prestacoes.length; i++) {

        }
    }
    
    PopulateProductSales(chart1: any): void {
    var items = [{
        "Month": "Jan",
        "White": 12560,
    }, {
        "Month": "Feb",
        "White": 13400,
    }, {
        "Month": "Mar",
        "White": 16700,
    }, {
        "Month": "Apr",
        "White": 12000,
    }, {
        "Month": "May",
        "White": 15800,
    }, {
        "Month": "Jun",
        "White": 9800,
    }, {
        "Month": "Jul",
        "White": 17800,
    }, {
        "Month": "Aug",
        "White": 19800,
    }, {
        "Month": "Sep",
        "White": 23200,
    }, {
        "Month": "Oct",
        "White": 16700,
    }];

    chart1.setDataSource(items);
  }
}