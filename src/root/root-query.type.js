import { gql } from 'apollo-server-express';

const RootQueryDef = gql`
  """
  Lowest *query* node in the tree.
  """ 
  type RootQuery {
    """
    Get mess items
    """
    messItems(filter: MessItemFilter): [MessItem]
  }
`;

export default RootQueryDef;
