import { gql } from "apollo-server-express";

const EateriesItemsDef = gql`
    type Query {
        """
        Get eateries details with all their items
        """
        getEateryItems(eateryId: ID!): [Item]

        """
        Get Eatery Items
        """
        eateryItems(
            filter: EateriesItemsFilter
            orderBy: EateriesItemSortBy
        ): [Item]!
    }
    type Mutation {
        """
        Post details of items of eateries/Updating items array in particular eatery
        """
        createEateriesItems(eateryId: ID!, input: EateriesItemsInput!): Item!

        """
        Updating items of eateries(Only price as of now )
        """
        updateItem(itemId: ID!, input: updateItemInput!): Item!

        """
        Deleting multiple eatery items
        """
        deleteItems(filter: EateriesItemsFilter): DeleteEateriesItemPayload
    }

    """
    Item type containning description of the items
    """
    type Item {
        """
        String represntation of objectId of MongoDB
        """
        _id: ID!
        """
        Name of the item
        """
        itemName: String!
        """
        Category in which item lies
        """
        category: Category!
        """
        Price of the item
        """
        price: Int!
        """
        Reference id of the eatery to which the item belongs to
        """
        itemOf: Eateries!
    }

    """
    Category types for eatery items
    """
    enum Category {
        Snacks
        Sweets
        Drinks
    }

    """
    Input type of posting item details
    """
    input EateriesItemsInput {
        itemName: String!
        price: Int!
        category: Category!
    }

    """
    Fiter argument options for eateriesItems
    """
    input EateriesItemsFilter {
        itemName: StringFilter
        price: IntRangeFilter
        category: StringFilter
    }

    """
    Sort argument options for eateriesItems
    """
    input EateriesItemSortBy {
        itemName: Sort
        price: Sort
        category: Sort
    }

    input updateItemInput {
        itemName: String
        price: Int
        category: Category
    }

    """
    Payload type for mutation on deleting eatery item
    """
    type DeleteEateriesItemPayload {
        found: Int!
        success: Int!
        deletedCount: Int!
    }
`;

export default EateriesItemsDef;
