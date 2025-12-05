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
                <img src={`http://192.168.15.9:3000/static/perfumes/${item.imagem_url}`} alt={`Imagem do ${item.perfume}`} />
                <p className="perfume">{item.perfume}</p>
                <p className="preco">R$ {item.preco.toFixed(2)}</p>
            </PerfumeContainer>
        </>
    );
}