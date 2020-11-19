import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Auth } from "aws-amplify";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import "./Login.css";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";

export default function Login() {
    const history = useHistory();
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    const [fields, handleFieldChange] = useFormFields({
      email: "",
      password: ""
    });


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
                        onChange={handleFieldChange}
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
                        onChange={handleFieldChange}
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