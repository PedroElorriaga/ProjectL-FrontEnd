import { useEffect, useState } from "react";
import { PerfumeContainer } from "./style";
import axios from "axios";

interface InterfacePerfume {
    perfume: string;
    preco: number;
    ml: number;
    tags: string[];
    tipo: string;
}

export default function PerfumeCard() {
    const [items, setItems] = useState<InterfacePerfume[]>([])

    // useEffect Faz coisas depois que a tela termina de carregar, como buscar dados da internet.
    useEffect(() => {
        const API_URL = 'http://127.0.0.1:3000/catalogo/';

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
                <PerfumeContainer key={item.perfume}>
                    {item.perfume}
                    {item.preco}
                </PerfumeContainer>
            ))}
        </>
    )
}