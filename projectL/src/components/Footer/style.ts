import styled from "styled-components";

export const FooterContainer = styled.footer`
    display: flex;
    height: 3.5rem;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
`

export const NavContentLink = styled.nav`
    display: flex;
    align-items: center;

    svg {
        margin:0 2rem;
        height: 100%;
    }
    
    svg:hover {
        cursor: pointer;
    }
`
