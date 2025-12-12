import { CatalogContainer, FormAddPerfumeContainer, PerfumeLabelDiv } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { FormEvent } from "react";

export default function AddPerfume() {

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;

        const data = {
            'perfume': form['nome-perfume'].value,
            'ml': parseInt(form['ml-perfume'].value, 10),
            'tipo': form['tipo-perfume'].value,
            'preco': parseFloat(form['valor-perfume'].value),
            'tags': [form['tags-perfume'].value],
            'imagem_url': null
        };

        const targetUrl = 'https://lorenci-perfumes-api.onrender.com/catalogo/';

        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Sucesso:', result);
                alert('Produto adicionado com sucesso!');
            } else {
                const errorBody = await response.json();
                console.error('Erro ao adicionar produto:', errorBody);
                alert(`Erro: ${errorBody.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Falha na comunicação com o servidor.');
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
            </CatalogContainer>
            <Footer />
        </>
    )
}