import styled from "styled-components";

export const PerfumeContainer = styled.div`
    display: flex;
    /* background-color: #7F5D26; */
    flex-direction: column;
    height: 15rem;
    width: 11.65rem;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin: 0 0.25rem;
    position: relative;

    img {
        width: 99%;
        height: 99%;
        object-fit: cover;
        border-radius: 10px;
    }

    p {
        position: absolute;
        bottom: 0;
        text-transform: uppercase;
        font-weight: 500;
    }
`