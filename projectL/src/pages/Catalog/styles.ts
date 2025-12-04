import styled from "styled-components";

export const CatalogContainer = styled.main`
    display: flex;
    background-color: aliceblue;
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
`

export const PerfumeLayoutContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem -1rem;
    flex-wrap: wrap;
    justify-content: space-between;

    /* Seleciona o 3º, 4º, 5º, 6º, etc. */
    div:nth-child(n + 3) {
        margin-top: 0.5rem;
    }
`