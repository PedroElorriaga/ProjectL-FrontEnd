import styled from "styled-components";

export const CatalogContainer = styled.main`
    display: flex;
    width: 100%;
    flex-direction: column;
    flex-grow: 1;
    padding-bottom: 4.5rem;
`

export const CatalogHeaderContainer = styled.div`
    font-size: 1.5rem;
    text-align: center;
    font-weight: 600;
    padding: 0.25rem;
    color: #AF8C4B;
`

export const PerfumeLayoutContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;

    /* Seleciona o 3º, 4º, 5º, 6º, etc. */
    div:nth-child(n + 3) {
        margin-top: 0.5rem;
    }
`

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`

export const ModalContent = styled.div`
    position: relative;
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 90%; 
    max-width: 400px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;

    img {
        width: 50%;
        height: 50%;
    }

    button {
        background: none;
        border: none;
    }
`

export const TagsContent = styled.div`
    display: flex;
    padding: 1rem;
    flex-wrap: wrap;

    p {
        background-color: #af8c4b75;
        margin: 0.25rem 0.25rem;
        padding: 0.5rem;
        border-radius: 5px;
    }
`

export const FilterBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;

    input, select {
        background-color: #af8c4b75;
        border: none;
        padding: 1rem;
        color: white;
        margin: 0.25rem;
        border-radius: 5px;
        height: 3rem;
    }
`
export const EditModalDiv = styled.div`
    display: flex;
    flex-direction: column;

    h3 {
        font-weight: 400;
        font-size: 1rem;
        margin: 0 0.5rem;
    }
    
    input {
        margin: 0.25rem;
        background-color: #af8c4b75;
        border: none;
        padding: 0.75rem;
        border-radius: 5px;
    }

    /* deactivate the increment and decrement buttons (spinners) */
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

`