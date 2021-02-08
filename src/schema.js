import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import { gql } from 'apollo-server-express';
import { MessDef, MessResolvers } from "./mess";
import { EateriesDef, EateriesItemsDef, EateriesResolvers } from "./eateries/index.js";
import { AuthDef, AuthResolvers } from "./auth";
import FilterDef from './filters.types';
import SortDef from './sort.types';

const SchemaDef = gql`
    schema {
        query: Query
        mutation: Mutation
    }
`;

// All type definitions
const typeDefs = [
  SchemaDef,
  EateriesItemsDef,
  EateriesDef,
  MessDef,
  AuthDef,
  FilterDef,
  SortDef,
];

const mergedDefs = mergeTypeDefs(typeDefs);

// All resolvers
const resolvers = [
  MessResolvers,
  EateriesResolvers,
  AuthResolvers,
];
const mergedResolvers = mergeResolvers(resolvers);

const schema = makeExecutableSchema({
    typeDefs: mergedDefs,
    resolvers: mergedResolvers,
});

export default schema;
