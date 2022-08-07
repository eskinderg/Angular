import { Store } from "@ngrx/store"
import { getTheme } from "./actions/profile.action"
import { AppState } from "./reducers"

export function initializeApp(store: Store<AppState>) {
  return () => {
    store.dispatch(getTheme())
  }
}
