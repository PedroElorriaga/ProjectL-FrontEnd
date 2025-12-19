import type { InterfacePerfume } from "../../pages/Catalog";
import { PerfumeContainer } from "./style";
interface CardProps {
    item: InterfacePerfume;
    onCardClick: (perfume: InterfacePerfume) => void;
}

export default function PerfumeCard({ item, onCardClick }: CardProps) {
    return (
        <>
            {/* map Pega uma lista de coisas e a transforma em uma nova lista de coisas diferentes, uma por uma. */}
            <PerfumeContainer key={item.id} onClick={() => onCardClick(item)}>
                <img src={`${item.imagem_url}`} alt={`Imagem do ${item.perfume}`} />
                <p className="perfume">{item.perfume}</p>
                <p className="preco">{item.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
            </PerfumeContainer>
        </>
    );
}