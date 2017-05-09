import {ProcessadorFinanciamento} from './processador-financiamento';
import {Financiamento} from './financiamento';
import {Investimento, Aluguel} from '../aluguel/aluguel';
import {Usuario} from '../usuario';
import {FinanciamentoConfigBuilder} from '../builders/financiamento-config-builder';
import {FgtsNasParcelas} from './fgts-nas-parcelas';
import {FgtsNoSaldoDevedor} from './fgts-no-saldo-devedor';
import {GlobalConfiguration} from '../global-configuration';

describe('processador financiamento', () => {
    
        let global = new GlobalConfiguration();
        let user = new Usuario();
        user.GlobalConfiguration = global;

        let fin = new Financiamento(150000, 0.005);
        let imovel = new Investimento(200000);
        let salario = new Aluguel(2);
        let fundo = new Investimento(user.FGTS);
        let builder = new FinanciamentoConfigBuilder();
        let config = builder.Build(user);
        config.FGTSConfig.Entrada = true;

    it('deve inicializar o extrato com fgts', () => {
        
        user.prestacoes = 1;
        user.usaFGTS = true;
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, user, config, fundo);
        processador.Processor = new FgtsNoSaldoDevedor(config.FGTSConfig);
        processador.Processar();

        let ext = processador.Extrato[0];
        expect(ext.Resgate).toBe(0);
        expect(ext.ValorImovel).toBe(user.valorImovel);
        expect(ext.SaldoAtual).toBe(user.valorImovel - user.disponivel - user.FGTS); 
        expect(ext.Parcela).toBeUndefined();
        expect(ext.CorrecaoTaxaReferencial).toBe(0);
        expect(ext.DepositoFgts).toBe(0);
        expect(ext.MontanteFgts).toBe(0);
        expect(ext.RendimentoFgts).toBe(0);
    });

    it('deve inicializar o extrato sem fgts', () => {

        user.prestacoes = 1;
        user.usaFGTS = false;
        user.valorImovel = 200000;
        user.disponivel = 75000;

        let processador = new ProcessadorFinanciamento(fin, imovel, salario, user, config, fundo);
        processador.Processor = new FgtsNoSaldoDevedor(config.FGTSConfig);
        processador.Processar();

        let ext = processador.Extrato[0];
        expect(ext.Resgate).toBe(0);
        expect(ext.ValorImovel).toBe(user.valorImovel);
        expect(ext.SaldoAtual).toBe(user.valorImovel - user.disponivel);        
        expect(ext.Parcela).toBeUndefined();
        expect(ext.CorrecaoTaxaReferencial).toBe(0);
        expect(ext.DepositoFgts).toBe(0);
        expect(ext.MontanteFgts).toBe(0);
        expect(ext.RendimentoFgts).toBe(0);
    });
    
    it('deve setar instancia de IProcessFgts', () => {
        let processador = new ProcessadorFinanciamento(null, null, null, null, null);
        processador.Processor = new FgtsNasParcelas();;

        expect(processador.Processor).toBeDefined();
    });

    it('deve chamar o metodo depositar do imovel', () => {
                
        user.prestacoes = 12;
        user.usaFGTS = false;

        spyOn(imovel, 'Depositar');
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, user, config);
        processador.Processor = new FgtsNoSaldoDevedor(config.FGTSConfig);
        processador.Processar();

        expect(imovel.Depositar).toHaveBeenCalledTimes(12);
    });

    it('deve chamar o metodo pagar do financiamento', () => {

        user.prestacoes = 12;
        user.usaFGTS = false;

        spyOn(fin, 'Pagar');
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, user, config);
        processador.Processor = new FgtsNoSaldoDevedor(config.FGTSConfig);
        processador.Processar();    

        expect(fin.Pagar).toHaveBeenCalledTimes(12);
    });

    it('deve chamar o metodo pagar do salario', () => {
        
        user.prestacoes = 12;
        user.usaFGTS = false;

        spyOn(salario, 'Pagar');
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, user, config);
        processador.Processor = new FgtsNoSaldoDevedor(config.FGTSConfig);
        processador.Processar();    

        expect(salario.Pagar).toHaveBeenCalledTimes(12);
    });

    it('deve chamar o metodo process do fgtsProcessor se o usuario usar fgts', () => {
        
        user.prestacoes = 12;
        user.usaFGTS = true;
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, user, config, fundo);
        let iProcessor = new FgtsNoSaldoDevedor(config.FGTSConfig); 
        processador.Processor = iProcessor;                
        spyOn(iProcessor, 'Process');
        processador.Processar();

        expect(iProcessor.Process).toHaveBeenCalledTimes(12);
    });

    xit('deve chamar o metodo depositar do fundo de garantia se o usuario usar fgts', () => {
        
        user.prestacoes = 12;
        user.usaFGTS = true;

        let processador = new ProcessadorFinanciamento(fin, imovel, salario, user, config, fundo);
        processador.Processor = new FgtsNoSaldoDevedor(config.FGTSConfig);  
        spyOn(fundo, 'Depositar');

        processador.Processar();

        expect(fundo.Depositar).toHaveBeenCalledTimes(12);
    });

    it('deve gerar o tamanho do extrato de acordo com as prestacoes do usuario', () => {
        
        user.prestacoes = 12;
        user.usaFGTS = false;

        let processador = new ProcessadorFinanciamento(fin, imovel, salario, user, config);
        processador.Processor = new FgtsNoSaldoDevedor(config.FGTSConfig);  

        processador.Processar();

        expect(processador.Extrato.length).toBe(13);
    });

    xit('deve preencher os campos do extrato', () => {
        
        user.prestacoes = 2;
        user.usaFGTS = false;
        
        let processador = new ProcessadorFinanciamento(fin, imovel, salario, user, config);
        processador.Processor = new FgtsNoSaldoDevedor(config.FGTSConfig);
        processador.Processar();

        let ext = processador.Extrato;
        expect(ext[1].Resgate).toBe(0);
        expect(ext[1].DepositoFgts).toBe(0);
        expect(ext[1].MontanteFgts).toBe(0);
        expect(ext[1].RendimentoFgts).toBe(0);
        
        expect(ext[1].ValorImovel).toBeGreaterThan(ext[0].ValorImovel);
        expect(ext[1].SaldoAtual).toBeLessThan(ext[0].SaldoAtual);        
        expect(ext[1].Parcela).toBeDefined();
        // expect(ext[1].CorrecaoTaxaReferencial).toBeGreaterThan(0);
    });
});