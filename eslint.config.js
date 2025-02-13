import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules", "tsconfig.*.json"], // ✅ tsconfig 파일 ESLint 검사 제외
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],

      // ✅ `any` 사용에 대한 경고만 표시 (에러 X)
      "@typescript-eslint/no-explicit-any": "warn",

      // ✅ `@ts-ignore`, `@ts-expect-error` 사용을 제한적으로 허용
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        {
          "ts-ignore": "allow-with-description", // 설명이 있는 경우 허용
          "ts-expect-error": true,
          "ts-nocheck": false, // 전체 무시 방지
          "ts-check": false,
        },
      ],

      // ✅ TypeScript의 명시적 `any` 사용을 줄이기 위한 설정
      "@typescript-eslint/no-unsafe-assignment": "warn",
      "@typescript-eslint/no-unsafe-return": "warn",
      "@typescript-eslint/no-unsafe-call": "warn",
      "@typescript-eslint/no-unsafe-member-access": "warn",
    },
  }
);
