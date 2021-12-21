import { createAction, props } from '@ngrx/store';

export const changeFilter = createAction('[Task Filter] Change Filter', props<{ buttonIdx: number }>());
