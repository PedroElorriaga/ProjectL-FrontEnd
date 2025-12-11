import { HeaderContainer, NavContentImg } from "./style"
import Logo from "/logo.png";

export default function Header() {
    return (
        <>
            <HeaderContainer>
                <NavContentImg>
                    <img src={Logo} alt="Logo Lorenci" />
                </NavContentImg>
            </HeaderContainer>
        </>
    )
}