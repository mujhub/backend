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
    LUNCH
    HITEA
    DINNER
  }

  """
  Filter argument options for messItems()
  """
  input MessItemFilter {
    _id: StringFilter
    name: StringFilter
    mealTime: StringFilter
    timestamp: IntRangeFilter
  }

  """
  Sort argument options for messItems().
  Multiple fields sort is not possible. Server will ignore extra fields.
  Order of preference: _id, name, mealTime, timestamp.
  """
  input MessItemOrderBy {
    _id: Sort
    name: Sort
    mealTime: Sort
    timestamp: Sort
  }

  """
  Input type for mutations on MessItem
  """
  input MessItemInput {
    name: String!
    mealTime: MealTime!
  }

  """
  Payload type for mutations on MessItem
  """
  type MessItemPayload {
    messItem: MessItem
  }
`;

export default MessItemDef;
