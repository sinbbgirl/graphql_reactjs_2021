import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import Movie from "../components/Movie";

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      title
      language
      rating
      description_intro
      medium_cover_image
    }
    suggestions(id: $id) {
      id
      medium_cover_image
    }
  }
`;

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 28px;
`;

const Poster = styled.div`
  width: 20%;
  height: 65%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
`;

const S_Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const S_Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  /*position: relative;
  top: -50px;*/
`;

export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: Number(id) },
  });
  return (
    <>
      <Container>
        <Column>
          <Title>{loading ? "Loading..." : data.movie.title}</Title>
          <Subtitle>
            {data?.movie?.language} · {data?.movie?.rating}
          </Subtitle>
          <Description>{data?.movie?.description_intro}</Description>
        </Column>
        <Poster bg={data?.movie?.medium_cover_image}></Poster>
      </Container>
      <S_Container>
        <Title>Suggestions For You</Title>
        <S_Movies>
          {data?.suggestions?.map((sm) => (
            <Movie key={sm.id} id={sm.id} bg={sm.medium_cover_image} />
          ))}
        </S_Movies>
      </S_Container>   
    </>
  );
};
