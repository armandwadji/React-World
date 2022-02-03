import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";

const Countries = () => {

  /**Pour stocker la data apres la requete HTTP */
  const [ data, setData ] = useState( [] );

  /** Pour ranger les pays par ordre decroissant de population */
  const [ sortedData, setSortedData ] = useState( [] );

  /**Pour faire la requete une seule fois */
  const [ playone, setPlayOne ] = useState( true );

  /**Pour faire évoluer la valeur de l'input range */
  const [ rangeValue, setRangeValue ] = useState( 20 );

  /**pour faire évoluer la sélection de l'input de type radio */
  const [ selectedRadio, setSelectedRadio ] = useState( "" )
  /**Tableau pour stocker les pays par continents */
  const radios = [ "Africa", "America", "Asia", "Europe", "Oceania", "Antarctic" ];

  useEffect( () => {

    /**If nous permet de faire la requete une seule fois */
    if ( playone ) {
      axios
        .get(
          "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
        )
        .then( ( res ) => {
          setData(res.data );
          setPlayOne(false);
        } ); 
    }
    
    const sortedCountry = () => {

      /***ON CONVERTIR NOTRE TABLEAU EN OBJET JAVASCRIPT */
      const countryObject = Object.keys( data ).map( ( i ) => data[ i ] );

      /**ON TRIE NOTRE TABLEAU DU PLUS PETIT AU PLUS GRAND */
      const sortedArray = countryObject.sort( ( a, b ) => {
        return b.population - a.population;
      } )
      sortedArray.length = rangeValue; /**On affecte la valeur du range dynamiquement à la longueur du tableau trier */
      setSortedData(sortedArray);
    };
    sortedCountry();

  }, [data, rangeValue,playone ]);

  return (
    <div className="countries">

      <div className="sort-container">

        <input type="range" name="inputpays" id="pays" min="1" max="250" value={ rangeValue } onChange={ ( e ) => setRangeValue( e.target.value ) } />
        
        <ul>
          { radios.map( ( radio ) => {
            return (
              <li key={ radio }>
                <input type="radio"
                  name={ radio }
                  id={ radio }
                  value={ radio }
                  checked={ radio === selectedRadio }
                  onChange={(e)=> setSelectedRadio(e.target.value)}/>
                <label htmlFor={ radio }>{ radio}</label>
              </li>
            )
          })}
        </ul>

      </div>

      <div className="cancel">
        {selectedRadio && 
        <h5 onClick={()=> setSelectedRadio("")}>Annuler recherche</h5>}
      </div>

      <ul className="countries-list">
        { sortedData
          .filter( ( country ) => 
            country.region.includes( selectedRadio ) )
          .map( ( country ) => (
            <Card country={ country } key={ country.name.common } /> ) )
        }
      </ul>

    </div>
  );
};

export default Countries;