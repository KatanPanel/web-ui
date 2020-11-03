export interface AuthState {
	token?: string;

	account: any | null;
}

export default {
	account: null,
} as AuthState;
