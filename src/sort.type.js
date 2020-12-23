import { gql } from 'apollo-server-express';

const SortDef = gql`
  enum Sort {
    asc,
    desc
  }
`;

export default SortDef;
