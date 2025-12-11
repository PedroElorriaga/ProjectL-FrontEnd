import styled from "styled-components";

export const PerfumeContainer = styled.div`
    display: flex;
    /* background-color: #AF8C4B; */
    flex-direction: column;
    height: 15rem;
    width: 47%;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 0.25rem;
    position: relative;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }

    .perfume {
        position: absolute;
        bottom: 0;
        text-transform: uppercase;
        font-weight: 500;
        margin-bottom: 10%;
    }

    .preco {
        position: absolute;
        bottom: 0;
        text-transform: uppercase;
        font-weight: 500;
    }
`