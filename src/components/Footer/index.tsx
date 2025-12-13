import { useNavigate } from "react-router-dom";
import { FooterContainer, NavContentLink } from "./style";
import { UserIcon, MagnifyingGlassIcon, BasketIcon } from "@phosphor-icons/react";

export default function Footer() {
    const navigate = useNavigate();

    const handleBasketClick = () => {
        navigate('/catalogo')
    }

    const handleUserClick = () => {
        navigate('/login')
    }

    return (
        <>
            <FooterContainer>
                <NavContentLink>
                    <BasketIcon size={32} onClick={handleBasketClick} />
                    <MagnifyingGlassIcon size={32} />
                    <UserIcon size={32} onClick={handleUserClick} />
                </NavContentLink>
            </FooterContainer>
        </>
    )
}