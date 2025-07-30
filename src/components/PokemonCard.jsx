export default function PokemonCard({name, image, types = [], theme, id}) {
    const getCardClass = () => {
        switch (theme) {
            case "light":
                return "bg-white text-gray-800 border-2 border-[#6a9ae7] shadow-md";
            case "dark":
                return "bg-gray-800 text-white border-2 border-gray-600 shadow-md";
            default:
                return "bg-white text-gray-800 border-2 border-[#6a9ae7] shadow-md";
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
        <div className={`relative p-4 rounded-lg text-center hover:scale-105 transition ${getCardClass()}`}>
            {/* Numéro en fond */}
            <div className={`absolute inset-0 flex pt-5 pl-5 text-6xl font-bold ${getNumberClass()} z-0`}>
                #{id.padStart(3, '0')}
            </div>
            {/* Contenu principal */}
            <div className="relative z-10">
                <img src={image} alt={name} className="mx-auto w-20 h-20"/>
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
        </div>
    );
}