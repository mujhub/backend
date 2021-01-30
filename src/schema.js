import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";

import { gql } from "apollo-server-express";

//Mess definitions
import { MessResolvers, MessDef } from "./mess/index.js";

//Eateries definition
import {
    EateriesDef,
    EateriesItemsDef,
    EateriesResolvers,
} from "./eateries/index.js";

import FilterDef from "./filters.types.js";
import SortDef from "./sort.types.js";

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
    MessDef,
    FilterDef,
    SortDef,
    EateriesDef,
];

const mergedDefs = mergeTypeDefs(typeDefs);

// All resolvers
const resolvers = [MessResolvers, EateriesResolvers];
const mergedResolvers = mergeResolvers(resolvers);

const schema = makeExecutableSchema({
    typeDefs: mergedDefs,
    resolvers: mergedResolvers,
});

export default schema;
