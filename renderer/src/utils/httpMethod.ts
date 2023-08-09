export const HTTP_METHODS = [
  "get",
  "put",
  "post",
  "delete",
  "options",
  "head",
  "patch",
  "trace",
] as const

export type HttpMethod = (typeof HTTP_METHODS)[number]

export const HTTP_METHODS_COLORS = {
  get: "#61AF61", // ライトグリーン
  put: "#E87B35", // ゴールド
  post: "#4169E1", // ロイヤルブルー
  delete: "#F95252", // レッド
  options: "#FFA500", // オレンジ
  head: "#808080", // グレー
  patch: "#FF4500", // オレンジレッド
  trace: "#D3D3D3", // ライトグレー
}
