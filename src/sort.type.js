import { gql } from 'apollo-server-express';

const SortDef = gql`
  """
  Enum for sort inputs.
  """
  enum Sort {
    asc,
    desc
  }
`;

export default SortDef;
