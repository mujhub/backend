import { createNewUser, loginUser, refresh } from "./services.js";

export default {
  Mutation: {
    register: async (_parent, args) => {
      const { email, password } = args.input;
      
      return await createNewUser({ email, password });
    },

    login: async (_parent, args) => {
      const { email, password } = args.input;

      return await loginUser({ email, password });
    },

    refresh: async (_parent, args) => {
      const { refreshToken } = args.input;

      return await refresh(refreshToken);
    }
  }
};
