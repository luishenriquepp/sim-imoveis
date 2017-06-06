import { Component, OnInit } from '@angular/core';

import {Usuario} from '../models/usuario';
import {FinanciamentoConfig} from'../models/financiamento-config';
import {FinanciamentoFgtsConfig} from '../models/financiamento-fgts-config';
import {ConfigurationService} from '../services/configuration-service';
import {FinanciamentoProcessorService} from '../services/financiamento-processor-service';
import {ExtratoFinanciamento} from '../models/financiamento/extrato-financiamento';
import {AdvancedProperties} from '../models/financiamento/advanced-properties';
import {Posterior} from '../models/financiamento-fgts-config';
import {GlobalConfiguration} from '../models/global-configuration';

@Component({
  selector: 'app-financiamento',
  templateUrl: './financiamento.component.html',
  styleUrls: ['./financiamento.component.css'],
  providers: [ConfigurationService, FinanciamentoProcessorService]
})
export class FinanciamentoComponent {
  
  private properties: AdvancedProperties;
  private usuario: Usuario;
  private fgtsConfig: FinanciamentoFgtsConfig;
  private financiamentoConfig: FinanciamentoConfig;
  private calculado: boolean;
  private fgts: boolean;
  private isUsingFgts: boolean;
  private posterior: Posterior = Posterior.NaoUsar;
  private configuration: GlobalConfiguration;
  private selected: string = 'r'

  private extrato: Array<ExtratoFinanciamento> = [];

  constructor(private processorService: FinanciamentoProcessorService) {
    this.usuario = new Usuario();
    this.fgtsConfig = new FinanciamentoFgtsConfig();
    this.financiamentoConfig = new FinanciamentoConfig();
    this.configuration = new GlobalConfiguration();
    
    this.properties = new AdvancedProperties(this.usuario, this.financiamentoConfig, this.fgtsConfig, null);
    this.properties.GlobalConfiguration = this.configuration;  
  }
  onCalcular(user: Usuario) {
    Object.assign(this.usuario, user);
    this.extrato = this.processorService.Process(this.properties);    
    this.isUsingFgts = this.properties.UsaFgts();
    this.posterior = this.properties.Posterior();
    this.calculado = true;
    this.selected = 'r';
  }
  onFgts(fgts: boolean) {
    this.usuario.usaFGTS = fgts;
  }

  private changeScreen(value: string) {
    this.selected = value;
  }
}