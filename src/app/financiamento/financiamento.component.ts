import { Component, OnInit } from '@angular/core';

import { Usuario } from '../models/usuario';
import { Financiamento } from'../models/financiamento';
import { FinanciamentoConfig } from'../models/financiamento-config';
import { FinanciamentoFgtsConfig } from '../models/financiamento-fgts-config';
import { FinanciamentoFactory } from '../utils/financiamento-factory';
import {GlobalConfiguration} from '../models/global-configuration';
import {ConfigurationService} from '../services/configuration-service';

@Component({
  selector: 'app-financiamento',
  templateUrl: './financiamento.component.html',
  styleUrls: ['./financiamento.component.css'],
  providers: [ConfigurationService]
})
export class FinanciamentoComponent {
  
  usuario: Usuario;
  financiamento: Financiamento;
  fgtsConfig: FinanciamentoFgtsConfig;
  financiamentoConfig: FinanciamentoConfig;
  avancado: boolean;
  fluxoDeCaixa: boolean;
  resultado: boolean;
  calculado: boolean;
  fgts: boolean;
  saveScreen: boolean;
  private globalConfiguration: GlobalConfiguration;

  constructor(private configurationService: ConfigurationService) {
    this.usuario = new Usuario();
    this.fgtsConfig = new FinanciamentoFgtsConfig();
    this.financiamentoConfig = new FinanciamentoConfig(this.fgtsConfig);
    this.resultado = false;
    this.fluxoDeCaixa = false;
    this.avancado = false;
    this.calculado = false;
    this.fgts = false;
    this.saveScreen = false;
    this.globalConfiguration = this.configurationService.Busca();
  }
  onCalcular(user: Usuario) {
    this.fgts = false;
    this.avancado = false;
    this.fluxoDeCaixa = false;
    user.FGTS = this.usuario.FGTS;
    user.crescimentoSalarial = this.usuario.crescimentoSalarial;
    this.usuario = user;
    this.usuario.GlobalConfiguration = this.globalConfiguration;
    let factory = new FinanciamentoFactory(this.usuario, this.financiamentoConfig);
    this.financiamento = factory.Create();
    this.financiamento.FluxoDeCaixa();
    this.calculado = true;
    this.resultado = true;
  }
  onFgts(fgts: boolean) {
    this.usuario.usaFGTS = fgts;
  }
  exibeFluxoDeCaixa(): void {
    this.fgts = false;
    this.avancado = false;
    this.resultado = false;
    this.saveScreen = false;
    this.fluxoDeCaixa = true;
  }
  exibeResultado(): void {
    this.fgts = false;
    this.avancado = false;
    this.fluxoDeCaixa = false;
    this.saveScreen = false;
    this.resultado = true;
  }
  exibeAvancado(): void {
    this.fgts = false;
    this.fluxoDeCaixa = false;
    this.resultado = false;
    this.saveScreen = false;
    this.avancado = true;
  }
  exibeExtrato(): void {
    this.fluxoDeCaixa = false;
    this.resultado = false;
    this.avancado = false;
    this.fgts = true;
    this.saveScreen = false;
  }
  exibeSaveScreen(): void {
    this.fluxoDeCaixa = false;
    this.resultado = false;
    this.avancado = false;
    this.fgts = false;
    this.saveScreen = true;
  }
}