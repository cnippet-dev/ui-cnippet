const COSSISTANT_FACEHASH_PALETTE = [
  {
    className: "dark:bg-cnippet-pink/90 bg-cnippet-pink/40",
    routeColor: "hsla(314, 100%, 85%, 1)",
  },
  {
    className: "dark:bg-cnippet-yellow/90 bg-cnippet-yellow/40",
    routeColor: "hsla(58, 92%, 79%, 1)",
  },
  {
    className: "dark:bg-cnippet-blue/90 bg-cnippet-blue/40",
    routeColor: "hsla(218, 91%, 78%, 1)",
  },
  {
    className: "dark:bg-cnippet-orange/90 bg-cnippet-orange/40",
    routeColor: "hsla(19, 99%, 50%, 1)",
  },
  {
    className: "dark:bg-cnippet-green/90 bg-cnippet-green/40",
    routeColor: "hsla(156, 86%, 64%, 1)",
  },
] as const;

export const COSSISTANT_FACEHASH_COLOR_CLASSES =
  COSSISTANT_FACEHASH_PALETTE.map((entry) => entry.className);

export const COSSISTANT_FACEHASH_ROUTE_COLORS_DARK =
  COSSISTANT_FACEHASH_PALETTE.map((entry) => entry.routeColor);
