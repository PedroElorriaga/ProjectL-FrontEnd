import { FooterContainer, NavContentLink } from "./style";
import { UserIcon, MagnifyingGlassIcon, BasketIcon } from "@phosphor-icons/react";

export default function Footer() {
    return (
        <>
            <FooterContainer>
                <NavContentLink>
                    <BasketIcon size={32} />
                    <MagnifyingGlassIcon size={32} />
                    <UserIcon size={32} />
                </NavContentLink>
            </FooterContainer>
        </>
    )
}