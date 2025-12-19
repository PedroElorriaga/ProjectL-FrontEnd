import { useNavigate } from "react-router-dom";
import { FooterContainer, NavContentLink } from "./style";
import { SignOutIcon, PlusIcon, SquaresFourIcon, SignInIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";


interface TokenPayload {
    user_role: string,
    public_id: number
}


export default function Footer() {
    const [isAdmin, setIsAdmin] = useState(false);

    const [isConfirming, setIsConfirming] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const token = localStorage.getItem('jwt_token');

        if (token) {
            const decoded = jwtDecode<TokenPayload>(token);
            setIsAdmin(decoded.user_role === 'admin')
        }
        return !!token;
    });

    const handleLogout = () => {
        localStorage.removeItem('jwt_token');
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsConfirming(false);
        window.location.href = '/catalogo';
    };

    const navigate = useNavigate();

    const handleBasketClick = () => {
        navigate('/catalogo')
    }

    const handleUserClick = () => {
        navigate('/login')
    }

    const handleAddProductClick = () => {
        navigate('/adicionar')
    }

    return (
        <>
            <FooterContainer>
                <NavContentLink>
                    <SquaresFourIcon size={32} onClick={handleBasketClick} />
                    {isLoggedIn && isAdmin ? (
                        <>
                            <PlusIcon size={32} onClick={handleAddProductClick} />
                            {!isConfirming ? (
                                <SignOutIcon size={32} onClick={() => setIsConfirming(true)} />
                            ) : (
                                // SEGUNDO CLIQUE: Agora sim desloga
                                <div style={{ display: 'flex', alignItems: 'center', borderRadius: '8px', padding: '5px' }}>
                                    <span onClick={handleLogout} style={{ color: 'white', marginRight: '30px', fontSize: '14px' }}>
                                        Sair
                                    </span>
                                    <span onClick={() => setIsConfirming(false)} style={{ color: 'white', marginRight: '10px', fontSize: '14px' }}>
                                        Cancelar
                                    </span>
                                </div>
                            )}
                        </>
                    ) : isLoggedIn ? (
                        <SignOutIcon size={32} onClick={handleLogout} />

                    ) : (
                        <SignInIcon size={32} onClick={handleUserClick} />
                    )}
                </NavContentLink>
            </FooterContainer>
        </>
    )
}