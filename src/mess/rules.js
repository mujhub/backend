import { rule } from "graphql-shield";
import { hasGrant } from "../shield-util.js";

export const canReadMessItems = rule({ cache: "contextual" })(async (_parent, _args, ctx, _info) => {
  return hasGrant(ctx.jwt, "mess:item:read");
});

export const canCreateMessItems = rule({ cache: "contextual" })(async (_parent, _args, ctx, _info) => {
  return hasGrant(ctx.jwt, "mess:item:create");
});

export const canDeleteMessItems = rule({ cache: "contextual" })(async (_parent, _args, ctx, _info) => {
  return hasGrant(ctx.jwt, "mess:item:delete");
});

export default {
  Query: {
    messItems: canReadMessItems,
  },
  Mutation: {
    createMessItem: canCreateMessItems,
    deleteMessItem: canDeleteMessItems,
  },
};
