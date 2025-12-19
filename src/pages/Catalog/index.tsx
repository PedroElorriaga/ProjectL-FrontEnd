import { CatalogContainer, CatalogHeaderContainer, ModalContent, ModalOverlay, PerfumeLayoutContainer } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PerfumeCard from "../../components/PerfumeCard";
import { useState, useEffect } from "react";
import axios from "axios";


export interface InterfacePerfume {
    id: number;
    perfume: string;
    preco: number;
    ml: number;
    tags: string[];
    tipo: string;
    imagem_url: string;
}

export default function Catalog() {
    const [items, setItems] = useState<InterfacePerfume[]>([]);
    // const navigate = useNavigate();
    const [selectedPerfume, setSelectedPerfume] = useState<InterfacePerfume | null>(null);

    // useEffect Faz coisas depois que a tela termina de carregar, como buscar dados da internet.
    useEffect(() => {
        const API_URL = 'https://lorenci-perfumes-api.onrender.com/catalogo/';

        axios.get(API_URL).then(response => {
            setItems(response.data.message);
        }).catch(error => {
            console.log("Erro no Axios", error.message);
        });
    }, []);

    // const handleCardClick = (perfumeId: number) => {
    //     navigate(`http://192.168.15.9:3000/catalogo/${perfumeId}`);
    // };

    const handleOpenModal = (perfume: InterfacePerfume) => {
        setSelectedPerfume(perfume);
    };

    const handleCloseModal = () => {
        setSelectedPerfume(null);
    };

    return (
        <>
            <Header />
            <CatalogContainer>
                <CatalogHeaderContainer>
                    PRODUTOS IMPORTADOS
                </CatalogHeaderContainer>
                <PerfumeLayoutContainer>
                    {items.map(item => (
                        <PerfumeCard key={item.id} item={item} onCardClick={handleOpenModal} />
                    ))}
                </PerfumeLayoutContainer>
            </CatalogContainer>
            <Footer />

            {selectedPerfume && (
                <ModalOverlay onClick={handleCloseModal}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <img
                            src={`${selectedPerfume.imagem_url}`}
                            alt={selectedPerfume.perfume}
                        />
                        <h2>{selectedPerfume.perfume} {selectedPerfume.tipo}</h2>
                        <p>{selectedPerfume.ml} ml</p>
                        <p>{selectedPerfume.tags}</p>
                        <p>{selectedPerfume.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    )
}