import { gql } from "apollo-server-express";

const RootMutationDef = gql`
  type RootMutation {
      createMessItem(name: String!, mealTime: MealTime!): MessItem!
  }
`;

export default RootMutationDef;