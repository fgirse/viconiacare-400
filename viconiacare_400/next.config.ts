import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  // Intentionally left minimal; Payload wraps this config via withPayload.
};

export default withPayload(nextConfig);
