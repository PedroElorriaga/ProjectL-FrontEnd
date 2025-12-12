import styled from "styled-components";

export const CatalogContainer = styled.main`
    display: flex;
    width: 100%;
    flex-direction: column;
    flex-grow: 1;
    /* margin-top: 3rem; */
    align-items: center;
`

export const CatalogHeaderContainer = styled.div`
    font-size: 1.5rem;
    text-align: center;
    font-weight: 600;
    padding: 0.25rem;
    color: #AF8C4B;
`

export const FormAddPerfumeContainer = styled.form`
    /* background-color: white; */
    display: flex;
    flex-direction: column;
    height: max-content;
    width: 70%;
    border-radius: 5px;
    padding: 2rem;
    /* margin: 1rem; */

    input {
        background-color: #af8c4b75;
        border: none;
        padding: 1rem;
        color: white;
    }

    input::placeholder {
        color: gray;
    }

    input:focus {
        outline: none;
    }

    /* deactivate the increment and decrement buttons (spinners) */
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="file"] {
        background: none;
    }

    input[type="file"]::file-selector-button {
        background-color: white;
        border: solid 1px #af8c4b75;
        cursor: pointer;
        border-radius: 8px;
        color: gray;
        padding: 0.25rem;
        width: 50%;
    }

    input[type="submit"] {
        background-color: #AF8C4B;
    }

    h1 {
        font-size: 1.5rem;
        text-align: center;
        font-weight: 600;
        padding: 0.25rem;
        color: #AF8C4B;
        margin-bottom: 2rem;
    }
`

export const PerfumeLabelDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0.5rem;
`