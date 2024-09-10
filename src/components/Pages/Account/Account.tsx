import Avatar from "../../Atoms/Avatar/Avatar";
import Button from "../../Atoms/Button/Button";
import Input from "../../Atoms/Input/Input";
import "./Account.scss";
import { useInputRef } from "../../../hooks/useInputRef";
import { AccountInputValue } from "../../../types/general";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import Dialog from "../../Organism/Dialog/Dialog";
import Alert from "../../Atoms/Alert/Alert";
import { readMemberRecord } from "../../../api/member";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Atoms/Loading/Loading";
import { getFullStorageUrl } from "../../../utils/getFullStorageUrl";
import { useUpdateMemberLimit } from "../../../hooks/mutation/useUpdateMemberLimit";
import { useUpdateMemberName } from "../../../hooks/mutation/useUpdateMemberName";
import { useDeleteMember } from "../../../hooks/mutation/useDeleteMember";
import { useUploadMemberProfile } from "../../../hooks/mutation/useUploadMemberProfile";

function Account() {
  const [memberRecord, setMemberRecord] = useState<AccountInputValue[] | null>(
    null
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [errors, setErrors] = useState<Pick<AccountInputValue, "name"> | null>(
    null
  );
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [inputValueRef, handleInputValue] = useInputRef<{
    name: string;
    expense_limit: number;
  }>({
    name: "",
    expense_limit: 0,
  });
  const session = useAuth();
  const { handleUpdateMemberName } = useUpdateMemberName();
  const { handleUpdateMemberLimit } = useUpdateMemberLimit();
  const { handleDeleteMember } = useDeleteMember(setOpenModal, openModal);
  const { handleUploadProfile } = useUploadMemberProfile();

  const { data, isPending, isError } = useQuery({
    queryKey: ["member"],
    queryFn: () => readMemberRecord(session?.user.id as string),
    enabled: !!session,
    staleTime: 1000 * 60 * 2,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setMemberRecord(data);
    }
    if (isError) {
      alert("멤버 정보를 불러오는데 실패했습니다. 다시 시도해주세요.");
    }
  }, [data, isError]);

  return session && isPending ? (
    <Loading />
  ) : (
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
            {preview ? (
              <Avatar shape="circular" type="img" src={preview as string} />
            ) : memberRecord?.[0].profile_img ? (
              <Avatar
                shape="circular"
                type="img"
                src={getFullStorageUrl(memberRecord?.[0].profile_img)}
              ></Avatar>
            ) : (
              <Avatar shape="circular" />
            )}
            <input
              className="account__detail-image-input"
              id="image-upload"
              accept="image/*"
              onChange={(e) => handleUploadProfile(e, setPreview)}
              type="file"
            />
            <Button color="success" size="small">
              <label htmlFor="image-upload"> 변경</label>
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
                defaultValue={memberRecord ? memberRecord[0].name : null}
              />
            </div>
            <Button
              size="small"
              onClick={() =>
                handleUpdateMemberName(setErrors, inputValueRef.current.name)
              }
            >
              저장
            </Button>
          </div>
          {errors?.name && <Alert type="error" content={errors.name}></Alert>}

          <div className="account__detail">
            <div className="account__detail-input-container">
              <Input
                title="이메일"
                name="email"
                type="email"
                placeholder="example@example.com"
                handleInputValue={handleInputValue}
                defaultValue={memberRecord ? memberRecord[0].email : null}
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
                  memberRecord ? memberRecord[0].expense_limit : null
                }
              ></Input>
            </div>
            <Button
              size="small"
              onClick={() =>
                handleUpdateMemberLimit(inputValueRef.current.expense_limit)
              }
            >
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
              onClick={() => {
                if (!session) {
                  alert("로그인이 필요합니다.");
                  return;
                }
                setOpenModal(!openModal);
              }}
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
              <Button onClick={handleDeleteMember}>삭제</Button>
              <Button onClick={() => setOpenModal(!openModal)}>취소</Button>
            </>
          }
        />
      )}
    </div>
  );
}

export default Account;
