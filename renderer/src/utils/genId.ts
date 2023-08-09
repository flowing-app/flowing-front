import { customAlphabet } from "nanoid/non-secure"

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", 8)

export const genId = () => nanoid()
