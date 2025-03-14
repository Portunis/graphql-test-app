import {gql} from "@apollo/client/core";

const GET_MUSIC = gql`
  query getMusicList {
    getMusicList{
      id
      title
      description
      authorId
      url
      author {
        id
        email
      }


    }
  }
`;

export {GET_MUSIC};
