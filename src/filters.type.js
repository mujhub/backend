import { gql } from 'apollo-server-express';

const FilterDef = gql`
  """
  Filter input for equality relation on String types.
  """
  input StringFilter {
    eq: String!
  }

  """
  Filter input for less-than-equal-to and greater-than-equal-to relations on Int type.
  Both, gte and lte can be provided for range, but only either one is required.
  """
  input IntRangeFilter {
    gte: Int
    lte: Int
  }
`;

export default FilterDef;
