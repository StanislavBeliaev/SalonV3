import { http } from "./core";

const APPLICATION_ROLE = "CLIENT";

type AccountIdentifier =
  | {
      phone: string;
      mail?: never;
    }
  | {
      mail: string;
      phone?: never;
    };

export interface AccountExistsResponse {
  identifier: string | null;
  isExists: boolean;
}

export type SignInRequest = AccountIdentifier & { password: string };

export interface SignInResponse {
  status?: string;
}

export interface SignUpPasswordRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  role?: string;
  name?: string;
  surname?: string;
  city?: number | null;
  country?: string;
  smsCode?: string | null;
}

export interface SignUpPasswordResponse {
  token?: string;
  [key: string]: unknown;
}

export interface ConfirmSignInRequest {
  phone: string;
  smsCode: string;
}

export interface ConfirmSignInResponse {
  token?: string;
}

export interface SignUpCompleteRequest {
  name: string;
  surname?: string;
  cityId?: number | null;
  avatarId?: number | null;
  currentRole?: string;
}

export interface UserDto {
  id: string;
  name: string;
  surname?: string;
  email?: string;
  phone?: string;
  smallAvatar?: string;
  role: string;
  city?: {
    id: number;
    name: string;
  };
  salon?: Record<string, unknown>;
}

export const authApi = {
  checkAccountExists: async (
    payload: AccountIdentifier,
  ): Promise<AccountExistsResponse> => {
    const body = { ...payload, applicationRole: APPLICATION_ROLE };

    return http.post("/auth/account/exists", body);
  },

  signIn: async (payload: SignInRequest): Promise<SignInResponse> => {
    const body = { ...payload, applicationRole: APPLICATION_ROLE };

    return http.post("/auth/sign/in", body);
  },

  signUpWithPassword: async (
    payload: SignUpPasswordRequest,
  ): Promise<SignUpPasswordResponse> => {
    const body = {
      ...payload,
      role: payload.role ?? "CLIENT",
      smsCode: payload.smsCode ?? null,
    };

    return http.post(
      "/account/signup/password?set-cookie=true&remember-me=true",
      body,
    );
  },

  confirmSignIn: async (
    payload: ConfirmSignInRequest,
  ): Promise<ConfirmSignInResponse> => {
    return http.post("/account/signin/confirm?set-cookie=true", payload);
  },

  signUpComplete: async (
    payload: SignUpCompleteRequest,
  ): Promise<Record<string, unknown>> => {
    const body = {
      ...payload,
      applicationRole: APPLICATION_ROLE,
    };

    return http.post("/auth/sign/up/complete", body);
  },

  fetchCurrentUser: async (): Promise<UserDto> => {
    return http.get("/user/current");
  },

  logout: async (): Promise<void> => {
    await http.post("/auth/logout", {});
  },
};

