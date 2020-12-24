import { generateMongoFilterFromMessItemFilter, generateMongoSortFromMessItemOrderBy } from '../mess/mess-item.utils';

/**
 * Resolver for the RootQuery type.
 */
export default {
  RootQuery: {
    messItems: async (_parent, args, { models }) => {
      const { filter, orderBy } = args;

      const mongoFilter = filter ? generateMongoFilterFromMessItemFilter(filter) : {};
      const mongoSort = orderBy ? generateMongoSortFromMessItemOrderBy(orderBy) : {};

      return models.MessItem.find(mongoFilter).sort(mongoSort);
    },
  },
};
