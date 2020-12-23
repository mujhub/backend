import { gql } from 'apollo-server-express';

const FilterDef = gql`
  input StringFilter {
    eq: String!
  }

  input IntRangeFilter {
    gte: Int
    lte: Int
  }
`;

export default FilterDef;
