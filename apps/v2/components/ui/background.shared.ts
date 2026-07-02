import {
  ASCII_CHARACTER_PALETTES,
  type AsciiCharacterPalette,
} from "./ascii-image";

export const MAX_BACKGROUND_FIELD_CELLS = 9000;
export const MAX_BACKGROUND_ASCII_CELLS = 20_000;
export const DEFAULT_BACKGROUND_DESKTOP_RESOLUTION = 0.06;
export const DEFAULT_BACKGROUND_MOBILE_RESOLUTION = 0.08;
export const DEFAULT_BACKGROUND_DESKTOP_FPS = 31;
export const DEFAULT_BACKGROUND_MOBILE_FPS = 8;
export const DEFAULT_BACKGROUND_POINTER_TRAIL_INTENSITY = 0.3;
export const DEFAULT_BACKGROUND_POINTER_TRAIL_RADIUS = 0.05;
export const DEFAULT_BACKGROUND_POINTER_TRAIL_LIFETIME_MS = 1350;
export const MAX_BACKGROUND_POINTER_TRAIL_BLOBS = 20;
export const MIN_BACKGROUND_POINTER_TRAIL_DISTANCE_PX = 18;
export const MIN_BACKGROUND_POINTER_TRAIL_INTERVAL_MS = 32;

const TAU = Math.PI * 2;

export type BackgroundEmitter = {
  centerX: number;
  centerY: number;
  orbitRadiusX: number;
  orbitRadiusY: number;
  phase: number;
  speed: number;
  spread: number;
  weight: number;
};

export type BackgroundGridDimensions = {
  asciiCellHeight: number;
  asciiCellWidth: number;
  asciiCols: number;
  asciiRows: number;
  fieldCellHeight: number;
  fieldCellWidth: number;
  fieldCols: number;
  fieldRows: number;
};

type BackgroundGridInput = {
  height: number;
  maxAsciiCells?: number;
  maxFieldCells?: number;
  resolution: number;
  width: number;
};

type ResponsiveValueInput = {
  desktopValue: number;
  explicitValue?: number;
  isMobile: boolean;
  mobileValue: number;
};

type BackgroundConfigInput = {
  accentColorVar: string;
  characterPalette?: AsciiCharacterPalette;
  characters?: string;
  desktopResolution: number;
  fieldOpacity: number;
  fps?: number;
  interactive: boolean;
  isMobile: boolean;
  mobileFps: number;
  mobileResolution: number;
  pointerTrail?: boolean;
  pointerTrailIntensity?: number;
  pointerTrailLifetimeMs?: number;
  pointerTrailRadius?: number;
  reactivity: number;
  resolution?: number;
  reverse: boolean;
  seed?: number;
  speed: number;
  strength: number;
};

type BackgroundAnimationGateInput = {
  documentVisible: boolean;
  isVisible: boolean;
  prefersReducedMotion: boolean;
  speed: number;
};

type BackgroundPointerInput = {
  hasFinePointer: boolean;
  interactive: boolean;
};

type PointerTrailSpawnInput = {
  distancePx: number;
  elapsedMs: number;
  hasPreviousSpawn: boolean;
  minDistancePx?: number;
  minIntervalMs?: number;
};

type PointerTrailFadeInput = {
  currentTimeMs: number;
  lifetimeMs: number;
  spawnedAtMs: number;
};

