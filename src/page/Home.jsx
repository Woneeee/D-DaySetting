import { useEffect, useState } from "react";
import { getDDay } from "../api";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff3f5;
  padding: 100px 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
  background-color: white;
  border-radius: 40px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 500;
`;

const Filter = styled.div``;

const Table = styled.div``;

export const Home = () => {
  const [data, setData] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  // 밖에서 쓸려고

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDDay(nowPage);
        setData(res.data.decisionData);
        setNowPage(res.data.pageInfo.nowPage);
        setMaxPage(res.data.pageInfo.maxPage);
      } catch (err) {
        console.log("API 에러:", err);
      }
    };

    fetchData();
  }, [nowPage]);

  return (
    <Container>
      <Wrapper>
        <Title>
          <h1>D-Day 설정 프로그램</h1>
        </Title>
        <Filter></Filter>

        <Table></Table>
      </Wrapper>
    </Container>
  );
};
