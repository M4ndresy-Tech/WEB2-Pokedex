import axios from "axios";

export default function PokemonModal({pokemon, onClose, theme, id}) {
    if (!pokemon) return null;

    const statLabels = {
        hp: "HP",
        attack: "Attack",
        defense: "Defense",
        "special-attack": "Sp. Attack",
        "special-defense": "Sp. Defense",
        speed: "Speed",
    };

    const statData = pokemon.stats?.map((stat) => ({
        name: statLabels[stat.stat.name] || stat.stat.name,
        value: stat.base_stat,
    })) || [];

    async function handleEvolutionClick(name) {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const speciesRes = await axios.get(response.data.species.url);
            const evoRes = await axios.get(speciesRes.data.evolution_chain.url);

            const evoChain = [];
            let evo = evoRes.data.chain;
            while (evo) {
                const evoDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evo.species.name}`);
                evoChain.push({
                    name: evo.species.name,
                    image: evoDetails.data.sprites.other["official-artwork"].front_default,
                });
                evo = evo.evolves_to[0];
            }

            const selected = {
                name: response.data.name,
                image: response.data.sprites.other["official-artwork"].front_default,
                height: response.data.height,
                weight: response.data.weight,
                types: response.data.types,
                stats: response.data.stats,
                evolution: evoChain,
            };

            onClose();
            setTimeout(() => {
                window.dispatchEvent(new CustomEvent("openPokemon", {detail: selected}));
            }, 200);
        } catch (error) {
            console.error("Erreur lors du chargement du Pokémon", error);
        }
    }

    const getOverlayClass = () => {
        switch (theme) {
            case "light":
                return "bg-[#6a9ae7] bg-opacity-60";
            case "dark":
                return "bg-gray-900 bg-opacity-60";
            default:
                return "bg-[#6a9ae7] bg-opacity-60";
        }
    };

    const getModalClass = () => {
        switch (theme) {
            case "light":
                return "bg-white text-gray-800 border-2 border-[#6a9ae7] shadow-md";
            case "dark":
                return "bg-gray-800 text-white border-2 border-gray-600 shadow-md";
            default:
                return "bg-white text-gray-800 border-2 border-[#6a9ae7] shadow-md";
        }
    };

    const getTextClass = () => {
        switch (theme) {
            case "light":
                return "text-gray-800";
            case "dark":
                return "text-white";
            default:
                return "text-gray-800";
        }
    };

    const getEvolutionCardClass = () => {
        switch (theme) {
            case "light":
                return "bg-gray-100 text-gray-700";
            case "dark":
                return "bg-gray-700 text-white";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const getStatBarBgClass = () => {
        switch (theme) {
            case "light":
                return "bg-gray-200";
            case "dark":
                return "bg-gray-600";
            default:
                return "bg-gray-200";
        }
    };

    const getNumberClass = () => {
        switch (theme) {
            case "light":
                return "text-gray-400 opacity-10";
            case "dark":
                return "text-gray-500 opacity-10";
            default:
                return "text-gray-400 opacity-10";
        }
    };

    return (
        <div className={`fixed inset-0 ${getOverlayClass()} flex justify-center items-center z-50`}>
            <div className={`rounded-2xl p-6 w-[95%] max-w-5xl relative shadow-lg ${getModalClass()}`}>
                {/* Numéro en fond */}
                <div
                    className={`absolute inset-0 flex items-center justify-center text-8xl font-bold ${getNumberClass()} z-0`}>
                    #{id.padStart(3, '0')}
                </div>
                {/* Contenu principal */}
                <div className="relative z-10">
                    <button
                        onClick={onClose}
                        className={`absolute top-4 right-4 text-xl ${theme === "light" ? "text-gray-600 hover:text-red-500" : "text-gray-300 hover:text-red-400"}`}
                    >
                        ✕
                    </button>

                    <div className="flex flex-col lg:flex-row gap-6 mt-4">
                        {/* Colonne gauche */}
                        <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2">
                            <div className="flex gap-6 items-center justify-center w-full">
                                <img
                                    src={pokemon.image}
                                    alt={pokemon.name}
                                    className="w-40 h-40 object-contain"
                                />
                                <div>
                                    <h2 className="text-3xl font-bold capitalize mt-4 text-center lg:text-left">{pokemon.name}</h2>
                                    <div className="flex gap-2 mt-2">
                                        {pokemon.types.map((type, index) => (
                                            <span
                                                key={index}
                                                className={`px-3 py-1 rounded-full text-sm bg-${type.type.name} ${getTextClass()}`}
                                            >
                                                {type.type.name}
                                            </span>
                                        ))}
                                    </div>

                                    <p className={`mt-4 ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                                        <strong>Taille:</strong> {pokemon.height / 10} m
                                    </p>
                                    <p className={`${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                                        <strong>Poids:</strong> {pokemon.weight / 10} kg
                                    </p>
                                </div>
                            </div>

                            {/* Évolution */}
                            {pokemon.evolution?.length > 1 && (
                                <div className="mt-6 w-full flex flex-col items-center">
                                    <h3 className="text-xl font-semibold mb-2">Évolutions</h3>
                                    <div className="flex gap-4 overflow-x-auto">
                                        {pokemon.evolution.map((evo) => (
                                            <div
                                                key={evo.name}
                                                onClick={() => handleEvolutionClick(evo.name)}
                                                className={`cursor-pointer hover:scale-90 transition-transform rounded-lg p-3 flex flex-col items-center w-24 ${getEvolutionCardClass()}`}
                                            >
                                                <img
                                                    src={evo.image}
                                                    alt={evo.name}
                                                    className="w-16 h-16 object-contain"
                                                />
                                                <p className="capitalize mt-2 text-sm">{evo.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Colonne droite : Statistiques */}
                        <div className="w-full lg:w-1/2">
                            <h3 className="text-xl font-semibold mb-4 text-center">Statistiques</h3>
                            <div className="space-y-3">
                                {statData.map((stat, index) => {
                                    let barColor = "bg-red-500";
                                    if (stat.value >= 100) barColor = "bg-green-500";
                                    else if (stat.value >= 50) barColor = "bg-yellow-400";

                                    return (
                                        <div key={index}>
                                            <div
                                                className={`flex justify-between mb-1 text-sm font-medium ${theme === "light" ? "text-gray-700" : "text-gray-300"}`}>
                                                <span>{stat.name}</span>
                                                <span>{stat.value}</span>
                                            </div>
                                            <div className={`w-full rounded-full h-3 ${getStatBarBgClass()}`}>
                                                <div
                                                    className={`h-3 rounded-full ${barColor}`}
                                                    style={{width: `${(stat.value / 150) * 100}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}