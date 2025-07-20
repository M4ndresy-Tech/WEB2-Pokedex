export default function PokemonCard({ name, image }) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded shadow text-center hover:scale-105 transition">
        <img src={image} alt={name} className="mx-auto w-20 h-20" />
        <h2 className="mt-2 font-semibold capitalize text-white">{name}</h2>
      </div>
    );
  }
  