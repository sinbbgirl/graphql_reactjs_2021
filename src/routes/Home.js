import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

const GET_MOVIESs = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

export default () => {
  const { loading, error, data } = useQuery(GET_MOVIESs);
  console.log(loading, error, data);
  if(loading){
      return "loading..."
  }
  if(data&&data.movies){
      return data.movies.map((m,i)=><h1 key={i}>{m.id}</h1>)
  }
};
