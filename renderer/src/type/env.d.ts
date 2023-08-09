/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test"
    readonly ENV_TEST?: string
    readonly NEXT_PUBLIC_API_BASE_URL?: string
  }
}
