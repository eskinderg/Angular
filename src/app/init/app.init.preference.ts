import { IAppState } from "../reducers"
import { Store } from "@ngrx/store"
import { getDarkMode } from "../actions"

export function initializePreference(store: Store<IAppState>): () => void {
  return () => {
    store.dispatch(getDarkMode())
  }
}
