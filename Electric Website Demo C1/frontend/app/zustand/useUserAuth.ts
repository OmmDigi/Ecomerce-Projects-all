import { create } from "zustand";

interface IUserAuth {
  isAuthanticated: boolean;
  doLogout: () => void;
}

export const useUserAuth = create<IUserAuth>((set) => ({
  isAuthanticated: typeof window != "undefined" ?  localStorage.getItem("token") != null : false,
  doLogout: () => {
    return set(() => {
      localStorage.removeItem("token");
      return {
        isAuthanticated: false,
      };
    });
  },
}));
