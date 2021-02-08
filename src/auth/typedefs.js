import { gql } from 'apollo-server-express';

const AuthDef = gql`
  type Mutation {
    register(input: RegisterInput): RegisterPayload
    login(input: LoginInput): LoginPayload
    refresh(input: RefreshInput): RefreshPayload
  }

  input RegisterInput {
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RefreshInput {
    refreshToken: String!
  }

  type RegisterPayload {
    ack: Boolean!
  }

  type LoginPayload {
    accessToken: AuthToken
    refreshToken: AuthToken
  }

  type RefreshPayload {
    accessToken: AuthToken
    refreshToken: AuthToken
  }

  type AuthToken {
    exp: Int!
    jwt: String!
  }
`;

export default AuthDef;
