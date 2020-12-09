import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import "./Home.css";
import { API } from "aws-amplify";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadNotes() {
    return API.get("notes", "/notes");
  }

 

  function renderNotesList(notes) {
    return (
      <>
        <LinkContainer to="/notes/new">
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPencilSquare size={17} />
            <span className="ml-2 font-weight-bold">Créer une nouvelle note</span>
          </ListGroup.Item>
        </LinkContainer>
        {notes.map(({ noteId, content, createdAt }) => (
          <LinkContainer key={noteId} to={`/notes/${noteId}`}>
            <ListGroup.Item action>
              <span className="font-weight-bold">
                {content.trim().split("\n")[0]}
              </span>
              <br />
              <span className="text-muted">
                Créé : {new Date(createdAt).toLocaleString()}
              </span>
            </ListGroup.Item>
          </LinkContainer>
        ))}
      </>
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Bonjour !</h1>
        <p className="text-muted">Ceci est application pour prendre des notes. Elel a été créer et hébergé dans un but totalement éducatif dans une optique "Serverless". Pour cela j'ai suivi la documentation de http://serverless-stack.com.</p>
        <dl className="text-muted">
          <dt>Font</dt>
          <dd>- ReactJS</dd>
          <dt>Back</dt>
          <dd>- Serverless</dd>
          <dt>Hébergment : AWS. J'ai utilisé :</dt>
          <dd>- Lambda </dd> 
          <dd>- Cognito</dd>
          <dd>- DynamoDB</dd>
          <dd>- Billing</dd>
          <dd>- S3 </dd>
          <dd>- Simple Email Service</dd>
        </dl>
        <p className="text-muted">Bonne utilisation.</p>
        <p className="text-muted"> Yannis Trouvé</p>

      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">Vos notes</h2>
        <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}