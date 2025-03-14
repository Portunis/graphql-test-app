import gql from "graphql-tag";

const FORM_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`

export { FORM_MUTATION }
