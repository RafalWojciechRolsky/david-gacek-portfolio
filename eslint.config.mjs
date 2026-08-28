import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Project documentation, WDS tooling and the source scaffold:
    ".agents/**",
    "_bmad/**",
    "_bmad-output/**",
    ".devin/**",
    ".factory/**",
    ".impeccable/**",
    "design-artifacts/**",
    "docs/**",
    "tmp/**",
  ]),
]);

export default eslintConfig;
