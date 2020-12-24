import { gql } from 'apollo-server-express';

const RootMutationDef = gql`
  """
  Lowest *mutation* node in the tree. 
  """
  type RootMutation {
    """
    Create mess items.
    """
      createMessItem(input: MessItemInput!): MessItemPayload!
  }
`;

export default RootMutationDef;
