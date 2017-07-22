// app-store.model.ts

import { Item, User } from './shared';
import { Event } from './theme/components/event/event';

export interface AppStore {
  users: User[];
  items: Item[];
  events: Event[];
}
