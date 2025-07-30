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
    const [theme, setTheme] = useState("light");
    const [lightThemeIndex, setLightThemeIndex] = useState(0);

    const lightThemes = [
        { name: "sunrise", bg: "bg-gradient-to-r from-orange-300 via-pink-400 to-purple-500" },
        { name: "galaxy", bg: "bg-gradient-to-r from-indigo-900 via-purple-800 to-gray-900" },
        { name: "ice", bg: "bg-gradient-to-r from-cyan-200 via-cyan-400 to-blue-500" },
        { name: "candy", bg: "bg-gradient-to-r from-pink-300 via-rose-400 to-red-500" },
        { name: "nature", bg: "bg-gradient-to-r from-green-200 via-teal-300 to-emerald-400" },
        { name: "cloud", bg: "bg-gradient-to-r from-slate-100 via-white to-slate-100" },
        { name: "space", bg: "bg-gradient-to-r from-gray-900 via-purple-900 to-black" },
        { name: "default", bg: "bg-[#6a9ae7]" },
    ];

    const cycleThemes = () => {
        if (theme === "dark") {
            setTheme("light");
            setLightThemeIndex(0);
        } else {
            const nextIndex = (lightThemeIndex + 1) % lightThemes.length;
            if (nextIndex === 0) {
                setTheme("dark");
            } else {
                setLightThemeIndex(nextIndex);
            }
        }
    };

    const getBgClass = () => {
        if (theme === "dark") return "bg-gray-900";
        return lightThemes[lightThemeIndex].bg;
    };

    const getNavbarClass = () => {
        if (theme === "dark") return "bg-gray-800 text-white";
        return "bg-white text-black";
    };

    const getInputClass = () => {
        if (theme === "dark") return "bg-gray-700 text-white border-gray-600";
        return "bg-white text-black border-gray-300";
    };

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
        <div className={`min-h-screen ${getBgClass()} text-gray-900`}>
            <header className={`${getNavbarClass()} shadow-md py-4 px-6 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-50 rounded-b-xl gap-4`}>
                <img src={Pokemon_logo} alt="Pokémon_logo" className="w-40" />
                <div className="flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Rechercher un Pokémon par nom..."
                            className={`w-full pl-10 pr-4 py-2 rounded border ${getInputClass()}`}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"></i>
                    </div>
                    <div className="w-full sm:w-64">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className={`w-full px-4 py-2 rounded border ${getInputClass()}`}
                        >
                            <option value="all">Tous les types</option>
                            {types.map((type) => (
                                <option key={type.name} value={type.name}>
                                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={theme === "dark"}
                            onChange={cycleThemes}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-gray-600 transition-all duration-300">
                            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 ${theme === 'dark' ? 'translate-x-5 bg-yellow-400' : 'bg-gray-300'}`}>
                                <span className={`absolute inset-0 flex items-center justify-center text-xs ${theme === 'dark' ? 'text-black' : 'text-gray-600'}`}>
                                    {theme === 'dark' ? '🌙' : '☀️'}
                                </span>
                            </div>
                        </div>
                    </label>
                </div>
            </header>

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
                            <PokemonCard name={poke.name} image={image} types={types} theme={theme} />
                        </div>
                    );
                })}
            </div>

            {/* Modal Pokémon */}
            <PokemonModal
                pokemon={selectedPokemon}
                onClose={() => setSelectedPokemon(null)}
                theme={theme}
            />
        </div>
    );
}