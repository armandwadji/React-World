import axios from "axios";
import React, { useState } from "react";
import DeleteArticle from "./DeleteArticle";
let p = "posté le"; /**Paragraphe pour signaler l'édition */

const Article = (props) => {
  const { article, isDev, newsData, setNewsData } = props;

  const [isEditing, setIsEditing] = useState(false);

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
    let data = {
      author: article.author,
      content: article.content,
      date: (article.date = Date.now()),
    };

    const { id } = article;

    if (isDev) {
      axios.put("http://localhost:3003/articles/" + id, data);
    } else {
      data = { ...data, id }; //On rajoute l'Id
      let Articles = newsData; //On copie les articles pour les modifiés
      const index = Articles.findIndex((index) => index.id === id); //On cherche l'index de l'id à modifié
      Articles[index] = data; //On modifie l'article de l'index correspondant
      setNewsData(Articles); //On actalise le DOM
    }
    setIsEditing(false);
  };

  const affiche = () => {
    if (isEditing) {
      p = "Edité le";
    }
    return p;
  };

  return (
    <div className={isEditing ? "article edit" : "article"}>
      <div className='card-header'>
        <h3>{article.author}</h3>
        <em>
          {affiche()} {dateParser(article.date)}
        </em>
      </div>

      {isEditing ? (
        <textarea
          autoFocus
          defaultValue={article.content}
          onChange={(e) => (article.content = e.target.value)}></textarea>
      ) : (
        <p>{article.content}</p>
      )}

      <div className='btn-container'>
        {isEditing ? (
          <button onClick={handleEdit}>Envoyer</button>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
        {isDev ? (
          <DeleteArticle id={article.id} isDev={isDev} />
        ) : (
          <DeleteArticle
            id={article.id}
            isDev={isDev}
            newsData={newsData}
            setNewsData={setNewsData}
          />
        )}
      </div>
    </div>
  );
};

export default Article;
