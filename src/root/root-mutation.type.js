import { gql } from 'apollo-server-express';

const RootMutationDef = gql`
  """
  Lowest *mutation* node in the tree. 
  """
  type RootMutation {
    """
    Create mess items.
    """
    createMessItem(input: MessItemInput!): CreateMessItemPayload!

    """
    Delete mess items that match filter.
    """
    deleteMessItem(filter: MessItemFilter!): DeleteMessItemPayload!
  }
`;

export default RootMutationDef;
