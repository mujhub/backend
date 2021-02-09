import { rule } from "graphql-shield";

export const hasGrant = (jwt, grant) => {
  let x = jwt["www.mujhub.com"].grants.includes(grant);
  console.log(x);
  return x;
}