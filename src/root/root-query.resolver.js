/**
 * Resolver for the MessItem type.
 */
export default {
  RootQuery: {
    messItems: async (_parent, _args, { models }) => models.MessItem.find(),
  },
};
