import { CatalogContainer, CatalogHeaderContainer, ModalContent, ModalOverlay, PerfumeLayoutContainer, TagsContent } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PerfumeCard from "../../components/PerfumeCard";
import { useState, useEffect, useMemo } from "react";
import { TrashSimpleIcon, PencilSimpleIcon } from "@phosphor-icons/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

interface TokenPayload {
    user_role: string,
    public_id: number
}

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
    const [selectedPerfume, setSelectedPerfume] = useState<InterfacePerfume | null>(null);

    const token = localStorage.getItem('jwt_token');
    const API_URL = 'https://lorenci-perfumes-api.onrender.com/catalogo/';

    // useEffect Faz coisas depois que a tela termina de carregar, como buscar dados da internet.
    useEffect(() => {
        axios.get(API_URL).then(response => {
            setItems(response.data.message);
        }).catch(error => {
            toast.error("Erro no Axios", error.message);
        });
    }, []);

    const isAdmin = useMemo(() => {
        if (!token) return false;
        try {
            const decoded = jwtDecode<TokenPayload>(token);
            return decoded.user_role === 'admin';
        } catch {
            return false;
        }
    }, [token]);

    const handleOpenModal = (perfume: InterfacePerfume) => {
        setSelectedPerfume(perfume);
    };

    const handleCloseModal = () => {
        setSelectedPerfume(null);
    };

    const handleDeleteItem = async (id: number) => {
        const API_URL = `https://lorenci-perfumes-api.onrender.com/catalogo/deletar-perfume/${id}`;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                setItems(prevItems => prevItems.filter(item => item.id !== id))
                handleCloseModal();
                toast.success('Produto excluido com sucesso!')
            } else {
                const errorBody = await response.json();
                toast.error('Erro ao excluir produto:', errorBody);
            }

        } catch (error) {
            toast.error(`Erro na requisição: ${error}`);
        }
    }

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState<InterfacePerfume | null>(null);

    const handleUpdate = async () => {
        if (!editData) return;

        const API_URL = `https://lorenci-perfumes-api.onrender.com/catalogo/atualizar-perfume/${editData.id}`;
        const token = localStorage.getItem('jwt_token');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(editData)
            });

            // Atualiza a lista local para refletir a mudança sem dar F5
            setItems(prev => prev.map(item => item.id === editData.id ? editData : item));

            if (response.ok) {
                setSelectedPerfume(editData);
                setIsEditing(false);
                toast.success("Perfume atualizado com sucesso!");
            } else {
                const errorBody = await response.json();
                console.error(errorBody)
                toast.error('Erro ao atualizar produto:', errorBody);
            }
        } catch (error) {
            console.error("Erro ao atualizar:", error);
            toast.error("Erro ao salvar alterações.");
        }
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
            <ToastContainer position="bottom-center" autoClose={2000} />
            <Footer />

            {selectedPerfume && (
                <ModalOverlay onClick={() => { setIsEditing(false); handleCloseModal(); }}>
                    <ModalContent onClick={(e) => e.stopPropagation()}>
                        <div style={
                            {
                                position: 'absolute',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                gap: '15px',
                                marginBottom: '10px',
                                top: '20px',
                                right: '20px',
                            }
                        }>
                            {!isEditing && isAdmin ? (
                                <>
                                    <PencilSimpleIcon size={28} onClick={() => { setIsEditing(true); setEditData(selectedPerfume); }} style={{ color: 'orange' }} />
                                    <TrashSimpleIcon size={28} onClick={() => handleDeleteItem(selectedPerfume.id)} style={{ color: 'red' }} />
                                </>

                            ) : isAdmin ? (
                                <>
                                    <button onClick={handleUpdate} style={{ color: 'green', fontWeight: 'bold' }}>SALVAR</button>
                                    <button onClick={() => setIsEditing(false)} style={{ color: 'red' }}>CANCELAR</button>
                                </>
                            ) : (
                                <p></p>
                            )}
                        </div>

                        <img src={selectedPerfume.imagem_url} alt={selectedPerfume.perfume} />

                        {isEditing && isAdmin ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <input
                                    type="text"
                                    value={editData?.perfume}
                                    onChange={e => setEditData({ ...editData!, perfume: e.target.value })}
                                    placeholder="Nome do Perfume"
                                />
                                <input
                                    type="text"
                                    value={editData?.tipo}
                                    onChange={e => setEditData({ ...editData!, tipo: e.target.value })}
                                    placeholder="Tipo (EDP, EDT...)"
                                />
                                <input
                                    type="number"
                                    value={editData?.preco}
                                    onChange={e => setEditData({ ...editData!, preco: Number(e.target.value) })}
                                />
                                <input
                                    type="number"
                                    value={editData?.ml}
                                    onChange={e => setEditData({ ...editData!, ml: Number(e.target.value) })}
                                />
                                <input
                                    type="text"
                                    value={editData?.tags}
                                    onChange={e => setEditData({ ...editData!, tags: [e.target.value] })}
                                />
                            </div>
                        ) : (
                            <>
                                <h2>{selectedPerfume.perfume} {selectedPerfume.tipo}</h2>
                                <p>{selectedPerfume.ml} ml</p>
                                <p>{selectedPerfume.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                <TagsContent>
                                    {selectedPerfume.tags.map((tag, index) => (
                                        <p key={index}>{tag.trim()}</p>
                                    ))}
                                </TagsContent>
                            </>
                        )}
                    </ModalContent>
                </ModalOverlay >
            )
            }
        </>
    )
}