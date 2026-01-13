import {
    CatalogContainer,
    CatalogHeaderContainer,
    ModalContent,
    ModalOverlay,
    PerfumeLayoutContainer,
    TagsContent,
    FilterBar,
    EditModalDiv
} from "./styles";
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
    preco: number | string;
    ml: number | string;
    tags: string[];
    tipo: string;
    imagem_url: string;
}

export default function Catalog() {
    const [items, setItems] = useState<InterfacePerfume[]>([]);
    const [selectedPerfume, setSelectedPerfume] = useState<InterfacePerfume | null>(null);
    const [filters, setFilters] = useState({
        perfume: '',
        tipo: '',
        tags: ''
    });

    const token = localStorage.getItem('jwt_token');
    const API_URL = `${import.meta.env.VITE_API_URL}/catalogo/`;

    const fetchItems = async () => {
        try {
            // O Axios aceita um objeto 'params' que ele converte em Query Strings
            const response = await axios.get(API_URL, {
                params: {
                    perfume: filters.perfume || undefined,
                    tipo: filters.tipo || undefined,
                    tags: filters.tags || undefined
                }
            });
            setItems(response.data.message);
        } catch (error) {
            toast.error(`Erro ao buscar dados ${error}`);
        }
    };

    // useEffect Faz coisas depois que a tela termina de carregar, como buscar dados da internet.
    useEffect(() => {

        fetchItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

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
        const API_URL = `${import.meta.env.VITE_API_URL}/catalogo/deletar-perfume/${id}`;

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

        const API_URL = `${import.meta.env.VITE_API_URL}/catalogo/atualizar-perfume/${editData.id}`;
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
            toast.error(`Erro ao salvar alterações ${error}`);
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
                <FilterBar>
                    <input
                        placeholder="Buscar perfume..."
                        onChange={(e) => setFilters({ ...filters, perfume: e.target.value.toLowerCase() })}
                    />

                    <div className="selects">
                        {/* <select onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}>
                            <option value="">Todos os Tipos</option>
                            <option value="edt">EDT</option>
                            <option value="edp">EDP</option>
                        </select> */}
                        <select onChange={(e) => setFilters({ ...filters, tags: e.target.value.toLowerCase() })}>
                            <option value="">Gênero (Todos)</option>
                            <option value="masculino">Masculino</option>
                            <option value="feminino">Feminino</option>
                            <option value="compartilhável">Compartilhável</option>
                        </select>
                    </div>
                </FilterBar>
                <PerfumeLayoutContainer>
                    {items && items.map(item => (
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
                            <EditModalDiv>
                                <h3>Perfume</h3>
                                <input
                                    type="text"
                                    value={editData?.perfume}
                                    onChange={e => setEditData({ ...editData!, perfume: e.target.value })}
                                    placeholder="Nome do Perfume"
                                    required
                                />
                                <h3>Tipo</h3>
                                <input
                                    type="text"
                                    value={editData?.tipo}
                                    onChange={e => setEditData({ ...editData!, tipo: e.target.value })}
                                    placeholder="Tipo (EDP, EDT...)"
                                    required
                                />
                                <h3>Preço</h3>
                                <input
                                    type="number"
                                    value={editData?.preco}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setEditData({
                                            ...editData!,
                                            preco: val === "" ? "" : Number(val)
                                        });
                                    }}
                                    placeholder="Preço"
                                    required
                                />
                                <h3>ML</h3>
                                <input
                                    type="number"
                                    value={editData?.ml}
                                    onChange={e => {
                                        const val = e.target.value;
                                        setEditData({
                                            ...editData!,
                                            ml: val === "" ? "" : Number(val)
                                        });
                                    }}
                                    placeholder="ML"
                                    required
                                />
                                <h3>Tags</h3>
                                <input
                                    type="text"
                                    value={editData?.tags}
                                    onChange={e => setEditData({ ...editData!, tags: [e.target.value] })}
                                    required
                                />
                            </EditModalDiv>
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