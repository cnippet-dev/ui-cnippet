"use client";

// Built-in character sets sorted by visual density (dense to sparse)
export const ASCII_CHARACTER_PALETTES = {
  balanced: "@#%*+:. ",
  contrast: "@%#*+=-:;  ",
  detailed:
    "$@B%8&WM#*oahkbdpqwmZ0OQLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
  minimal: "@#*+:. ",
} as const;

export type AsciiCharacterPalette = keyof typeof ASCII_CHARACTER_PALETTES;
