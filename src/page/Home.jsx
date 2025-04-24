import { useEffect, useState } from "react";
import { getDDay } from "../api";
import styled from "styled-components";
import { IoCloseOutline, IoFilter } from "react-icons/io5";

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

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -1px;
`;

const FilterWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 40px;
`;

const Filter = styled.button`
  border: 2px solid #55555528;
  border-radius: 8px;
  padding: 8px 12px;
  letter-spacing: -1px;
  &:hover {
    /* border: 2px solid #1865e0; */
  }
`;

const FilterBox = styled.div`
  position: absolute;
  top: 44px; /* 버튼 아래에 위치하도록 조절 */
  left: 0;
  z-index: 10;
  padding: 20px;
  width: 350px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

const FilterH = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  letter-spacing: -1px;
  svg {
    font-size: 20px;
  }
`;

const Table = styled.table`
  width: 100%;
  border: 2px solid #55555547;
  border-radius: 8px;
  border-collapse: separate;
  margin-top: 10px;
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
  padding: 13px;
  border: 1px solid #55555518;
  font-size: 15px;
  text-align: center;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  justify-content: center;
`;

const PageButton = styled.button`
  padding: 6px 12px;
  background-color: ${(props) => (props.active ? "#1865e0" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: 1px solid #ccc;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) => (props.active ? "#1865e0" : "#f2f2f2")};
  }
`;

const Ellipsis = styled.span`
  padding: 6px 10px;
  font-size: 16px;
  color: #999;
`;

export const Home = () => {
  const [data, setData] = useState([]);
  const [nowPage, setNowPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  // 밖에서 쓸려고
  const [showFilter, setShowFilter] = useState(false);
  const pageBlockSize = 5;
  const getPageNumbers = () => {
    const pages = [];
    const pageBlockSize = 5;

    const currentBlockStart =
      Math.floor((nowPage - 1) / pageBlockSize) * pageBlockSize + 1;
    const currentBlockEnd = Math.min(
      currentBlockStart + pageBlockSize - 1,
      maxPage - 1
    ); // 마지막은 고정

    for (let i = currentBlockStart; i <= currentBlockEnd; i++) {
      pages.push(i);
    }

    if (maxPage > currentBlockEnd) {
      pages.push("ellipsis");
      pages.push(maxPage);
    }

    return pages;
  };

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

        <FilterWrapper>
          <Filter onClick={() => setShowFilter((prev) => !prev)}>
            <IoFilter />
            &nbsp; Filter
          </Filter>
          {showFilter && (
            <FilterBox>
              <FilterH>
                <h2>Filter</h2>
                <IoCloseOutline />
              </FilterH>
            </FilterBox>
          )}
        </FilterWrapper>

        <Table>
          <Thead>
            <Tr>
              <Th>고유번호</Th>
              <Th>공압기 이름</Th>
              <Th>공압기 번호</Th>
              <Th>공압기 시리얼 번호</Th>
              <Th>보유 거래처</Th>
              <Th>검사 주기</Th>
              <Th>검사 주기 사용 여부</Th>
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

        <PaginationWrapper>
          <PageButton
            onClick={() => setNowPage(Math.max(1, nowPage - 5))}
            disabled={nowPage <= 5}
          >
            ←
          </PageButton>

          {getPageNumbers().map((num, i) =>
            num === "ellipsis" ? (
              <Ellipsis key={i}>...</Ellipsis>
            ) : (
              <PageButton
                key={num}
                onClick={() => setNowPage(num)}
                active={nowPage === num}
              >
                {num}
              </PageButton>
            )
          )}

          <PageButton
            onClick={() => {
              const nextStart = Math.floor((nowPage - 1) / 5 + 1) * 5 + 1;
              if (nextStart <= maxPage) setNowPage(nextStart);
            }}
            disabled={nowPage + 5 > maxPage}
          >
            →
          </PageButton>
        </PaginationWrapper>
      </Wrapper>
    </Container>
  );
};
