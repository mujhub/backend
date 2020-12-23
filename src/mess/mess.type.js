import { gql } from 'apollo-server-express';

const MessItemDef = gql`
  """
  Each MessItem is a dish made in Mess.
  """
  type MessItem {
    """
    String representation of ObjectId type of MongoDB.
    """
    _id: ID!
    """
    Name of the dish.
    """
    name: String!
    """
    Meal time enum (Breakfast, etc.).
    """
    mealTime: MealTime!
    """
    Unix Epoch respresentation of the time at which dish was added.
    """
    timestamp: Int!
  }

  """
  Enum types for Meal times (Breakfast, etc.).
  """
  enum MealTime {
      BREAKFAST
      LUNCHs
      HITEA
      DINNER
  }
`;

export default MessItemDef;
