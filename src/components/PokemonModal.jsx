export default function PokemonModal({ pokemon, onClose }) {
    if (!pokemon) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white  p-6 rounded shadow-lg max-w-sm w-full text-center relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 text-lg">&times;</button>
          <img src={pokemon.image} alt={pokemon.name} className="w-24 h-24 mx-auto" />
          <h2 className="text-xl font-bold mt-2 capitalize">{pokemon.name}</h2>
          <p className="mt-2 text-sm">
            <strong>Poids :</strong> {pokemon.weight} hg<br />
            <strong>Taille :</strong> {pokemon.height} dm
          </p>
          <p className="mt-2">
            <strong>Types :</strong>{" "}
            {pokemon.types.map(t => t.type.name).join(", ")}
          </p>
        </div>
      </div>
    );
  }
  