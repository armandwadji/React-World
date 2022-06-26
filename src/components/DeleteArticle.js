import axios from "axios";
import React from "react";

const DeleteArticle = ({ id, isDev, newsData, setNewsData }) => {
  const handleDelete = () => {
    if (isDev) {
      axios.delete("http://localhost:3003/articles/" + id);
      window.location.reload();
    } else {
      let Articles = newsData;
      Articles = Articles.filter((article) => article.id !== id);
      setNewsData(Articles);
    }
  };

  return (
    <button
      onClick={() => {
        if (isDev) {
          if (window.confirm("Voulez vous supprimer cette article")) {
            handleDelete();
          }
        } else {
          handleDelete();
        }
      }}>
      Delete
    </button>
  );
};

export default DeleteArticle;
