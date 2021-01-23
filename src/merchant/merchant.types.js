const { gql } = require("apollo-server-express");

const MerchantDef = gql`
    """
    Shop Details
    """
    type MerchantShop {
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
        timings: Timing!
        """
        Offers given by the shop
        """
        offers: [Offer]
        """
        Detailed description of the items present in shop
        """
        items: [Item!]!
    }

    """
    Timing type
    """
    type Timing {
        """
        Opening Time
        """
        to: String!
        """
        Closing Time
        """
        from: String!
    }

    """
    Offer type
    """
    type Offer {
        """
        Description of the offer
        """
        offer: String
    }

    """
    Item type containning description of the items
    """
    type Item {
        """
        String represntation of objectId of MongoDB
        """
        itemId: ID!
        """
        Name of the item
        """
        itemName: String!
        """
        Category in which item lies
        """
        category: String!
        """
        Price of the item
        """
        price: Int!
    }
`;

export default MerchantDef;
