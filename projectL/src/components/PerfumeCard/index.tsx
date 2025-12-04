import { useEffect, useState } from "react";
import { PerfumeContainer } from "./style";
import axios from "axios";

interface InterfacePerfume {
    id: number;
    perfume: string;
    preco: number;
    ml: number;
    tags: string[];
    tipo: string;
    imagem_url: string;
}

export default function PerfumeCard() {
    const [items, setItems] = useState<InterfacePerfume[]>([])

    // useEffect Faz coisas depois que a tela termina de carregar, como buscar dados da internet.
    useEffect(() => {
        const API_URL = 'http://192.168.15.9:3000/catalogo/';

        axios.get(API_URL).then(response => {
            setItems(response.data.message);
        }).catch(error => {
            console.log("Erro no Axios", error.message)
        });
    }, []);


    return (
        <>
            {/* map Pega uma lista de coisas e a transforma em uma nova lista de coisas diferentes, uma por uma. */}
            {items.map(item => (
                <PerfumeContainer key={item.id}>
                    <img src={`http://192.168.15.9:3000/static/perfumes/${item.imagem_url}`} alt={`Imagem do ${item.perfume}`} />
                    <p>{item.perfume}</p>
                </PerfumeContainer>
            ))}
        </>
    )
}