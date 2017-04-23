import {GlobalConfiguration} from './global-configuration';

export class Usuario {        
    valorImovel: number;
    disponivel: number = 75000;
    prestacoes: number = 420;
    usaFGTS: boolean = true;
    nascimento: Date;
    renda: number = 4500;
    FGTS: number = 10000;
    crescimentoSalarial = 0.07;
    
    private _globalConfiguration : GlobalConfiguration;
    public get GlobalConfiguration() : GlobalConfiguration {
        return this._globalConfiguration;
    }
    public set GlobalConfiguration(v : GlobalConfiguration) {
        this._globalConfiguration = v;
    }    
}
