// components/AnalyticsLoader.tsx
// TIDAK ADA "use client"

import { GoogleAnalytics } from "@next/third-parties/google";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function AnalyticsLoader() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
