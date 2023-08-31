export const convertOperationIdToReadableCase = (kebabOrSnake?: string) => {
  return kebabOrSnake == null
    ? ""
    : kebabOrSnake.replaceAll(/[-_]/g, " ").replaceAll(/(?<=[a-z])([A-Z])/g, " $1")
}
