import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

const App = () => {

  const [pokemon, setPokemon] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  const getPokemon = async () => {
    const toArray = [];
    const singleArray = [];
    if (!pokemon) {
      try {
        const totalUrl = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
        const totalRes = await axios.get(totalUrl);
        for (let i = 0; i < totalRes.data.count; i++) {
          let url = totalRes.data.results[i].url;  //Url del singolo pokemon
          let dataPoke = await axios.get(url);
          toArray.push(dataPoke.data);
        }

      } catch (e) {
        console.log(e);
      }
      setPokemonData(toArray);
    }
    else {
      const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      const pokeRes = await axios.get(pokeUrl);
      singleArray.push(pokeRes.data);
      setPokemonData(singleArray);
      console.log(singleArray);
    }
  };
  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase().replace(/ /g, ''));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
    setPokemon("");
  }

  useEffect(() => {
    getPokemon()
  }, []);

  return (
    <div id="App" className="App">
      <div className="container h-100">
        <header id="filter" className="mb-5">
          <div className="row h-100">
            <div className="col d-flex align-items-center">
              <form onSubmit={handleSubmit}>
                <label>
                  <input type="text" onChange={handleChange} placeholder="Enter Pokemon Name or Id" className="px-5 py-2"></input>
                </label>
              </form>
            </div>
          </div>
        </header>
        <div className="row justify-content-between align-items-center flex-wrapped">
          {pokemonData.map((data) => {
            return (
              <div className="col d-flex justify-content-center align-items-center" >
                <div id="card" className="h-100">
                  <div className="card h-100">
                    <img src={data.sprites["front_default"]} className="card-img-top" alt="Pokemon Img" />
                    <div className="card-body">
                      <h4 className="card-title d-flex justify-content-center">{data.forms[0].name.toUpperCase()}</h4>
                      <p className="card-text">
                        <span className="rounded-pill bg-danger border border-black px-2 py-1">{data.types[0].type.name}</span>
                      </p>
                      <p className="card-text pokeId"><small className="text-muted">N° {data.id}</small></p>
                    </div>
                  </div>
                </div >
              </div>
            )
          })}
        </div>
      </div>
    </div >
  );
};

export default App;

