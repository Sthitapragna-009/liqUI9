/*!
 * LiqUI React wrapper — MIT License, (c) 2026 KSP.
 * Thin component around kit/liqui-glass.js. Works in React apps and Remotion compositions
 * (Remotion renders in headless Chromium, where the SVG refraction is supported).
 * Remember to import kit/liqui.css once in your app.
 */
import React, { useEffect, useRef } from "react";
import { glass } from "../liqui-glass.js";

type Variant = "regular" | "clear" | "tinted";

export type LiquidGlassProps = React.HTMLAttributes<HTMLElement> & {
  as?: keyof JSX.IntrinsicElements;
  variant?: Variant;
  /** Press squish + light flare. Use on buttons and other tappable glass. */
  interactive?: boolean;
  /** Displacement strength at the rim in px (default scales with size, max 38). */
  refr?: number;
  /** Pre-blur in px. 0 = no frost (Clear). */
  frost?: number;
  /** Centre magnification, 0–0.3. */
  zoom?: number;
  /** Rim and sheen intensity, ~0.6–1.4. */
  light?: number;
  /** Light direction in degrees (135 = top-left). */
  angle?: number;
  /** 0–1 black layer under clear glass over bright media (HIG suggests ~0.35). */
  dim?: number;
  /** Corner radius in px; defaults to the element's computed border-radius. */
  radius?: number;
};

export const LiquidGlass: React.FC<LiquidGlassProps> = ({
  as = "div", variant = "regular", interactive, refr, frost, zoom, light, angle, dim, radius,
  children, ...rest
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const api = useRef<{ update: (o: object) => void; destroy: () => void } | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    api.current = glass(ref.current, { variant, interactive });
    return () => { api.current?.destroy(); api.current = null; };
    // Variant and interactivity change the layer classes, so rebuild when they change.
  }, [variant, interactive]);

  useEffect(() => {
    const next: Record<string, number> = {};
    for (const [k, v] of Object.entries({ refr, frost, zoom, light, angle, dim, radius })) if (v !== undefined) next[k] = v;
    if (Object.keys(next).length) api.current?.update(next);
  }, [refr, frost, zoom, light, angle, dim, radius]);

  return React.createElement(as, { ...rest, ref }, children);
};

export default LiquidGlass;
