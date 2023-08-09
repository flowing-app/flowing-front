export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!
if (API_BASE_URL == null) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined")
}
