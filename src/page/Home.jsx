import { useEffect, useState } from "react";
import { getDDay, getAllDDay } from "../api";
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
  background-color: #fff;
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
  border: ${(props) =>
    props.$filterOn
      ? "2px solid #1865e0"
      : "2px solid rgba(85, 85, 85, 0.157)"};
  border-radius: 8px;
  padding: 8px 12px;
  letter-spacing: -1px;
`;

const FilterBox = styled.div`
  position: absolute;
  top: 44px; /* 버튼 아래에 위치하도록 조절 */
  left: 0;
  z-index: 10;
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
  background-color: #fff3f5;
  padding: 15px;
  border-radius: 8px 8px 0 0;
  border-bottom: 2px solid #55555518;
  svg {
    font-size: 20px;
    cursor: pointer;
  }
`;

const FilterB = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
`;

const Company = styled.div`
  width: 100%;
  h3 {
    letter-spacing: -1px;
    font-weight: 500;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 50px;
  border: 1px solid #55555518;
  border-radius: 8px;
  margin-top: 10px;
  letter-spacing: -1px;
  padding: 10px;
  cursor: pointer;

  /* 🔽 기본 화살표 없애기 */
  /* appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none; */

  option {
    letter-spacing: -1px;
  }
`;

const SerialNum = styled.div`
  margin-top: 40px;
  h3 {
    letter-spacing: -1px;
    font-weight: 500;
  }
`;

const SerialToggleBtn = styled.button`
  width: 60px;
  height: 30px;
  background-color: ${(props) => (props.$active ? "#1865e0" : "#ccc")};
  border-radius: 30px;
  border: none;
  position: relative;
  margin-top: 10px;
  &::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${(props) => (props.$active ? "32px" : "3px")};
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
  }
`;
// ::after	HTML에 없는 가짜 요소를 생성해서 꾸며주는 기능
// content: "";	그 가짜 요소를 "실제로 존재"하게 만듦 (내용은 비워둘 수도 있음)
// 안 쓰면?	::after는 생성되지 않아서 width, height, background 같은 것도 적용 안 됨

const FilterF = styled.div`
  width: 100%;
  padding: 15px;
  background-color: #fff3f5;
  border-top: 2px solid #55555518;
  border-radius: 0 0 8px 8px;
  display: flex;
  flex-direction: row-reverse;
`;

