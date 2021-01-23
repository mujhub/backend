import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import { gql } from 'apollo-server-express';
import { MessDef, MessResolvers } from "./mess";
import FilterDef from './filters.types';
import SortDef from './sort.types';

const SchemaDef = gql`
  """
  Lowest node in the tree.
  """
  schema {
    query: Query,
    mutation: Mutation,
  }
`;

// All type definitions
const typeDefs = [
  SchemaDef,
  MessDef,
  FilterDef,
  SortDef,
];
const mergedDefs = mergeTypeDefs(typeDefs);

// All resolvers
const resolvers = [
  MessResolvers
];
const mergedResolvers = mergeResolvers(resolvers);

const schema = makeExecutableSchema({
  typeDefs: mergedDefs,
  resolvers: mergedResolvers,
});

export default schema;
