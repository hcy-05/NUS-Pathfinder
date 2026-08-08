import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The on-screen dev badge sits over the sidebar footer. This only affects
  // `next dev` — compile and runtime errors are still surfaced with it off.
  // Delete this line if you'd rather keep the badge while developing.
  devIndicators: false,
};

export default nextConfig;
