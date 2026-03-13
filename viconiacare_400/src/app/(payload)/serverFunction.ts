"use server";

import { handleServerFunctions } from "@payloadcms/next/layouts";
import configPromise from "@payload-config";
import { importMap } from "./admin/importMap.js";
import type { ServerFunctionClient } from "payload";

export const serverFunction: ServerFunctionClient = async (args) => {
  return handleServerFunctions({
    ...args,
    config: configPromise,
    importMap,
  });
};
