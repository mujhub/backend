import { makeExecutableSchema } from 'graphql-tools';

import { gql } from 'apollo-server-express';
import RootQueryDef from './root/root-query.type';
import RootMutationDef from './root/root-mutation.type';
import MessItemDef from './mess/mess.type';
import RootQueryResolver from './root/root-query.resolver';
import RootMutationResolver from './root/root-mutation.resolver';
import FilterDef from './filters.type';
import SortDef from './sort.type';

const SchemaDef = gql`
  """
  Lowest node in the tree.
  """
  schema {
    query: RootQuery,
    mutation: RootMutation,
  }
`;

// All type definitions
const typeDefs = [
  SchemaDef,
  MessItemDef,
  RootQueryDef,
  FilterDef,
  SortDef,
  RootMutationDef,
];

// All resolvers
const resolvers = [
  RootQueryResolver,
  RootMutationResolver,
];

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
