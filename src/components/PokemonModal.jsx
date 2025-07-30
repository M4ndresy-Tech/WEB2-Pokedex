import axios from "axios";

export default function PokemonModal({pokemon, onClose}) {
    if (!pokemon) return null;

    // Fonction pour gérer le clic sur une évolution
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
                evolution: evoChain,
            };

            onClose(); // Ferme le modal actuel

            setTimeout(() => {
                window.dispatchEvent(new CustomEvent("openPokemon", {detail: selected}));
            }, 200);
        } catch (error) {
            console.error("Erreur lors du chargement du Pokémon", error);
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-2xl relative shadow-lg">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 hover:text-red-500 text-xl"
                >
                    ✕
                </button>

                <div className="flex items-center gap-6">
                    <img
                        src={pokemon.image}
                        alt={pokemon.name}
                        className="w-40 h-40 object-contain"
                    />

                    <div>
                        <h2 className="text-3xl font-bold capitalize">{pokemon.name}</h2>
                        <div className="flex gap-2 mt-2">
                            {pokemon.types.map((type, index) => (
                                <span
                                    key={index}
                                    className={`px-3 py-1 text-white rounded-full text-sm bg-${type.type.name}`}
                                >
                  {type.type.name}
                </span>
                            ))}
                        </div>

                        <p className="mt-4 text-gray-700">
                            <strong>Taille:</strong> {pokemon.height / 10} m
                        </p>
                        <p className="text-gray-700">
                            <strong>Poids:</strong> {pokemon.weight / 10} kg
                        </p>
                    </div>
                </div>

                {/* Évolution */}
                {pokemon.evolution?.length > 1 && (
                    <div className="mt-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">Évolutions</h3>
                        <div className="flex gap-4 overflow-x-auto">
                            {pokemon.evolution.map((evo) => (
                                <div
                                    key={evo.name}
                                    onClick={() => handleEvolutionClick(evo.name)}
                                    className="cursor-pointer hover:scale-105 transition-transform bg-gray-100 rounded-lg p-3 flex flex-col items-center w-24"
                                >
                                    <img
                                        src={evo.image}
                                        alt={evo.name}
                                        className="w-16 h-16 object-contain"
                                    />
                                    <p className="capitalize mt-2 text-sm text-gray-700">{evo.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
