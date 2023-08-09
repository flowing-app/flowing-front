import { Searcher } from "fast-fuzzy"
import { useMemo } from "react"

export const getSearcher = <Item extends string | object>(
  items: Item[],
  keySelector: (item: Item) => string,
) => {
  const searcher = new Searcher(items, { keySelector, threshold: 0 })
  return (query: string) => searcher.search(query)
}

export const useFuzzySearch = <Item extends string | object>(
  items: Item[],
  keySelector: (item: Item) => string,
  query: string,
) => {
  const searcher = useMemo(() => getSearcher(items, keySelector), [items, keySelector])
  return query.length === 0 ? items : searcher(query)
}
