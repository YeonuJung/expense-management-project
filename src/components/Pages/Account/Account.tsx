import Avatar from "../../Atoms/Avatar/Avatar";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import "./Account.scss";
import { useInputRef } from "../../../hooks/useInputRef";
import { AccountInputValue } from "../../../types/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import supabase from "../../../api/base";
import { useEffect, useState, useCallback } from "react";
import Dialog from "../../Organism/Dialog/Dialog";


function Account() {
  const [MemberRecord, setMemberRecord] = useState<AccountInputValue[] | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [inputValueRef, handleInputValue] = useInputRef<
    Omit<AccountInputValue, "email">
  >({
    name: "",
    expense_limit: 0,
  });
  const session = useAuth();
  const navigate = useNavigate();

  const fetchMemberRecord = useCallback(async (): Promise<void> => {
    if (session) {
      const { data } = await supabase
        .from("member")
        .select("name, email, expense_limit")
        .eq("user_id", session.user.id);
      if (data && data.length > 0) {
        setMemberRecord(data);
      }
    }
  }, [session]);

  useEffect(() => {
    fetchMemberRecord();
  }, [fetchMemberRecord]);

  const updateMemberName = async (): Promise<void> => {
    if (session) {
      if (inputValueRef.current.name === "") {
        alert("이름을 입력해주세요.");
        return;
      }
      const { error } = await supabase
        .from("member")
        .update({ name: inputValueRef.current.name })
        .eq("user_id", session.user.id);
      if (error) {
        alert("이름 변경에 실패했습니다. 다시 시도해주세요!");
      } else {
        alert("이름 변경이 완료되었습니다.");
        window.location.reload();
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const updateMemberLimit = async (): Promise<void> => {
    if (session) {
      if (inputValueRef.current.expense_limit === 0) {
        alert("한도를 입력해주세요.");
        return;
      }
      const { error } = await supabase
        .from("member")
        .update({ expense_limit: inputValueRef.current.expense_limit })
        .eq("user_id", session.user.id);
      if (error) {
        alert("한도 변경에 실패했습니다. 다시 시도해주세요!");
      } else {
        alert("한도 변경이 완료되었습니다.");
        window.location.reload();
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };

  const deleteMember = async (): Promise<void> => {
    if (session) {
      const { error } = await supabase.auth.updateUser({
        data: { status: "deleted" },
      });
      if (error) {
        alert("계정 삭제에 실패했습니다. 다시 시도해주세요!");
        setOpenModal(!openModal);
        console.log(error);
      } else {
        alert("계정 삭제가 완료되었습니다.");
        await supabase.auth.signOut();
        navigate("/");
        window.scrollTo({ top: 0});
        
      }
    } else {
      alert("로그인이 필요합니다.");
    }
  };
  return (
    <div className="account__main-container">
      <div className="account__title-container">
        <div className="account__title">일반</div>
      </div>
      <div className="account__tab-container">
        <div className={`account__tab clickedTabMenu`}>
          <Link to="/account">일반</Link>
        </div>
        <div className="account__tab">
          <Link to="/account/security">보안</Link>
        </div>
      </div>
      <div className="account__detail-container">
        <div className="account__detail-title">기본 정보</div>
        <div className="account__detail-wrapper">
          <div className="account__detail">
            <Avatar shape="circular" />
            <Button color="success" size="small">
              변경
            </Button>
          </div>
          <div className="account__detail">
            <div className="account__detail-input-container">
              <Input
                title="이름"
                name="name"
                type="text"
                placeholder="이름을 입력하세요. 프로필 옆에 표시됩니다."
                handleInputValue={handleInputValue}
                defaultValue={MemberRecord ? MemberRecord[0].name : null}
              />
            </div>
            <Button size="small" onClick={updateMemberName}>
              저장
            </Button>
          </div>
          <div className="account__detail">
            <div className="account__detail-input-container">
              <Input
                title="이메일"
                name="email"
                type="email"
                placeholder="example@example.com"
                handleInputValue={handleInputValue}
                defaultValue={MemberRecord ? MemberRecord[0].email : null}
                readOnly={true}
              />
            </div>
            <Button size="small" disabled={true}>
              변경
            </Button>
          </div>
        </div>
      </div>
      <div className="account__detail-container">
        <div className="account__detail-title">추가 정보</div>
        <div className="account__detail-wrapper">
          <div className="account__detail">
            <div className="account__detail-text">
              지출 한도를 여기에 입력하세요! 저축에 도움이 될 수 있습니다.
            </div>
          </div>
          <div className="account__detail">
            <div className="account__detail-input-container">
              <Input
                title="지출 한도"
                name="expense_limit"
                type="number"
                step={100}
                placeholder="0"
                handleInputValue={handleInputValue}
                defaultValue={
                  MemberRecord ? MemberRecord[0].expense_limit : null
                }
              ></Input>
            </div>
            <Button size="small" onClick={updateMemberLimit}>
              저장
            </Button>
          </div>
        </div>
      </div>
      <div className="account__detail-container">
        <div className="account__detail-title">계정 삭제</div>
        <div className="account__detail-wrapper">
          <div className="account__detail">
            <div className="account__detail-text">
              계정과 모든 소스 데이터를 삭제합니다. 이는 되돌릴 수 없습니다.
            </div>
          </div>
          <div className="account__detail">
            <Button
              variant="outlined"
              color="error"
              onClick={() => setOpenModal(!openModal)}
            >
              계정 삭제
            </Button>
          </div>
        </div>
      </div>
      {openModal && (
        <Dialog
          title="정말로 삭제하시겠습니까?"
          content="계정과 모든 소스 데이터가 삭제되어 다시 복구할 수 없습니다."
          buttons={
            <>
              <Button onClick={deleteMember}>삭제</Button>
              <Button onClick={() => setOpenModal(!openModal)}>취소</Button>
            </>
          }
        />
      )}
    </div>
  );
}

export default Account;
