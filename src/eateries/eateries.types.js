import { gql } from "apollo-server-express";

const EateriesDef = gql`
    type Mutation {
        """
        Post details of eateries
        """
        createEateriesDetails(input: EateriesDetailsInput!): Eateries!

        """
        Post offers on items of eateries
        """
        createEateriesOffers(
            eateryId: ID!
            input: EateriesOffersInput!
        ): Eateries!
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
    Eateries Offers Input : takes offer description as input
    """
    input EateriesOffersInput {
        offer: String!
    }
`;

export default EateriesDef;
