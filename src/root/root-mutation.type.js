import { gql } from 'apollo-server-express';

const RootMutationDef = gql`
  """
  Lowest *mutation* node in the tree. 
  """
  type RootMutation {
    """
    Create mess items.
    """
      createMessItem(name: String!, mealTime: MealTime!): MessItem!
  }
`;

export default RootMutationDef;
