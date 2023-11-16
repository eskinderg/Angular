import { AppState } from "../reducers"
import { Store } from "@ngrx/store"
import { getDarkMode } from "../actions"

export function initializePreference(store: Store<AppState>): () => void {
  return () => {
    store.dispatch(getDarkMode())
  }
}
