import styled from "styled-components";

export const LoginContainer = styled.main`
    display: flex;
    width: 100%;
    flex-direction: column;
    flex-grow: 1;
    /* margin-top: 3rem; */
    align-items: center;
    justify-content: center;
`

export const LoginHeaderContainer = styled.div`
    font-size: 1.5rem;
    text-align: center;
    font-weight: 600;
    padding: 0.25rem;
    color: #AF8C4B;
`

export const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 1rem;

    input {
        background-color: #af8c4b75;
        border: none;
        padding: 1rem;
        color: white;
        margin: 0.25rem;
        border-radius: 5px;
    }

    input:focus {
        outline: none;
    }

    input[type="submit"] {
        background-color: #AF8C4B;
    }
`