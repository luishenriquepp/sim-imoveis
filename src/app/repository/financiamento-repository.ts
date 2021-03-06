import {AdvancedProperties} from '../models/financiamento/advanced-properties';
import {AdvancedPropertiesBuilder} from '../models/builders/advanced-properties-builder';

export class FinanciamentoRepository {
        
    private static builder = new AdvancedPropertiesBuilder();
    
    private static financiamentos: Array<AdvancedProperties> = [
        FinanciamentoRepository.builder.RichWithFgtsSaldoDevedor(), 
        FinanciamentoRepository.builder.RichWithFgtsNaoUsarMais(),
        FinanciamentoRepository.builder.RichWithoutFgts(),
        FinanciamentoRepository.builder.MediumWithFgtsSaldoDevedor(),
        FinanciamentoRepository.builder.MediumWithoutFgts(),
        FinanciamentoRepository.builder.PoorWithFgtsParcelas(),
        FinanciamentoRepository.builder.PoorWithFgtsDevedor()
    ];
    private static counter: number = 7;

    public Buscar(id: number): AdvancedProperties {
        return FinanciamentoRepository.financiamentos.find(t => t.Id == id);
    }

    public BuscaTodos(): Array<AdvancedProperties> {
        return FinanciamentoRepository.financiamentos;
    }

    public Adiciona(financiamento: AdvancedProperties) {
        FinanciamentoRepository.counter++;
        financiamento.Id = FinanciamentoRepository.counter;
        FinanciamentoRepository.financiamentos.push(financiamento);
    }    
}