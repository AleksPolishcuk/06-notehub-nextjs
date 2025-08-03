import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    typedRoutes: false, // Вимкнути строгу типізацію маршрутів
  },
  typescript: {
    ignoreBuildErrors: true, // Тимчасово ігнорувати помилки TypeScript
  },
};
export default nextConfig;
