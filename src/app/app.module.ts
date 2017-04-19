import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FinanciamentoComponent } from './financiamento/financiamento.component';
import { AluguelComponent } from './aluguel/aluguel.component';
import { ConsorcioComponent } from './consorcio/consorcio.component';
import { FormularioComponent } from './formulario/formulario.component';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { MainComponent } from './main/main.component';
import { TabelaVplComponent } from './tabela-vpl/tabela-vpl.component';
import { ResultadoComponent } from './resultado/resultado.component';
import { GraficoFinanciamento2Component } from './grafico-financiamento-2/grafico-financiamento-2.component';
import { FinanciamentoPropriedadesComponent } from './financiamento-propriedades/financiamento-propriedades.component';
import { Routes } from './models/routes';
import { ExtratoFgtsComponent } from './extrato-fgts/extrato-fgts.component';
import { FgtsComponent } from './fgts/fgts.component';
import { FinanciamentoSaveComponent } from './financiamento-save/financiamento-save.component';
import { FormularioAluguelComponent } from './aluguel/formulario-aluguel/formulario-aluguel.component';
import { ExtratoAluguelComponent } from './aluguel/extrato-aluguel/extrato-aluguel.component';
import { GraficoAluguelComponent } from './aluguel/grafico-aluguel/grafico-aluguel.component';

import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
    FormularioComponent,
    MenuSuperiorComponent,
    MainComponent,
    HomeComponent,
    FinanciamentoComponent,
    AluguelComponent,
    ConsorcioComponent,
    TabelaVplComponent,
    ResultadoComponent,
    GraficoFinanciamento2Component,
    FinanciamentoPropriedadesComponent,
    ExtratoFgtsComponent,
    FgtsComponent,
    FinanciamentoSaveComponent,
    FormularioAluguelComponent,
    ExtratoAluguelComponent,
    GraficoAluguelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(Routes),
    MyDatePickerModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