type PointerTrailBlobStateInput = {
  currentTimeMs: number;
  intensity: number;
  lifetimeMs: number;
  radius: number;
  spawnedAtMs: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

type PointerTrailAnimationInput = {
  hasFinePointer: boolean;
  interactive: boolean;
  pointerTrail: boolean;
  prefersReducedMotion: boolean;
};

export type BackgroundResolvedConfig = {
  accentColorVar: string;
  asciiResolution: number;
  characters: string;
  fieldOpacity: number;
  interactive: boolean;
  pointerTrail: boolean;
  pointerTrailIntensity: number;
  pointerTrailLifetimeMs: number;
  pointerTrailRadius: number;
  reactivity: number;
  reverse: boolean;
  seed: number;
  speed: number;
  strength: number;
  targetFps: number;
};

export type PointerTrailPool = {
  active: Uint8Array;
  intensity: Float32Array;
  maxBlobs: number;
  nextIndex: number;
  radius: Float32Array;
  size: number;
  spawnedAtMs: Float64Array;
  velocityX: Float32Array;
  velocityY: Float32Array;
  x: Float32Array;
  y: Float32Array;
};

export type PointerTrailBlob = {
  intensity: number;
  radius: number;
  spawnedAtMs: number;
  velocityX: number;
  velocityY: number;
  x: number;
  y: number;
};

export type PointerTrailBlobState = {
  alpha: number;
  radius: number;
  x: number;
  y: number;
};

export function clampUnit(value: number) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(1, Math.max(0, value));
}

export function smoothstep(edge0: number, edge1: number, value: number) {
  if (edge0 === edge1) {
    return clampUnit(value >= edge1 ? 1 : 0);
  }

  const normalized = clampUnit((value - edge0) / (edge1 - edge0));
  return normalized * normalized * (3 - 2 * normalized);
}

export function normalizeSeed(seed: number) {
  if (!Number.isFinite(seed)) {
    return 1;
  }

  const normalized = Math.abs(Math.floor(seed)) % 2_147_483_647;
  return normalized === 0 ? 1 : normalized;
}

export function normalizeFieldValue(
  value: number,
  minimum: number,
  maximum: number,
) {
  if (!Number.isFinite(value)) {
    return 0;
  }

  if (
    !(Number.isFinite(minimum) && Number.isFinite(maximum)) ||
    minimum >= maximum
  ) {
    return 0.5;
  }

  return smoothstep(0, 1, (value - minimum) / (maximum - minimum));
}

