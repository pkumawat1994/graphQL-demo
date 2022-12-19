import { gql } from "@apollo/client";

// export const GET_LOCATIONS = gql`
//   query GetLocations {
//     locations {
//       id
//       name
//       description
//       photo
//     }
//   }
// `;
export const GET_LOCATIONS = gql`
  query ($options: PageQueryOptions) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      body
    }
  }
`;

// export const DELETE_USER = gql`
//   mutation DeleteUser($id: String!) {
//     deleteUser(id: $id)
//   }
// `;

// export const GET_USERS = gql`
//   {
//     getUsers {
//       id
//       name
//       job_title
//       email
//     }
//   }
// `;
// export const DELETE_DATA = gql`
//   type Mutation {
//     deleteUser(id: Int): Boolean
//   }
// `;

// export const CREATE_USER = gql`
//   mutation CreateUser($name: String, $description: String, $photo: String) {
//     createUser(name: $name, description: $description, photo: $photo)
//   }
// `;

// export const CREATE_USER = gql`
//   mutation CreateUser($name: String!) {
//     createUser({ name:$name! })
//   }
// `;

export const DELETE_USER = gql`
  mutation ($id: ID!) {
    deletePost(id: $id)
  }
`;
