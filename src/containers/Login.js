import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import "./Login.css";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLibs";

export default function Login() {
    const { userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            await Auth.signIn(email, password);
            userHasAuthenticated(true); 
            history.push("/home");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    return (
        <div className = "Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control
                        autoFocus
                        type="Adresse mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>
                        Mot de passe
                    </Form.Label>
                    <Form.Control
                        autoFocus
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <LoaderButton
                    block
                    size="lg"
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                     Se Connecter
                </LoaderButton>
            </Form>
        </div>
    )
}