function createSeededRandom(seed: number) {
  let state = normalizeSeed(seed) >>> 0;

  return () => {
    state += 0x6d_2b_79_f5;
    let next = Math.imul(state ^ (state >>> 15), state | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function scaleGridToCellBudget({
  width,
  height,
  cellWidth,
  cellHeight,
  maxCells,
}: {
  width: number;
  height: number;
  cellWidth: number;
  cellHeight: number;
  maxCells: number;
}) {
  let nextCellWidth = cellWidth;
  let nextCellHeight = cellHeight;
  let cols = Math.max(1, Math.floor(width / nextCellWidth));
  let rows = Math.max(1, Math.floor(height / nextCellHeight));

  const totalCells = cols * rows;
  if (totalCells > maxCells) {
    const scale = Math.sqrt(totalCells / maxCells);
    nextCellWidth = Math.ceil(nextCellWidth * scale);
    nextCellHeight = Math.ceil(nextCellHeight * scale);
    cols = Math.max(1, Math.floor(width / nextCellWidth));
    rows = Math.max(1, Math.floor(height / nextCellHeight));
  }

  return {
    cellHeight: nextCellHeight,
    cellWidth: nextCellWidth,
    cols,
    rows,
  };
}

export function computeBackgroundGridDimensions({
  height,
  maxAsciiCells = MAX_BACKGROUND_ASCII_CELLS,
  maxFieldCells = MAX_BACKGROUND_FIELD_CELLS,
  resolution,
  width,
}: BackgroundGridInput): BackgroundGridDimensions | null {
  if (width <= 0 || height <= 0) {
    return null;
  }

  const normalizedResolution =
    Number.isFinite(resolution) && resolution > 0 ? resolution : 0.1;
  const asciiCellWidth = Math.max(6, Math.round(normalizedResolution * 64));
  const asciiCellHeight = Math.max(10, Math.round(asciiCellWidth * 1.82));

  const asciiGrid = scaleGridToCellBudget({
    cellHeight: asciiCellHeight,
    cellWidth: asciiCellWidth,
    height,
    maxCells: maxAsciiCells,
    width,
  });
  const fieldCellSize = Math.max(10, Math.round(asciiGrid.cellWidth * 1.45));
  const fieldGrid = scaleGridToCellBudget({
    cellHeight: fieldCellSize,
    cellWidth: fieldCellSize,
    height,
    maxCells: maxFieldCells,
    width,
  });

  return {
    asciiCellHeight: asciiGrid.cellHeight,
    asciiCellWidth: asciiGrid.cellWidth,
    asciiCols: asciiGrid.cols,
    asciiRows: asciiGrid.rows,
    fieldCellHeight: fieldGrid.cellHeight,
    fieldCellWidth: fieldGrid.cellWidth,
    fieldCols: fieldGrid.cols,
    fieldRows: fieldGrid.rows,
  };
}

export function createAuroraEmitters(seed: number) {
  const random = createSeededRandom(seed);

  return Array.from(
    { length: 4 },
    (): BackgroundEmitter => ({
      centerX: 0.18 + random() * 0.64,
      centerY: 0.18 + random() * 0.64,
      orbitRadiusX: 0.08 + random() * 0.22,
      orbitRadiusY: 0.08 + random() * 0.2,
      phase: random() * TAU,
      speed: 0.16 + random() * 0.44,
      spread: 0.02 + random() * 0.055,
      weight: 0.55 + random() * 0.95,
    }),
  );
}

export function resolveResponsiveValue({
  desktopValue,
  explicitValue,
  isMobile,
  mobileValue,
}: ResponsiveValueInput) {
  if (Number.isFinite(explicitValue) && (explicitValue as number) > 0) {
    return explicitValue as number;
  }

  return isMobile ? mobileValue : desktopValue;
}

export function resolveBackgroundCharacters({
  characterPalette,
  characters,
}: {
  characterPalette?: AsciiCharacterPalette;
  characters?: string;
}) {
  if (characters && characters.trim().length > 0) {
    return characters;
  }

  return ASCII_CHARACTER_PALETTES[characterPalette ?? "detailed"];
}

export function resolveBackgroundConfig({
  accentColorVar,
  characterPalette,
  characters,
  desktopResolution,
  fieldOpacity,
  fps,
  interactive,
  isMobile,
  mobileFps,
  mobileResolution,
  pointerTrail = true,
  pointerTrailIntensity = DEFAULT_BACKGROUND_POINTER_TRAIL_INTENSITY,
  pointerTrailLifetimeMs = DEFAULT_BACKGROUND_POINTER_TRAIL_LIFETIME_MS,
  pointerTrailRadius = DEFAULT_BACKGROUND_POINTER_TRAIL_RADIUS,
  reactivity,
  resolution,
  reverse,
  seed,
  speed,
  strength,
}: BackgroundConfigInput): BackgroundResolvedConfig {
  return {
    accentColorVar,
    asciiResolution: resolveResponsiveValue({
      desktopValue: desktopResolution,
      explicitValue: resolution,
      isMobile,
      mobileValue: mobileResolution,
    }),
    characters: resolveBackgroundCharacters({
      characterPalette,
      characters,
    }),
    fieldOpacity: clampUnit(fieldOpacity),
    interactive,
    pointerTrail,
    pointerTrailIntensity: clampUnit(pointerTrailIntensity),
    pointerTrailLifetimeMs: Math.max(100, Math.round(pointerTrailLifetimeMs)),
    pointerTrailRadius: Math.min(0.4, Math.max(0.04, pointerTrailRadius)),
    reactivity: clampUnit(reactivity),
    reverse,
    seed: normalizeSeed(seed ?? 1),
    speed: Math.max(0, speed),
    strength: Math.max(0, strength),
    targetFps: Math.max(
      1,
      resolveResponsiveValue({
        desktopValue: DEFAULT_BACKGROUND_DESKTOP_FPS,
        explicitValue: fps,
        isMobile,
        mobileValue: mobileFps,
      }),
    ),
  };
}

export function shouldAnimateBackground({
  documentVisible,
  isVisible,
  prefersReducedMotion,
  speed,
}: BackgroundAnimationGateInput) {
  return isVisible && documentVisible && !prefersReducedMotion && speed > 0;
}

export function shouldUseInteractivePointer({
  hasFinePointer,
  interactive,
}: BackgroundPointerInput) {
  return interactive && hasFinePointer;
}

export function shouldAnimatePointerTrail({
  hasFinePointer,
  interactive,
  pointerTrail,
  prefersReducedMotion,
}: PointerTrailAnimationInput) {
  return pointerTrail && interactive && hasFinePointer && !prefersReducedMotion;
}

export function shouldSpawnPointerTrailBlob({
  distancePx,
  elapsedMs,
  hasPreviousSpawn,
  minDistancePx = MIN_BACKGROUND_POINTER_TRAIL_DISTANCE_PX,
  minIntervalMs = MIN_BACKGROUND_POINTER_TRAIL_INTERVAL_MS,
}: PointerTrailSpawnInput) {
  if (!hasPreviousSpawn) {
    return true;
  }

  return distancePx >= minDistancePx || elapsedMs >= minIntervalMs;
}

export function getPointerTrailFade({
  currentTimeMs,
  lifetimeMs,
  spawnedAtMs,
}: PointerTrailFadeInput) {
  if (!Number.isFinite(lifetimeMs) || lifetimeMs <= 0) {
    return 0;
  }

  const age = Math.max(0, currentTimeMs - spawnedAtMs);
  if (age >= lifetimeMs) {
    return 0;
  }

  const progress = clampUnit(age / lifetimeMs);
  const delayedProgress = clampUnit((progress - 0.06) / 0.94);
  return (1 - delayedProgress) ** 0.8;
}

export function getPointerTrailBlobState({
  currentTimeMs,
  intensity,
  lifetimeMs,
  radius,
  spawnedAtMs,
  velocityX,
  velocityY,
  x,
  y,
}: PointerTrailBlobStateInput): PointerTrailBlobState | null {
  const fade = getPointerTrailFade({
    currentTimeMs,
    lifetimeMs,
    spawnedAtMs,
  });
  if (fade <= 0) {
    return null;
  }

  const progress = clampUnit((currentTimeMs - spawnedAtMs) / lifetimeMs);
  const drift = 0.06 + progress * 0.18;

  return {
    alpha: fade * clampUnit(intensity),
    radius: Math.max(0.01, radius) * (1 + progress * 0.4),
    x: x + velocityX * drift,
    y: y + velocityY * drift,
  };
}

export function createPointerTrailPool(
  maxBlobs = MAX_BACKGROUND_POINTER_TRAIL_BLOBS,
): PointerTrailPool {
  return {
    active: new Uint8Array(maxBlobs),
    intensity: new Float32Array(maxBlobs),
    maxBlobs,
    nextIndex: 0,
    radius: new Float32Array(maxBlobs),
    size: 0,
    spawnedAtMs: new Float64Array(maxBlobs),
    velocityX: new Float32Array(maxBlobs),
    velocityY: new Float32Array(maxBlobs),
    x: new Float32Array(maxBlobs),
    y: new Float32Array(maxBlobs),
  };
}

export function writePointerTrailBlob(
  pool: PointerTrailPool,
  blob: PointerTrailBlob,
) {
  const slot = pool.nextIndex;

  pool.active[slot] = 1;
  pool.intensity[slot] = clampUnit(blob.intensity);
  pool.radius[slot] = Math.max(0.01, blob.radius);
  pool.spawnedAtMs[slot] = blob.spawnedAtMs;
  pool.velocityX[slot] = blob.velocityX;
  pool.velocityY[slot] = blob.velocityY;
  pool.x[slot] = blob.x;
  pool.y[slot] = blob.y;
  pool.nextIndex = (slot + 1) % pool.maxBlobs;
  pool.size = Math.min(pool.size + 1, pool.maxBlobs);

  return slot;
}
