import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Countries = () => {
  /**Pour stocker la data apres la requete HTTP */
  const [data, setData] = useState([]);

  /**Pour faire évoluer la valeur de l'input range */
  const [rangeValue, setRangeValue] = useState(20);

  /**pour faire évoluer la sélection de l'input de type radio */
  const [selectedRadio, setSelectedRadio] = useState("");

  /**Tableau pour stocker les pays par continents */
  let radios = ["Africa", "America", "Asia", "Europe", "Oceania", "Antarctic"];

  useEffect(() => {
    axios
      .get(
        "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
      )
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const continents = new Set(data.map((data) => data.region));
  console.log(continents);

  return (
    <div className="countries">
      <div className="sort-container">
        <input
          type="range"
          name="inputpays"
          id="pays"
          min="1"
          max="250"
          value={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />

        <ul>
          {radios.map((radio) => {
            return (
              <li key={radio}>
                <input
                  type="radio"
                  name="continentRadio"
                  id={radio}
                  value={radio}
                  checked={radio === selectedRadio}
                  onChange={(e) => setSelectedRadio(e.target.value)}
                />
                <label htmlFor={radio}>{radio}</label>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="cancel">
        {selectedRadio && (
          <h5 onClick={() => setSelectedRadio("")}>Annuler recherche</h5>
        )}
      </div>
      <div className="countries-container">
        <ul className="countries-list">
          {data
            .sort((a, b) => b.population - a.population)
            .filter((country) => country.region.includes(selectedRadio))
            .slice(0, rangeValue)
            .map((country) => (
              <Card country={country} key={country.name.common} />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Countries;
