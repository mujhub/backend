import { rule } from "graphql-shield";

export const hasGrant = (jwt, grant) => {
  return jwt["www.mujhub.com"].grants.includes(grant);
}