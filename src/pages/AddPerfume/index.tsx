import { CatalogContainer, FormAddPerfumeContainer, PerfumeLabelDiv } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function AddPerfume() {
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        const fileInput = form['imagem_perfume'] as HTMLInputElement;
        const file = fileInput.files?.[0];

        const formData = new FormData();
        formData.append('perfume', form['nome-perfume'].value);
        formData.append('ml', form['ml-perfume'].value);
        formData.append('tipo', form['tipo-perfume'].value);
        formData.append('preco', form['valor-perfume'].value);
        formData.append('tags', form['tags-perfume'].value);
        formData.append('imagem_url', form['imagem_perfume'].value);

        if (file) {
            formData.append('imagem_url', file);
        }

        const targetUrl = 'https://lorenci-perfumes-api.onrender.com/catalogo/';
        const token = localStorage.getItem('jwt_token');

        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Sucesso:', result);
                toast.success('Produto adicionado com sucesso!');
            } else {
                const errorBody = await response.json();
                console.error('Erro ao adicionar produto:', errorBody);
                toast.error(`Erro: ${errorBody.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            toast.error('Falha na comunicação com o servidor.');
        }
    };

    return (
        <>
            <Header />
            <CatalogContainer>
                <FormAddPerfumeContainer method="post" onSubmit={handleSubmit}>
                    <h1>ADICIONAR UM PRODUTO</h1>
                    <PerfumeLabelDiv>
                        <input type="text" id="nome-perfume" placeholder="Nome" name="nome-perfume" required />
                    </PerfumeLabelDiv>
                    <PerfumeLabelDiv>
                        <input type="number" id="ml-perfume" placeholder="ML" name="ml-perfume" required />
                    </PerfumeLabelDiv>
                    <PerfumeLabelDiv>
                        <input type="text" id="tipo-perfume" placeholder="Tipo" name="tipo-perfume" required />
                    </PerfumeLabelDiv>
                    <PerfumeLabelDiv>
                        <input type="number" id="valor-perfume" placeholder="Preço" name="valor-perfume" required />
                    </PerfumeLabelDiv>
                    <PerfumeLabelDiv>
                        <input type="text" id="tags-perfume" placeholder="Tags" name="tags-perfume" required />
                    </PerfumeLabelDiv>
                    <PerfumeLabelDiv>
                        <input type="file" id="imagem_perfume" name="imagem_perfume" accept="image/*" />
                    </PerfumeLabelDiv>
                    <PerfumeLabelDiv>
                        <input type="submit" value="Adicionar" />
                    </PerfumeLabelDiv>
                </FormAddPerfumeContainer>
                <ToastContainer position="bottom-center" autoClose={3000} />
            </CatalogContainer>
            <Footer />
        </>
    )
}