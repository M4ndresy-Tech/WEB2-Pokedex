export default function PokemonCard({ name, image }) {
  return (
    <div className="relative bg-gradient-to-tr from-blue-200 via-white to-purple-100 border-[3px] border-purple-400 rounded-3xl shadow-xl p-4 transform transition duration-500 hover:rotate-[-1deg] hover:scale-105 hover:shadow-purple-400 hover:-translate-y-2 cursor-pointer">
      <div className="bg-white rounded-2xl p-4 shadow-inner border border-purple-200 hover:border-purple-300 transition duration-300">
        <img
          src={image}
          alt={name}
          className="w-28 h-28 mx-auto mb-4 drop-shadow-lg"
        />
        <h2 className="capitalize text-xl font-bold text-purple-800 drop-shadow-sm text-center">
          {name}
        </h2>
      </div>
      <div className="absolute inset-0 rounded-3xl border-4 border-transparent hover:border-purple-500 pointer-events-none transition-all duration-500" />
    </div>
  );
}
