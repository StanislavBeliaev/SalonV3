import { create } from "zustand";

import {
  authApi,
  ConfirmSignInRequest,
  SignInRequest,
  SignUpPasswordRequest,
  SignUpPasswordResponse,
  UserDto,
} from "../../../api/auth";

type AuthStatus = "idle" | "loading" | "error";

export interface AuthStore {
  user: UserDto | null;
  status: AuthStatus;
  error: string | null;
  pendingVerification: {
    value: string;
    channel: "phone" | "mail";
    smsRequired: boolean;
  } | null;
  loadUser: () => Promise<UserDto | null>;
  login: (payload: SignInRequest) => Promise<UserDto | null>;
  register: (
    payload: SignUpPasswordRequest,
  ) => Promise<{ response: SignUpPasswordResponse; smsRequired: boolean }>;
  confirmSms: (payload: ConfirmSignInRequest) => Promise<UserDto | null>;
  logout: () => Promise<void>;
  resetError: () => void;
  clearPendingSms: () => void;
}

interface ApiErrorLike {
  message?: string;
  status?: number;
  data?: {
    message?: string;
  };
}

const resolveErrorMessage = (error: unknown): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data?: unknown }).data === "object" &&
    (error as { data?: { message?: string } }).data?.message
  ) {
    return (error as { data: { message: string } }).data.message;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  return "Произошла ошибка. Попробуйте ещё раз.";
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  status: "idle",
  error: null,
  pendingVerification: null,

  loadUser: async () => {
    set({ status: "loading", error: null });
    try {
      const user = await authApi.fetchCurrentUser();
      set({ user, status: "idle" });
      return user;
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        (error as ApiErrorLike).status === 401
      ) {
        set({ status: "idle", user: null, error: null });
        return null;
      }
      set({ status: "error", error: resolveErrorMessage(error) });
      return null;
    }
  },

  login: async (payload) => {
    set({ status: "loading", error: null });
    try {
      await authApi.signIn(payload);
      const user = await authApi.fetchCurrentUser();
      set({ user, status: "idle", pendingVerification: null });
      return user;
    } catch (error) {
      set({ status: "error", error: resolveErrorMessage(error) });
      throw error;
    }
  },

  register: async (payload) => {
    set({ status: "loading", error: null });
    try {
      const response = await authApi.signUpWithPassword(payload);
      const smsRequired = !response?.token;

      if (smsRequired) {
        set({
          pendingVerification: {
            value: payload.phone,
            channel: "phone",
            smsRequired: true,
          },
          status: "idle",
        });
      } else {
        const user = await authApi.fetchCurrentUser();
        set({ user, pendingVerification: null, status: "idle" });
      }

      return { response, smsRequired };
    } catch (error) {
      set({ status: "error", error: resolveErrorMessage(error) });
      throw error;
    }
  },

  confirmSms: async (payload) => {
    set({ status: "loading", error: null });
    try {
      await authApi.confirmSignIn(payload);
      const user = await authApi.fetchCurrentUser();
      set({ user, pendingVerification: null, status: "idle" });
      return user;
    } catch (error) {
      set({ status: "error", error: resolveErrorMessage(error) });
      throw error;
    }
  },

  logout: async () => {
    set({ status: "loading", error: null });
    try {
      await authApi.logout();
    } finally {
      set({ user: null, status: "idle", pendingVerification: null });
    }
  },

  resetError: () => {
    if (get().status === "error") {
      set({ status: "idle", error: null });
    } else {
      set({ error: null });
    }
  },

  clearPendingSms: () => {
    if (get().pendingVerification) {
      set({ pendingVerification: null });
    }
  },
}));