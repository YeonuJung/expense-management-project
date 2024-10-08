import "./ExpenseList.scss";
import { useState, useRef, useEffect, useCallback } from "react";
import Table from "../../Organism/Table/Table";
import Chip from "../../Atoms/Chip/Chip";
import Button from "../../Atoms/Button/Button";
import { MdAutorenew } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { URLSearchParamsInit, useNavigate, useSearchParams } from "react-router-dom";
import { ExpenseRecord } from "../../../types/model";
import { useAuth } from "../../../hooks/useAuth";
import { readExpenseRecord } from "../../../api/expenseRecord";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Atoms/Loading/Loading";
interface OpenFilterMenu {
  Category: boolean;
  Rating: boolean;
  Date: boolean;
}

interface CheckedFilterMenu {
  category: boolean[];
  rating: boolean[];
  date: boolean[];
}
// 스트링리터럴에는 스트링값을 넣을 수 없기 때문에 키값을 스트링으로 따로 지정해준다.
// 왜냐? 스트링리터럴이 스트링값보다 더 좁은 값이기 때문에. narrow한 데이터타입이라서.
// 따로 지정해주지 않을 경우 타입스크립트는 객체의 키값을 스트링리터럴로 인식한다.
// 그렇기 때문에 다른 곳에서 키값을 문자열로 받아서 객체의 키값으로 대입하려 하면 오류발생.
// 또는 할당하는 값의 타입을 단언해주는 방법도 있음.
interface FilterMenu {
  title: { [key: string]: string }[];
  list: { [key: string]: string[] }[];
}

interface CheckedFilterMenuValue {
  category: string[];
  rating: string[];
  date: string[];
}

