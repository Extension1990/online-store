import { createFeature, createReducer, on } from "@ngrx/store";
import { authActions } from "./auth-actions";

export type AuthState = {
    token: string | null;
    userId: number | null;
    error: string | null;
    isLoading: boolean;
};

export const initialAuthState: AuthState = {
    token: null,
    userId: null,
    error: null,
    isLoading: false
};

export const authFeatures = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialAuthState,

        on(authActions.loginSuccess, (state: any, { token }: any) => ({
            ...state,
            token,
            isLoading: false
        })),

        on(authActions.loginFailure, (state: any, { error }: any) => ({
            ...state,
            token: null,
            error
        })),

        on(authActions.login, (state: any) => ({
            ...state,
            isLoading: true,
            error: null
        })),

        on(authActions.registerSuccess, (state: any) => ({
            ...state,
            isLoading: false
        })),

        on(authActions.registerFailure, (state: any, { error }: any) => ({
            ...state,
            isLoading: false,
            error
        })),
    )
})