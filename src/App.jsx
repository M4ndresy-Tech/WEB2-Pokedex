import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";
import PokemonModal from "./components/PokemonModal";
import Pokemon_logo from './assets/Pokémon_logo.png'

export default function App() {
    const [pokemons, setPokemons] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState("all");
    const [typeMap, setTypeMap] = useState({});

<<<<<<< HEAD
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then((res) => res.json())
            .then((data) => {
                setPokemons(data.results);
                data.results.forEach((poke) => {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
                        .then((res) => res.json())
                        .then((details) => {
                            setTypeMap((prev) => ({
                                ...prev,
                                [poke.name]: details.types.map((t) => t.type.name),
                            }));
                        });
=======
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
      <h1 className="text-4xl font-bold text-center text-red-600 py-4">
  Pokédex National
</h1>

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
                  weight: data.weight,edr,
                  height: data.height,
                  types: data.types,
>>>>>>> d7c1373 (Ajout de quelques améliorations de design)
                });
            });

        fetch("https://pokeapi.co/api/v2/type")
            .then((res) => res.json())
            .then((data) => {
                const validTypes = data.results.filter(
                    (t) => !["shadow", "unknown"].includes(t.name)
                );
                setTypes(validTypes);
            });
    }, []);

    useEffect(() => {
        const handler = (e) => {
            setSelectedPokemon(e.detail);
        };
        window.addEventListener("openPokemon", handler);
        return () => window.removeEventListener("openPokemon", handler);
    }, []);

    const filtered = pokemons.filter((poke) => {
        const lowerSearch = search.toLowerCase();
        const typesOfPokemon = typeMap[poke.name] || [];

        const matchesSearch = poke.name.toLowerCase().includes(lowerSearch);
        const matchesType =
            selectedType === "all" || typesOfPokemon.includes(selectedType);

        return matchesSearch && matchesType;
    });

    return (
        <div className="min-h-screen bg-[#6a9ae7] text-gray-900">
            <img src={Pokemon_logo} alt="Pokémon_logo" className="mx-auto w-90 py-5" />
            {/* Barre du haut : champ de recherche + select */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 items-center p-4 max-w-8xl mx-30 bg-white">
                <div className="relative w-full sm:w-1/3">
                    <input
                        type="text"
                        placeholder="Rechercher un Pokémon par nom..."
                        className="w-full pl-10 pr-4 py-2 rounded border"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                </div>

                <div className="w-full sm:w-1/3">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-4 py-2 rounded border bg-white"
                    >
                        <option value="all">Tous les types</option>
                        {types.map((type) => (
                            <option key={type.name} value={type.name}>
                                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Grille de cartes Pokémon */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 max-w-8xl px-30 mx-auto">
                {filtered.map((poke) => {
                    const id = poke.url.split("/")[6];
                    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
                    const types = typeMap[poke.name] || [];

                    const handleClick = () => {
                        fetch(`https://pokeapi.co/api/v2/pokemon/${poke.name}`)
                            .then((res) => res.json())
                            .then((data) => {
                                fetch(data.species.url)
                                    .then((res) => res.json())
                                    .then((speciesData) => {
                                        fetch(speciesData.evolution_chain.url)
                                            .then((res) => res.json())
                                            .then((evoData) => {
                                                const evoChain = [];
                                                let evo = evoData.chain;
                                                while (evo) {
                                                    evoChain.push(evo.species.name);
                                                    evo = evo.evolves_to[0];
                                                }
                                                Promise.all(
                                                    evoChain.map((name) =>
                                                        fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                                                            .then((res) => res.json())
                                                            .then((pokeData) => ({
                                                                name: pokeData.name,
                                                                image:
                                                                    pokeData.sprites?.other["official-artwork"]?.front_default || "",
                                                            }))
                                                    )
                                                ).then((evolutionDetails) => {
                                                    setSelectedPokemon({
                                                        name: data.name,
                                                        image: data.sprites?.other["official-artwork"]?.front_default || "",
                                                        weight: data.weight,
                                                        height: data.height,
                                                        types: data.types,
                                                        stats: data.stats,
                                                        evolution: evolutionDetails,
                                                    });
                                                });
                                            });
                                    });
                            });
                    };

                    return (
                        <div
                            key={poke.name}
                            onClick={handleClick}
                            className="cursor-pointer"
                        >
                            <PokemonCard name={poke.name} image={image} types={types} />
                        </div>
                    );
                })}
            </div>

            {/* Modal Pokémon */}
            <PokemonModal
                pokemon={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}
            />
        </div>
    );
}