function ExpenseList() {
  const [searchKeyword, setSearchKeyword] = useState<string[]>([]);
  const [openFilterMenu, setopenFilterMenu] = useState<OpenFilterMenu>({
    Category: false,
    Rating: false,
    Date: false,
  });
  const [checkedFilterMenuValue, setCheckedFilterMenuValue] =
    useState<CheckedFilterMenuValue>({ category: [], rating: [], date: [] });
  const [filteredData, setFilteredData] = useState<ExpenseRecord[]>([]);
  const [startPage, setStartPage] = useState<number>(1);
  const [endPage, setEndPage] = useState<number>(1);
  const [_, setUrlSearchParams]= useSearchParams()
  const inputDataRef = useRef<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  // useRef사용 왜? 처음에 state로 상태를 정의했으나 렌더링이 필요하지 않은 데이터임에도 불구하고
  // useState훅을 사용해서 상태를 저장했다. 그래서 값이 변경될 때마다 불필요한 렌더링이 발생했다.
  // 뿐만 아니라 불필요한 렌더링에 따라 밑에 정의해놨던 일반 변수들이 초기화되어 문제가 발생
  // 따라서 값이 보존되면서 리렌더링도 발생하지 않는 useRef훅을 사용했다.
  const initialCheckedFilterMenuRef = {
    category: [false, false, false, false, false, false, false],
    rating: [false, false, false],
    date: [false, false],
  };
  // 어떤 값이 눌렸는지 알 수 있도록 하는 Ref값
  // Ref의 값이 true이면 checked인 상태
  // 그럼 true인 값의 value를 뽑아서 데이터에 필터링 조건으로 제공하기 위함
  const checkedFilterMenuRef = useRef<CheckedFilterMenu>(
    initialCheckedFilterMenuRef
  );

  const session = useAuth();
  const contentPerPage = 5;

  const fetchExpenseRecord = useCallback(async () => {
    if (session) {
      const start: number = (startPage - 1) * contentPerPage;
      const end: number = start + contentPerPage - 1;

      const result = await readExpenseRecord(session.user.id, {
        searchKeyword,
        checkedFilterMenuValue,
        start,
        end,
      });
      return result;
    }
  }, [session, startPage, searchKeyword, checkedFilterMenuValue]);

  const {
    isError,
    isStale,
    isPending,
    data: dataWithCount,
    refetch: refetchExpenseRecord,
  } = useQuery({
    queryKey: ["expenseRecord", searchKeyword, checkedFilterMenuValue, startPage],
    queryFn: fetchExpenseRecord,
    enabled: !!session,
    staleTime: 1000 * 60 * 2,
  });


  useEffect(() => {
    if(isStale){
      refetchExpenseRecord();
    }
  }, [fetchExpenseRecord, isStale, refetchExpenseRecord]);

  useEffect(() => {
    // searchKeyword가 존재하고 결과가 없는 경우 빈 배열 반환
    if (dataWithCount && dataWithCount.data.length !== 0) {
      const { data, count } = dataWithCount;
      if (!isError && count) {
        setFilteredData(data);
        setEndPage(Math.ceil(count / contentPerPage));
      } else {
        setFilteredData([]);
      }
    }else {
      // dataWithCount.data가 빈 배열인 경우
      setFilteredData([]);
      setEndPage(1);
    }
  }, [dataWithCount, isError, searchKeyword]);

  // 체크박스가 눌렸을 때 실행되는 함수
  // 눌리면 checkedFilterMenuRef의 값이 변하면서 어떤 값이 눌렸는지 알 수 있다.
  const handleCheckedFilterMenu = (key: string, idx: number) => {
    checkedFilterMenuRef.current[key as keyof CheckedFilterMenu][idx] =
      !checkedFilterMenuRef.current[key as keyof CheckedFilterMenu][idx];
  };

  // 필터메뉴를 객체로 만들어서 조금은 복잡하지만 각각의 경우에 따른 값을 나눴다.
  // 각각의 데이터가 같이 쓰이는지, 의존적인지에 따라서 객체로 감쌀지 배열로 감쌀지 정할 수 있다.
  const filterMenu: FilterMenu = {
    title: [{ category: "Category" }, { rating: "Rating" }, { date: "Date" }],
    list: [
      {
        category: ["식당", "카페", "쇼핑", "문화생활", "숙박", "교통", "기타"],
      },
      { rating: ["좋아요", "보통이에요", "별로에요"] },
      { date: ["최신순", "늦은순"] },
    ],
  };

  // 오픈필터메뉴 state를 관리하는 로직
  // 온클릭 이벤트 발생시 오픈필터메뉴의 키값들을 받아서 변수에 저장하고 이를 some으로 돌린다.
  // 그럼 오픈필터메뉴 스테이트의 키값으로 대입가능하기 때문에 값이 하나라도 true인 경우를
  // 걸러낼 수 있다. 즉, 이미 필터메뉴가 열려있는지를 확인할 수 있고, 만약 하나라도 열려있다면?
  // 오픈필터메뉴의 스테이트를 다시 초기화 시켜서 각 필터메뉴들이 중복되어 열리는 것을 방지한다.

  const handleopenFilterMenu = (filter: string): void => {
    const openFilterMenuKeys: string[] = Object.keys(openFilterMenu);

    if (
      openFilterMenuKeys.some((key) => {
        return openFilterMenu[key as keyof OpenFilterMenu] === true;
      })
    ) {
      setopenFilterMenu({
        Category: false,
        Rating: false,
        Date: false,
      });
    }
    // 객체의 키값에 접근할 때 대괄호(인덱스)를 사용하는 상황에서
    // 키로 사용하는 변수가 문자열타입처럼 넓은 범위의 타입으로 정의된 경우
    // 대부분의 상황에서 as라는 키워드를 사용해서 형변환을 해주어야 한다.(타입 단언)
    // 키는 string보다 더 좁은 타입이기 때문에.
    // 만약 유저의 입력을 받아 그 값으로 인덱싱을 하는 특수한 상황이라면??
    // 유저의 실수를 확인하고 그에 대한 피드백을 유저에게 전달해야 한다.
    setopenFilterMenu((prev) => {
      return {
        ...prev,
        [filter]: !openFilterMenu[filter as keyof OpenFilterMenu],
      };
    });
  };

  // 클릭한 chip의 인덱스값을 인자로 받은 상태로 chip컴포넌트에 넘겨지는 함수
  // 그럼 해당 chip컴포넌트의 html태그에 온클릭이벤트가 발생했을때
  // 전달했던 함수가 실행되고, 실행됨과 동시에 아래 로직이 실행된다.
  // 즉, 처음에 onDelete 프롭스로 해당 chip의 인덱스값과 함께 밑의 함수가 전달되고
  // 온클릭이벤트가 발생하면 전달했던 함수가 실행되면서 내부의 로직이 실행된다.
  const onDelete = (id?: number): void => {
    setSearchKeyword(
      searchKeyword.filter((_, index) => {
        return id !== index;
      })
    );
  };
  // 한 함수에서는 한 역할만 하는 것이 좋다. 그 역할이 작을 수록 좋고, 본래 그 함수를 만든 목적이 무엇인지 생각해보기.
  // 본래 목적에서 벗어난 부가적인 기능은 아래처럼 분리해서 따로 정리하는 것이 좋다.
  // 연산자 여러개 사용할 때는 우선순위 고려해서 사용하기. 소괄호로 묶어줄 경우 우선순위 가장 높아짐

  // 인풋데이터가 없을때 누르면 칩이 아무 데이터 없이 생겨날 수 있음
  // 그래서 인풋데이터가 없으면 알림창을 띄우고, 있으면 키워드 배열에 추가 및 map으로 chip보여줌
  // 서치키워드도 마찬가지로 6개로 제한하고 6개가 넘어가면 알림창 띄워주고 마지막 요소 삭제
  // 그 다음에는 인풋데이터를 초기화 시켜주기 때문에 계속해서 버튼을 눌렀을 때 추가되는 것을 방지.
  const handleInputData = (): void => {
    if(!session){
      alert("로그인이 필요합니다.");
      return
    }
    if (!inputDataRef.current) {
      alert("키워드를 입력하세요!");
    } else {
      if (searchKeyword.length > 5) {
        setSearchKeyword(searchKeyword.slice(0, 6));
        alert("최대 6개까지만 적용가능합니다!");
      } else {
        setSearchKeyword([...searchKeyword, inputDataRef.current]);
        setStartPage(1);
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      // 옵셔널체이닝의 우측에 값을 할당하면 오류가 나니깐 이럴 경우 if문과 같이 조건문을 사용해주기
      // 만약 값이 null일 경우 null에다가 우측에 있는 값을 대입하게 되는 문제가 생길 수도 있으니깐
    }
  };

  // 초기화 눌렀을 때 칩이랑 보여주는 데이터 모두 초기화 하는 로직
  const resetExpenseData = (): void => {
    setSearchKeyword([]);
    setFilteredData([]);
    setCheckedFilterMenuValue({ category: [], rating: [], date: [] });
  };

  // 인풋창 눌렀을 때 인풋데이터 리셋시켜서 인풋창 깨끗하게.
  const resetInputData = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ): void => {
    inputDataRef.current = "";
    e.currentTarget.value = "";
  };

  // 엔터키 눌렀을 때 이벤트의 키를 감지해서 클릭 안하더라도 handleInputData함수 호출
  const activeEnter = (e: React.KeyboardEvent): void => {
    if (e.key === "Enter") {
      handleInputData();
    }
  };

  // 필터메뉴의 어떤값이 체크되었는지를 계산해주는 로직
  // true인 값을 ret배열에 담아서 리턴
  // 그럼 checkedFilterMenuValue에 이 ret배열을 할당한다.
 
  const calculateCheckedFilterMenuValue = (): CheckedFilterMenuValue => {
    const ret: CheckedFilterMenuValue = { category: [], rating: [], date: [] };
    let listIdx: number = 0;
    for (const key in checkedFilterMenuRef.current) {
      const items: boolean[] =
        checkedFilterMenuRef.current[key as keyof CheckedFilterMenu];
      for (let i = 0; i < items.length; i++) {
        if (items[i] === true) {
          ret[key as keyof CheckedFilterMenuValue].push(
            filterMenu.list[listIdx][key as keyof CheckedFilterMenu][i]
          );
        }
      }
      listIdx += 1;
    }
    return ret;
  };
  const convertToUrlSearchParamsInit = (checkedFilterMenuValue: CheckedFilterMenuValue): URLSearchParamsInit => {
    const params: Record<string, string | string[]> = {};
    for (const key in checkedFilterMenuValue) {
      if (checkedFilterMenuValue.hasOwnProperty(key)) {
        params[key] = checkedFilterMenuValue[key as keyof CheckedFilterMenuValue].join(',');
      }
    }
    return params;
  };
  
  // 적용하기 클릭했을 때 checkedFilterMenuValue state에 계산된 값 할당
  const filterOnClick = (): void => {
    const checkedFilterMenuValue= calculateCheckedFilterMenuValue()
    setUrlSearchParams(convertToUrlSearchParamsInit(checkedFilterMenuValue))
    setCheckedFilterMenuValue(calculateCheckedFilterMenuValue());
    setopenFilterMenu({
      Category: false,
      Rating: false,
      Date: false,
    });
    setStartPage(1);
  };

  const navigate = useNavigate();
  return (session && isPending)? <Loading/> : (
    <div className="expenseList__main-container">
      <div className="expenseList__title-container">
        <div className="expenseList__title-wrapper">
          <div className="expenseList__title">지출내역</div>
          <div className="expenseList__addButton">
            <Button
              variant="filled"
              color="primary"
              size="large"
              onClick={() => navigate("/addExpense")}
            >
              <FaPlus />
              추가
            </Button>
          </div>
        </div>
        <div className="expenseList__title-actions">
          <Button
            variant="text-only"
            color="primary"
            size="large"
            onClick={() => resetExpenseData()}
          >
            <MdAutorenew style={{ fontSize: "24px" }} />
            지출내역 초기화
          </Button>
        </div>
      </div>
      <div className="expenseList__card-container">
        <div className="expenseList__card">
          <div className="expenseList__card-input-container">
            <HiSearch
              className="expenseList__card-search-icon"
              onClick={handleInputData}
            />
            <input
              className="expenseList__card-input"
              type="text"
              placeholder="검색어를 입력하세요."
              name="searchKeyword"
              onChange={(e) => {
                const { value } = e.target;
                inputDataRef.current = value;
                console.log(inputDataRef.current);
              }}
              onClick={resetInputData}
              onKeyDown={(e) => activeEnter(e)}
              ref={inputRef}
            />
          </div>
          <div className="expenseList__card-chip-container">
            {searchKeyword.map((keyword, idx) => {
              return (
                <Chip
                  label={keyword}
                  color="grey"
                  variant="outlined"
                  onDelete={() => onDelete(idx)}
                  key={idx}
                />
              );
            })}
          </div>
          <div className="expenseList__card-filter-container">
            {filterMenu.title.map((filter, idx) => {
              const filterMenuValueKeys: (keyof CheckedFilterMenu)[] = [
                "category",
                "rating",
                "date",
              ] as (keyof CheckedFilterMenu)[];
              return (
                //큰 div로 감싸주는 이유 -> position relative를 줘서 자식에 absolute를 주려고.
                // expenseList__card-filter-list 리스트가 absolute가 되면 결국 Button만 position에 남기때문에
                // div는 Button 컴포넌트를 기준으로 크기가 정해진다.
                // 이게 싫으면 Button컴포넌트의 자식으로 넣으면 되지만 불가능 또는 너무 귀찮다.
                <div className="expenseList__card-filter" key={idx}>
                  <Button
                    color="primary"
                    onClick={() => {
                      return handleopenFilterMenu(
                        filter[filterMenuValueKeys[idx]]
                      );
                    }}
                  >
                    {filter[filterMenuValueKeys[idx]]}
                    <FaChevronDown />
                  </Button>
                  <div className="expenseList__card-filter-wrapper">
                    {openFilterMenu[
                      filter[filterMenuValueKeys[idx]] as keyof OpenFilterMenu
                    ] && (
                      <div>
                        {filterMenu.list[idx][filterMenuValueKeys[idx]].map(
                          (filterMenu, idx2) => {
                            return (
                              <div
                                key={idx2}
                                className="expenseList__card-filter-list-container"
                              >
                                <input
                                  type="checkbox"
                                  className="expenseList__card-filter-checkbox"
                                  onChange={() =>
                                    handleCheckedFilterMenu(
                                      filterMenuValueKeys[idx],
                                      idx2
                                    )
                                  }
                                  defaultChecked={
                                    checkedFilterMenuRef.current[
                                      filterMenuValueKeys[idx]
                                    ][idx2]
                                  }
                                ></input>

                                <button className="expenseList__card-filter-list">
                                  {filterMenu}
                                </button>
                              </div>
                            );
                          }
                        )}
                        <div className="expenseList__card-filter-adjust-container">
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => filterOnClick()}
                          >
                            적용하기
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <Table
          data={filteredData}
          setStartPage={setStartPage}
          startPage={startPage}
          endPage={endPage}
        />
      </div>
    </div>
  );
}

export default ExpenseList;
