import { LoginContainer, LoginForm, LoginHeaderContainer } from "./styles";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { FormEvent } from "react";

export default function LoginPerfume() {

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;

        const data = {
            'email': form['email'].value,
            'password': form['password'].value
        };

        const targetUrl = 'http://192.168.15.11:3000/login/';

        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('jwt_token', result.token)
                alert('Usuario logado com sucesso!');
                window.location.href = '/catalogo';
            } else {
                const errorBody = await response.json();
                console.error('Erro ao adicionar produto:', errorBody);
                alert(`Erro: ${errorBody.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Falha na comunicação com o servidor.');
        }
    };
    return (
        <>
            <Header />
            <LoginContainer>
                <LoginHeaderContainer>
                    CONECTAR SEU USUARIO
                </LoginHeaderContainer>
                <LoginForm method="post" onSubmit={handleSubmit}>
                    <input type="email" name="email" id="email" placeholder="Email" required />
                    <input type="password" name="password" id="password" placeholder="Senha" required />
                    <input type="submit" value="Entrar" />
                </LoginForm>
            </LoginContainer>
            <Footer />
        </>
    )
}