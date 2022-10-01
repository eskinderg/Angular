import { Store } from "@ngrx/store"
import { getDarkMode } from "./actions/preference.action"
import { AppState } from "./reducers"

export function initializeApp(store: Store<AppState>) {
  return () => {
    store.dispatch(getDarkMode())
  }
}
