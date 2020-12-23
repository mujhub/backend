import { makeExecutableSchema } from 'graphql-tools';

import { gql } from 'apollo-server-express';
import RootQueryDef from './root/root-query.type';
import MessItemDef from './mess/mess.type';
import RootQueryResolver from './root/root-query.resolver';
import FilterDef from './filters.type';
import SortDef from './sort.type';

const SchemaDef = gql`
  """
  Lowest node in the tree.
  """
  schema {
    query: RootQuery,
  }
`;

// All type definitions
const typeDefs = [
  SchemaDef,
  MessItemDef,
  RootQueryDef,
  FilterDef,
  SortDef,
];

// All resolvers
const resolvers = [
  RootQueryResolver,
];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