const Apply = styled.button`
  padding: 8px 18px;
  background-color: #1865e0;
  border-radius: 8px;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -1px;
  transition: all 0.15s ease; /* 부드럽게 전환 */

  &:active {
    transform: scale(0.96) translateY(2px); /* 살짝 작아지고 내려감 */
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.2); /* 안쪽 그림자 추가 */
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

export const Home = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]); // 🔥 전체 데이터 저장용
  const [nowPage, setNowPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [compNames, setCompNames] = useState([]); // 🔥 전체 업체명 리스트
  // 밖에서 쓸려고
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [isOn, setIsOn] = useState(false);
  const [countPerPage, setCountPerPage] = useState(15); // 페이지당 개수

  // 1번 useEffect - 페이지별 데이터
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDDay(nowPage);
        setData(res.data.decisionData);
        setMaxPage(res.data.pageInfo.maxPage);
      } catch (err) {
        console.log("API 에러:", err);
      }
    };

    fetchData();
  }, [nowPage]);

  // 2번 useEffect - 전체 데이터 (한 번만)
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await getAllDDay();
        setAllData(res.data.decisionData);

        // 고유한 업체명 리스트 생성
        const uniqueCompNames = [
          ...new Set(res.data.decisionData.map((item) => item.customer)),
        ];
        setCompNames(uniqueCompNames.sort()); // 내림차순 정렬

        // res는 fetch 함수 안에서만 살아있음
      } catch (err) {
        console.log("API 에러:", err);
      }
    };

    fetchAllData();
  }, []); // <-- 빈 배열 [] -> 최초 1번만 실행

  // 페이지네이션 관련 함수
  const handlePageChange = (page) => {
    if (page >= 1 && page <= maxPage) {
      setNowPage(page);
    }
  };

  // 페이지 그룹 계산 (예: 1, 2, 3, 4 ... 그룹으로 나누기)
  const getPaginationRange = () => {
    const range = [];
    const start = Math.floor((nowPage - 1) / 5) * 5 + 1; // 페이지 그룹의 첫 페이지
    const end = Math.min(start + 4, maxPage); // 페이지 그룹의 마지막 페이지

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const isFirstPage = nowPage === 1;
  const isLastPage = nowPage === maxPage;

  // 시리얼넘버 토글버튼
  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  const handleApplyFilter = () => {
    let filteredData = allData;

    // 업체명 필터
    if (selectedCompany !== "all") {
      filteredData = filteredData.filter(
        (item) => item.customer === selectedCompany
      );
    }

    // 시리얼 넘버 존재 필터
    if (isOn) {
      filteredData = filteredData.filter(
        (item) => item.compSerial !== null && item.compSerial.trim() !== ""
      );
    }

    // maxPage 다시 계산
    const calculatedMaxPage = Math.ceil(filteredData.length / countPerPage);
    setMaxPage(calculatedMaxPage);

    // 현재 페이지 데이터만 자르기
    // const startIdx = ()

    // 둘 다 적용한 결과를 화면에 뿌리기
    setData(filteredData);
    setShowFilter(false);
  };

  console.log(data);
  // console.log(allData);
  // console.log(compNames);

  return (
    <Container>
      <Wrapper>
        <Title>
          <h1>공압기 검사 주기 설정</h1>
        </Title>

        {/* 필터 */}
        <FilterWrapper>
          <Filter
            onClick={() => setShowFilter((prev) => !prev)}
            $filterOn={showFilter}
          >
            <IoFilter />
            &nbsp; Filter
          </Filter>

          {showFilter && (
            <FilterBox>
              <FilterH>
                <h2>Filter</h2>
                <IoCloseOutline
                  onClick={() => setShowFilter((prev) => !prev)}
                />
              </FilterH>

              <FilterB>
                <Company>
                  <h3>업체명</h3>
                  <Select
                    value={selectedCompany}
                    onChange={(e) => setSelectedCompany(e.target.value)}
                  >
                    <option value="all">전체</option>
                    {/* 🔥 전체 업체명 리스트로 드롭다운 채우기 */}
                    {compNames.map((company, idx) => (
                      <option key={idx} value={company}>
                        {company}
                      </option>
                    ))}
                  </Select>
                </Company>

                <SerialNum>
                  <h3>시리얼넘버 존재하는 공압기만 조회</h3>
                  <SerialToggleBtn
                    $active={isOn}
                    onClick={handleToggle}
                  ></SerialToggleBtn>
                </SerialNum>
              </FilterB>

              <FilterF>
                <Apply onClick={handleApplyFilter}>Apply</Apply>
              </FilterF>
            </FilterBox>
          )}
        </FilterWrapper>

        {/* 테이블 */}
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

        {/* 페이지네이션 */}
        <PaginationWrapper>
          <PageButton
            onClick={() => handlePageChange(1)}
            disabled={isFirstPage}
          >
            &lt;&lt;
          </PageButton>
          <PageButton
            onClick={() => handlePageChange(nowPage - 1)}
            disabled={isFirstPage}
          >
            &lt;
          </PageButton>

          {/* 페이지 그룹 버튼들 */}
          {getPaginationRange().map((page) => (
            <PageButton
              key={page}
              onClick={() => handlePageChange(page)}
              active={page === nowPage}
            >
              {page}
            </PageButton>
          ))}

          <PageButton
            onClick={() => handlePageChange(nowPage + 1)}
            disabled={isLastPage}
          >
            &gt;
          </PageButton>
          <PageButton
            onClick={() => handlePageChange(maxPage)}
            disabled={isLastPage}
          >
            &gt;&gt;
          </PageButton>
        </PaginationWrapper>
      </Wrapper>
    </Container>
  );
};
// 정리
// 파라미터에 있는 page랑 count는 값을 조회할때 필요한 것이고
// nowPage랑 maxPage는 조회한 것에 대한 결과값인 거임.
// 그 now 랑 max 로 페이지네이션을 돌릴 수 있음.
