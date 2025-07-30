export default function PokemonModal({ pokemon, onClose }) {
  if (!pokemon) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white text-black rounded-lg p-6 max-w-sm w-full"
      >
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl capitalize mb-2">{pokemon.name}</h2>
        <img src={pokemon.image} alt={pokemon.name} className="mx-auto mb-4" />
        <p>Poids: {pokemon.weight}</p>
        <p>Hauteur: {pokemon.height}</p>
        <p>
          Types: {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
