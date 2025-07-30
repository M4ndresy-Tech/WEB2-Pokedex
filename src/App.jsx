import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonModal from "./components/PokemonModal";

export default function App() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [theme, setTheme] = useState("galaxy");

const cycleThemes = () => {
  const themes = [
    "sunrise",
    "galaxy",
    "ice",
    "candy",
    "nature",
    "cloud",
    "space",
  ];
  const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
  setTheme(themes[nextIndex]);
};

const getBgClass = () => {
  switch (theme) {
    case "sunrise":
      return "bg-gradient-to-r from-orange-300 via-pink-400 to-purple-500";
    case "galaxy":
      return "bg-gradient-to-r from-indigo-900 via-purple-800 to-gray-900";
    case "ice":
      return "bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500";
    case "candy":
      return "bg-gradient-to-r from-pink-300 via-rose-400 to-red-500";
    case "nature":
      return "bg-gradient-to-r from-green-200 via-teal-300 to-emerald-400";
    case "cloud":
      return "bg-gradient-to-r from-slate-100 via-white to-slate-100";
    case "space":
      return "bg-gradient-to-r from-gray-900 via-purple-900 to-black";
    default:
      return "bg-white";
  }
};

const getNavbarClass = () => {
  switch (theme) {
    case "sunrise":
      return "bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-600 text-white";
    case "galaxy":
      return "bg-gradient-to-r from-indigo-800 via-purple-700 to-gray-800 text-white";
    case "ice":
      return "bg-gradient-to-r from-cyan-300 via-cyan-500 to-blue-600 text-black";
    case "candy":
      return "bg-gradient-to-r from-pink-400 via-rose-400 to-red-600 text-white";
    case "nature":
      return "bg-gradient-to-r from-green-400 via-teal-400 to-emerald-500 text-white";
    case "cloud":
      return "bg-gradient-to-r from-slate-200 via-white to-slate-200 text-black";
    case "space":
      return "bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white";
    default:
      return "bg-white text-black";
  }
};

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  const filtered = pokemons.filter((poke) =>
    poke.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className={`min-h-screen ${getBgClass()} text-white`}>


<header className={`${getNavbarClass()} shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50 rounded-b-xl`}>
  <h1 className="text-2xl font-bold">Pokedex</h1>
  <nav className="font-sans text-sm font-medium">
    <ul className="flex gap-6">
      <li>
        <button
          onClick={cycleThemes}
          className="bg-white text-black px-3 py-1 rounded hover:bg-gray-300"
        >
          Changer fond
        </button>
      </li>
      <li className="hover:underline cursor-pointer">Accueil</li>
      <li className="hover:underline cursor-pointer">Types</li>
      <li className="hover:underline cursor-pointer">À propos</li>
    </ul>
  </nav>
</header>

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
