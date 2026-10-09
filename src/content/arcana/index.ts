import { arcana1To6 } from "./arcana-1-to-6";
import { arcana7To12 } from "./arcana-7-to-12";
import { arcana13To17 } from "./arcana-13-to-17";
import { arcana18To22 } from "./arcana-18-to-22";
import { ArcanaMeaning } from "./types";

export * from "./types";

export const allArcanaMeanings: Record<number, ArcanaMeaning> = {
  ...arcana1To6,
  ...arcana7To12,
  ...arcana13To17,
  ...arcana18To22,
};
