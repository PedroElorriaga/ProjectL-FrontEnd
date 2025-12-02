import { HeaderContainer, NavContentImg, NavContentLinks } from "./style"
import Logo from "/logo.png";

export default function Header() {
    return (
        <>
            <HeaderContainer>
                <NavContentImg>
                    <img src={Logo} alt="" />
                </NavContentImg>
                <NavContentLinks>
                    <a>Login</a>
                    <a>Catalogo</a>
                </NavContentLinks>
            </HeaderContainer>
        </>
    )
}