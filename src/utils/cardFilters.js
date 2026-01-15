export const TYPE_FILTER_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "pokemon", label: "Pokémon" },
  { value: "trainer", label: "Trainer" },
  { value: "energy", label: "Energy" },
  { value: "special-forms", label: "EX / GX / V / Mega" },
  { value: "special-cards", label: "Special Cards" },
];

const SPECIAL_FORMS = ["EX", "GX", "V", "VMAX", "VSTAR", "MEGA"];
const SPECIAL_CARDS = [
  "SUPPORTER",
  "ITEM",
  "STADIUM",
  "ACE SPEC",
  "RADIANT",
  "ULTRA BEAST",
  "SECRET RARE",
];

export function matchesTypeFilter(card, filter) {
  if (!filter || filter === "all") return true;

  const supertype = card.supertype;
  const subtypes = (card.subtypes || []).map((t) => t.toUpperCase());

  switch (filter) {
    case "pokemon":
      return supertype === "Pokémon";
    case "trainer":
      return supertype === "Trainer";
    case "energy":
      return supertype === "Energy";
    case "special-forms":
      return subtypes.some((t) => SPECIAL_FORMS.includes(t));
    case "special-cards":
      return subtypes.some((t) => SPECIAL_CARDS.includes(t));
    default:
      return true;
  }
}
