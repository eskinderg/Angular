import { AdminEffect } from 'src/app/admin/store/effects/admin.effect';
import { AuthEffect } from './auth.effect';
import { EventsEffect } from './events.effect';
import { MoviesEffect } from './movie.effect';
import { NotesEffect } from './note.effects';
import { PreferenceEffect } from './preference.effect';
import { RouterEffect } from './router.effect';

export * from './auth.effect';
export * from './note.effects';
export * from './events.effect';
export * from './preference.effect';
export * from './router.effect';

export const appEffects = [
    NotesEffect,
    EventsEffect,
    AuthEffect,
    PreferenceEffect,
    MoviesEffect,
    AdminEffect,
    RouterEffect
];
