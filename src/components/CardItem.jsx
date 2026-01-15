const FALLBACK_IMG =
  "https://archives.bulbagarden.net/media/upload/3/36/Poké_Ball_artwork.png";

export default function CardItem({
  card,
  onClick,
  owned,
  showRarity = true,
  className = "",
}) {
  const imageSrc =
    card?.images?.small ||
    card?.images?.large ||
    card?.imageUrl ||
    card?.image ||
    "https://archives.bulbagarden.net/media/upload/3/36/Pok%C3%A9_Ball_artwork.png";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left rounded-lg px-3 pt-3 pb-2 shadow transition ${className}`}
    >
      <div className="w-full aspect-[2/3] rounded-md overflow-hidden bg-gray-950/40">
        <img
          src={imageSrc}
          alt={card?.name || "Card"}
          loading="lazy"
          decoding="async"
          className="w-full h-full "
        />
      </div>

      <div className="mt-2 text-center">
        <h3 className="text-xs font-semibold text-gray-100 truncate">
          {card?.name || "Unknown"}
        </h3>

        {showRarity && (
          <p className="text-[10px] text-gray-400">
            {card?.rarity || "Unknown"}
          </p>
        )}

        {typeof owned === "boolean" && (
          <p className="text-[10px] mt-1 text-gray-400">
            {owned ? "Owned" : "Missing"}
          </p>
        )}
      </div>
    </button>
  );
}
