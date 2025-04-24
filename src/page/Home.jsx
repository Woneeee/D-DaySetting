import { useEffect, useState } from "react";
import { getDDay } from "../api";
import styled from "styled-components";
import { IoFilter } from "react-icons/io5";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff3f5;
  padding: 20px 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  background-color: white;
  border-radius: 30px;
  padding: 40px 30px;
`;

const Filter = styled.button`
  /* all: unset; */
  border: 2px solid #55555528;
  border-radius: 8px;
  margin-top: 40px;
  padding: 8px 10px;
  letter-spacing: -1px;
  &:hover {
    border: 2px solid #2f6be3;
  }
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -1px;
`;

const Table = styled.table`
  width: 100%;
  border: 2px solid #55555547;
  border-radius: 8px;
  border-collapse: separate;
  margin-top: 20px;
  letter-spacing: -1px;
`;

const Thead = styled.thead`
  background-color: #eaeaea;
`;

const Tr = styled.tr`
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Th = styled.th`
  padding: 12px;
  border: 1px solid #55555518;
  font-weight: 600;
  font-size: 18px;
`;

const Tbody = styled.tbody``;

const Td = styled.td`
  padding: 12px;
  border: 1px solid #55555518;
  font-size: 15px;
  text-align: center;
`;

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

  console.log(data);

  return (
    <Container>
      <Wrapper>
        <Title>
          <h1>공압기 검사 주기 설정</h1>
        </Title>
        <Filter>
          <IoFilter />
          &nbsp; Filter
        </Filter>

        <Table>
          <Thead>
            <Tr>
              <Th>고유번호</Th>
              <Th>공압기 이름</Th>
              <Th>공압기 번호</Th>
              <Th>공압기 시리얼 번호</Th>
              <Th>보유 거래처</Th>
              <Th>검사 주기</Th>
              <Th>검사 D-Day 사용 여부</Th>
              <Th>기준 방문 날짜</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.idx}>
                <Td>{item.idx}</Td>
                <Td>{item.compName}</Td>
                <Td>{item.compIdx}</Td>
                <Td>{item.compSerial}</Td>
                <Td>{item.customer}</Td>
                <Td>{item.decisionDay}</Td>
                <Td>{item.use === "y" ? "사용 중" : "미사용"}</Td>
                <Td>{item.visitDate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Wrapper>
    </Container>
  );
};
