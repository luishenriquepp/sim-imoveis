import {Aluguel} from './aluguel';
import {Comparador} from './comparador';
import {Investimento} from './investimento';
import {GerenciadorDoExtrato} from './gerenciador-do-extrato';
import {ExtratoFinanciamentoBuilder} from '../builders/extrato-financiamento-builder';

describe('compara aluguel com financiamento', () => {    

    it('confere os dados de inicializacao do extrato', () => {
        let comparador: Comparador;
        let investimento = new Investimento(40000);
        let aluguel = new Aluguel(1000);
        let fgts = new Investimento(5000);
        let salario = new Aluguel(5000);
        let finInvestimento = new Investimento(5000);
        
        let builder = new ExtratoFinanciamentoBuilder();
        let ext = builder.Build(1);
        comparador = new Comparador(investimento, aluguel, ext, finInvestimento, salario, fgts);

        comparador.Processar();

        let extrato = comparador.Gerenciador.ExtratoAluguel[0];  
        
        expect(extrato.MontanteFGTS).toBe(5000);
        expect(extrato.MontanteInvestimento).toBe(40000);
        expect(extrato.Patrimonio()).toBe(40000+5000);
        expect(extrato.DepositoFGTS).toBe(0);
        expect(extrato.DepositoFundo).toBe(0);
        expect(extrato.RendimentoFGTS).toBe(0);
        expect(extrato.RendimentoFundo).toBe(0);
        expect(extrato.SaldoParcial()).toBe(0);
        expect(extrato.Aluguel).toBe(0);
    });

    it('confere os dados do primeiro mes do extrato', () => {
        let comparador: Comparador;
        let investimento = new Investimento(40000);
        let aluguel = new Aluguel(1000);
        let fgts = new Investimento(5000);
        let finInvestimento = new Investimento(5000);
        let salario = new Aluguel(2000);

        let builder = new ExtratoFinanciamentoBuilder();
        let ext = builder.Build(1);
        comparador = new Comparador(investimento, aluguel, ext, finInvestimento, salario, fgts);
        comparador.Processar();

        let extrato = comparador.Gerenciador.ExtratoAluguel[1];
        
        expect(extrato.RendimentoFundo).toBe(40000*0.005);
        // expect(extrato.DepositoFundo).toBe(40000*0.08);
        // expect(extrato.MontanteInvestimento).toBeCloseTo((40000*1.005)+800);
        expect(extrato.RendimentoFGTS).toBe(5000*0.005);
        expect(extrato.DepositoFGTS).toBe(2000*0.08);
        expect(extrato.MontanteFGTS).toBeCloseTo(5000*1.005+(2000*0.08));
        expect(extrato.Aluguel).toBe(1000);
        // expect(extrato.Patrimonio()).toBeCloseTo(((40000*1.005)+800)+(5000*1.005)+360);
    });

    xit('com fgts com aluguel mais alto que parcela desde o princípio', () => {
        let comparador: Comparador;
        let investimento = new Investimento();
        let aluguel = new Aluguel(2500);
        let fgts = new Investimento(0);
        
        comparador = new Comparador(investimento, aluguel, null, null, null, fgts);
        comparador.Processar();

        let extrato = comparador.Gerenciador.ExtratoAluguel[1];
        
        expect(extrato.RendimentoFundo).toBe(0);
        expect(extrato.DepositoFundo).toBe(0);
        expect(extrato.MontanteInvestimento).toBe(0);
        expect(extrato.Aluguel).toBe(2500);
        expect(extrato.Patrimonio()).toBe(360);
    });
    
    xit('com fgts com aluguel que fica mais caro que a parcela', () => {
        let comparador: Comparador;
        let investimento = new Investimento();
        let aluguel = new Aluguel(1000);
        let fgts = new Investimento(0);
        
        comparador = new Comparador(investimento, aluguel, null, null, null, fgts);
        comparador.Processar();

        let antes = comparador.Gerenciador.ExtratoAluguel[1];
        let depois = comparador.Gerenciador.ExtratoAluguel[2];
        
        expect(antes.Aluguel).toBe(1000);
        expect(antes.DepositoFundo).toBe(100);
        expect(antes.DepositoFinInvestimento).toBe(0);
        expect(antes.MontanteInvestimento).toBe(100);

        expect(depois.Aluguel).toBe(1000);
        expect(depois.DepositoFinInvestimento).toBe(1);
        expect(depois.DepositoFundo).toBe(0);
        expect(depois.MontanteFinInvestimento).toBe(1);
    });

    xit('sem fgts nao deve rodar investimento de fgts', () => {
        let comparador: Comparador;
        let investimento = new Investimento();
        let aluguel = new Aluguel(2500);

        comparador = new Comparador(investimento, aluguel, null, null, null);
        comparador.Processar();

        let init = comparador.Gerenciador.ExtratoAluguel[0];
        let extrato = comparador.Gerenciador.ExtratoAluguel[1];

        expect(init.MontanteFGTS).toBe(0);
        expect(extrato.DepositoFGTS).toBe(0);
        expect(extrato.RendimentoFGTS).toBe(0);
        expect(extrato.MontanteFGTS).toBe(0);
    });

    xit('com fgts nas parcelas', () => {
        expect(0).toBeNaN();
    });

    xit('com fgts no saldo devedor', () => {
        expect(0).toBeNaN();
    });

    xit('sem fgts de 120 meses deve checar os valores do ultimo mes', () => {
        expect(0).toBeNaN();
    });

    xit('deve incluir o valor patrimonial do financiamento', () => {
        let comparador: Comparador;
        let investimento = new Investimento(20000);
        let aluguel = new Aluguel(2000);

        comparador = new Comparador(investimento, aluguel, null, null, null);
        comparador.Processar();

        let init = comparador.Gerenciador.ExtratoAluguel[0];
        let extrato = comparador.Gerenciador.ExtratoAluguel[1];

        expect(init.PatrimonioFinanciamento).toBe(100000);
        expect(extrato.PatrimonioFinanciamento).toBe(100100);
        expect(extrato.PatrimonioFinTotal()).toBe(100300);
        expect(extrato.RendimentoFinInvestimento).toBe(0);
    })
});