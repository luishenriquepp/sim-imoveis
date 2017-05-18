import {ExtratoAluguel} from './extrato-aluguel';
import {ExtratoInvestimento} from './extrato-investimento';
import {ExtratoFinanciamento} from '../financiamento/extrato-financiamento';
import {Investimento} from './investimento';
import {Aluguel} from './aluguel';
import {GerenciadorDoExtrato} from './gerenciador-do-extrato';

export class Comparador {
    private readonly _aluguel: Aluguel;
    private readonly _investimento: Investimento;
    private readonly _fundoFGTS: Investimento;
    private readonly _finInvestimento: Investimento;
    private readonly _extratoFinanciamento: Array<ExtratoFinanciamento>;
    private readonly _salario: Aluguel;

    public Gerenciador: GerenciadorDoExtrato = new GerenciadorDoExtrato();

    constructor(
        investimento: Investimento, 
        aluguel: Aluguel, 
        extrato: Array<ExtratoFinanciamento>,
        investimentoFinanciamento: Investimento,
        salario: Aluguel, 
        fundoFGTS: Investimento = null) {
            this._investimento = investimento;
            this._aluguel = aluguel;
            this._extratoFinanciamento = extrato;
            this._fundoFGTS = fundoFGTS;
            this._salario = salario;
            this._finInvestimento = investimentoFinanciamento;
    }
        
    public Processar(): void {
        this.inicializar();
        for(let i=1;i<this._extratoFinanciamento.length;i++) {
            
            let fdc = this._extratoFinanciamento[i];
            this._aluguel.Pagar();
            this._salario.Pagar();
                                
            let valor = fdc.Parcela.Parcela() - this._aluguel.PrestacaoAluguel;

            let extInvestimento: ExtratoInvestimento;
            let extFinInvestimento: ExtratoInvestimento;

            // deposita a diferenca entre parcela e aluguel num fundo do aluguel enquanto for positivo
            // caso contrario, deposita a diferença positiva num fundo associado ao financiamento
            if(valor > 0) {
                extInvestimento = this._investimento.Depositar(valor);
                extFinInvestimento = this._finInvestimento.Depositar();
            } else {
                extInvestimento = this._investimento.Depositar();
                extFinInvestimento = this._finInvestimento.Depositar(valor*-1);
            }

            let extratoAluguel = new ExtratoAluguel();
            
            extratoAluguel.Aluguel = this._aluguel.PrestacaoAluguel;            
            extratoAluguel.RendimentoFundo = extInvestimento.Rendimento;
            extratoAluguel.MontanteInvestimento = this._investimento.ValorAcumulado;
            extratoAluguel.DepositoFundo = extInvestimento.Deposito;
            
            if(this._fundoFGTS) {
                let extFGTS = this._fundoFGTS.Depositar(this._salario.PrestacaoAluguel * 0.08);
                extratoAluguel.RendimentoFGTS = extFGTS.Rendimento;
                extratoAluguel.DepositoFGTS = extFGTS.Deposito;
                extratoAluguel.MontanteFGTS = this._fundoFGTS.ValorAcumulado;
            }
            
            extratoAluguel.PatrimonioFinanciamento = fdc.PatrimonioTotal();
            extratoAluguel.RendimentoFinInvestimento = extFinInvestimento.Rendimento;
            extratoAluguel.MontanteFinInvestimento = this._finInvestimento.ValorAcumulado;
            extratoAluguel.DepositoFinInvestimento = extFinInvestimento.Deposito;
            extratoAluguel.Parcela = fdc.Parcela.Parcela();
            
            this.Gerenciador.Adicionar(extratoAluguel);
        }
    }

    private inicializar(): void {
        let extratoAluguel = new ExtratoAluguel();
        if(this._fundoFGTS) {
            extratoAluguel.MontanteFGTS = this._fundoFGTS.ValorAcumulado;
        }
        extratoAluguel.PatrimonioFinanciamento = this._extratoFinanciamento[0].PatrimonioTotal();
        extratoAluguel.MontanteInvestimento = this._investimento.ValorAcumulado;
        this.Gerenciador.Adicionar(extratoAluguel);
    }

    public ExtratoFinanciamento(): Array<ExtratoFinanciamento> {
        return this._extratoFinanciamento;
    }
}