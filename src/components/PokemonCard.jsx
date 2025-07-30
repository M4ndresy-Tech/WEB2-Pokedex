export default function PokemonCard({ name, image, types = [], theme }) {
    const getCardClass = () => {
        switch (theme) {
            case "light":
                return "bg-white text-gray-800";
            case "dark":
                return "bg-gray-800 text-white";
            default:
                return "bg-white text-gray-800";
        }
    };

    const getTypeBadgeClass = () => {
        switch (theme) {
            case "light":
                return "bg-[#6a9ae73d] text-gray-800";
            case "dark":
                return "bg-[#4a6ab73d] text-white";
            default:
                return "bg-[#6a9ae73d] text-gray-800";
        }
    };

    return (
        <div className={`p-4 rounded shadow text-center hover:scale-105 transition ${getCardClass()}`}>
            <img src={image} alt={name} className="mx-auto w-20 h-20" />
            <h2 className="mt-2 font-semibold capitalize">{name}</h2>

            {/* Affichage des types */}
            <div className="mt-1 flex justify-center gap-2 flex-wrap">
                {types.map((type) => (
                    <span
                        key={type}
                        className={`bg-${type} text-xs px-2 py-0.5 rounded-full capitalize ${getTypeBadgeClass()}`}
                    >
            {type}
          </span>
                ))}
            </div>
        </div>
    );
}