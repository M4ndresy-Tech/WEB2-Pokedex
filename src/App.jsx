import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonModal from "./components/PokemonModal";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  const filtered = pokemons.filter((poke) =>
    poke.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Barre du haut : champ de recherche */}
      <div className="flex justify-center items-center p-4 max-w-4xl mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Rechercher un Pokémon..."
            className="w-full pl-10 pr-4 py-2 rounded border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
        </div>
      </div>

      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 max-w-4xl mx-auto">
        {filtered.map((poke) => {
          const id = poke.url.split("/")[6];
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

          const handleClick = () => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
              .then((res) => res.json())
              .then((data) => {
                setSelectedPokemon({
                  name: data.name,
                  image: image,
                  weight: data.weight,
                  height: data.height,
                  types: data.types,
                });
              });
          };

          return (
            <div
              key={poke.name}
              onClick={handleClick}
              className="cursor-pointer"
            >
              <PokemonCard name={poke.name} image={image} />
            </div>
          );
        })}
      </div>

      
      <PokemonModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      />
    </div>
  );
}
