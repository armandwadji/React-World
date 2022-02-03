
import  axios  from "axios";
import React, { useState } from "react";
import DeleteArticle from "./DeleteArticle";
let p = "posté le"; /**Paragraphe pour signaler l'édition */

const Article = (props) => {
  const { article } = props;
 
  const [ isEditing, setIsEditing ] = useState( false );
  // const [ editContent, setEditContent ] = useState( [] );
  //   console.log(article);

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
    return newDate;
  };

  const handleEdit = () => {
    
    const data = {
      author: article.author,
      content: article.content,
      date: article.date = Date.now(),
    }

    axios.put( "http://localhost:3003/articles/" + article.id, data );
    setIsEditing( false );

  }
  
  const affiche = () => {
    if ( isEditing ) {
      p = "Edité le";
    }
    return p;
  }


  return (
    <div className={isEditing ?"article edit" : "article" }  >
      <div className="card-header">
        <h3>{ article.author }</h3>
        <em>{ affiche() } { dateParser( article.date ) }</em>
      </div>

      { isEditing ? (
        <textarea
          autoFocus
          defaultValue={ article.content }
          onChange={ ( e ) => article.content = e.target.value }>
          
        </textarea>
      ) : (
        <p>{ article.content }</p>
      ) }
      
      <div className="btn-container">

        { isEditing ? (
          <button onClick={handleEdit}>Envoyer</button>
        ) : (
          <button onClick={ () => setIsEditing( true ) }>Edit</button>
        ) }
        
        <DeleteArticle id={ article.id}/>

      </div>
    </div>
  );
};

export default Article;
