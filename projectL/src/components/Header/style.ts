import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rem;
    height: 6.5rem;
`

export const NavContentImg = styled.nav`
margin: 10% 0;

    img {
        height: 10rem;
        width: 10rem;
    }

    img:hover {
        cursor: pointer;
    }
`


export const NavContentLinks = styled.nav`
    display: flex;
    align-items: center;

    a {
        margin: 1rem;
    }

    a:hover {
        cursor: pointer;
    }
`