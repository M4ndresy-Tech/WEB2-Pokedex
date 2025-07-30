export default function PokemonCard({name, image, types = []}) {
    return (
        <div className="bg-white p-4 rounded shadow text-center hover:scale-105 transition">
            <img src={image} alt={name} className="mx-auto w-20 h-20"/>
            <h2 className="mt-2 font-semibold capitalize text-gray-800">{name}</h2>

            {/* Affichage des types */}
            <div className="mt-1 flex justify-center gap-2 flex-wrap">
                {types.map((type) => (
                    <span
                        key={type}
                        className="text-xs px-2 py-0.5 rounded-full bg-[#6a9ae73d] text-gray-800 capitalize"
                    >
            {type}
          </span>
                ))}
            </div>
        </div>
    );
}
