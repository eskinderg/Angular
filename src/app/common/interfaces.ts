import { Event } from '../theme/components/event/event';

export interface AppState {
    Events: Event[];
    VisibilityFilter: any;
}

export interface Todo {
    id: number,
    text: string,
    complete: boolean
};

export interface TodoModel {
    filteredTodos: Todo[],
    totalTodos: number,
    completedTodos: number
}