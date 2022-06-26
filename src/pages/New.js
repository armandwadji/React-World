/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import axios from "axios";
import Article from "../components/Article";
import { articles } from "../assets/data";

const New = () => {
  const [newsData, setNewsData] = useState([]);
  const [author, setAuthor] = useState([]);
  const [content, setContent] = useState([]);
  const [error, setError] = useState(false);

  const isDev = process.env.NODE_ENV === "development";

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (isDev) {
      axios
        .get("http://localhost:3003/articles")
        .then((res) => setNewsData(res.data));
    } else {
      setNewsData(articles);
    }
  };

  //Méthode permettant de généré un id unique
  const getUniqueId = (data) => {
    const articlesIds = data.map(({ id }) => id);
    const idMax = articlesIds.reduce((a, b) => Math.max(a, b));
    const uniqueId = idMax + 1;
    return uniqueId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (content.length < 140) {
      setError(true);
    } else {
      let data = { author, content, date: Date.now() };
      if (isDev) {
        await axios
          .post("http://localhost:3003/articles", { ...data })
          .then(() => {
            getData();
          });
      } else {
        const id = getUniqueId(newsData);
        data = { ...data, id };
        setNewsData([...newsData, data]);
      }
      setAuthor("");
      setContent("");
      setError(false);
    }
  };

  return (
    <div className='news-container'>
      <Logo />
      <Navigation />
      <h1>News</h1>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Nom'
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        />
        {/* style={{ border: error ? "1px solid red" : `1px solid #61dafb` }} */}
        <textarea
          className={error ? "error" : ""}
          placeholder='Message'
          onChange={(e) => setContent(e.target.value)}
          value={content}></textarea>
        {error && <p>Veuillez écrire un minimum de 140 caractères</p>}

        <input type='submit' value='Envoyer' />
      </form>

      <ul>
        {isDev
          ? newsData
              .sort((a, b) => b.date - a.date)
              .map((article) => (
                <Article article={article} key={article.id} isDev={isDev} />
              ))
          : newsData
              .sort((a, b) => b.date - a.date)
              .map((article) => (
                <Article
                  article={article}
                  key={article.id}
                  isDev={isDev}
                  newsData={newsData}
                  setNewsData={setNewsData}
                />
              ))}
      </ul>
    </div>
  );
};

export default New;
