import { createActionGroup, emptyProps, props } from "@ngrx/store";

export const authActions = createActionGroup({
    source: 'Auth',
    events: {
        login: props<{ username: string; password: string} >(),
        loginSuccess: props<{ token: string }>(),
        loginFailure: props<{ error: string }>(),

        register: props<{ id: number; username:string, email: string; password: string }>(),
        registerSuccess: emptyProps(),
        registerFailure: props<{ error: string }>()
    }
});