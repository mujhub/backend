import { gql } from "apollo-server-express";

const EateriesDef = gql`
    type Mutation {
        """
        Post details of eateries
        """
        createEateriesDetails(input: EateriesDetailsInput!): Eateries!

        """
        Post details of items of eateries/Updating items array in particular eatery
        """
        createEateriesItems(
            eateryId: ID!
            input: EateriesItemsInput!
        ): Eateries!

        """
        Post offers on items of eateries
        """
        createEateriesOffers(input: EateriesOffersInput!): Eateries!
    }
    """
    Shop Details
    """
    type Eateries {
        """
        String represntation of objectId of MongoDB
        """
        _id: ID!
        """
        Name of the shop
        """
        name: String!
        """
        location of the shop
        """
        location: String!
        """
        timings of the shop
        """
        openingTime: String!
        closingTime: String!
        """
        Offers given by the shop
        """
        offers: [String!]!
        """
        Detailed description of the items present in shop
        """
        items: [Item!]!
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
    }

    enum Category {
        Snacks
        Sweets
        Drinks
    }

    """
    Eateries Details Input : takes basic details of shop as input
    """
    input EateriesDetailsInput {
        name: String!
        location: String!
        openingTime: String!
        closingTime: String!
    }

    """
    Eateries Items Input : takes basic details of items as input
    """
    input EateriesItemsInput {
        itemName: String!
        price: Int!
        category: Category!
    }

    """
    Eateries Offers Input : takes offer description as input
    """
    input EateriesOffersInput {
        offer: String!
    }
`;

export default EateriesDef;
