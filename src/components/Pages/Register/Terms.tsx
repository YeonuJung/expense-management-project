import Divider from "../../Atoms/Divider/Divider";
import "./Terms.scss";
import Button from "../../Atoms/Button/Button";
import { useNavigate } from "react-router-dom";

interface TermsProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}
function Terms({ setIsModalOpen, isModalOpen, setChecked }: TermsProps) {
  const handleTermsCheckedButtonClick = () => {
    setIsModalOpen(!isModalOpen);
    setChecked(true);
  };
  const navigate = useNavigate();
  return (
    <div className="terms__container">
      <div className="terms__main-container">
        <div className="terms__title">
          <img
            src="로고.png"
            className="register__logo"
            alt="logo"
            onClick={() => navigate("/")}
          ></img>
          회원가입 이용약관
        </div>
        <Divider />
        <div className="terms__content">
          회원가입 이용약관 제1조 (목적)
          <br />
          이 약관은 웹사이트 [지출요정] (이하 "사이트"라 함)의 회원가입 및
          이용에 관한 조건 및 절차를 정함을 목적으로 합니다.
          <br />
          <br />
          제2조 (정의)
          <br />
          "회원"이란 이 약관에 동의하고 사이트에 회원가입을 한 자를 의미합니다.
          "회원가입"이란 사이트에서 요구하는 절차를 거쳐 회원이 되는 것을
          의미합니다. "서비스"란 회사가 제공하는 모든 온라인 서비스 및 정보를
          의미합니다.
          <br />
          <br />
          제3조 (약관의 효력 및 변경)
          <br />
          이 약관은 사이트에 게시함으로써 효력을 발생하며, 회원이 가입 절차를
          완료한 경우 이 약관에 동의한 것으로 간주됩니다. 회사는 필요에 따라
          약관을 변경할 수 있으며, 변경된 약관은 사이트에 게시함으로써 효력을
          발생합니다. 회원은 약관 변경 사항을 정기적으로 확인할 책임이 있습니다.
          <br />
          <br />
          제4조 (회원가입 절차)
          <br />
          회원가입을 희망하는 자는 회사가 요구하는 정보를 정확히 입력하고, 본
          약관 및 개인정보 처리방침에 동의해야 합니다. 회사는 회원가입 신청에
          대해 승인을 거부할 수 있으며, 이 경우 그 사유를 회원에게 통지합니다.
          <br />
          <br />
          제5조 (회원의 의무)
          <br />
          회원은 사이트를 이용함에 있어 법령, 약관, 기타 회사가 정한 규정을
          준수해야 합니다. 회원은 자신의 계정 정보를 정확히 유지하고, 계정의
          비밀번호를 안전하게 관리하여야 합니다. 회원은 타인의 권리를 침해하거나
          불법적인 행위를 해서는 안 됩니다.
          <br />
          <br />
          제6조 (서비스의 제공 및 변경)
          <br />
          회사는 회원에게 사이트를 통한 다양한 서비스를 제공하며, 서비스의
          내용은 회사의 정책에 따라 변경될 수 있습니다. 회사는 서비스의 품질을
          향상시키기 위해 필요에 따라 서비스의 전부 또는 일부를 변경하거나
          중단할 수 있습니다.
          <br />
          <br />
          제7조 (회원 탈퇴 및 자격 정지)
          <br />
          회원은 언제든지 사이트를 통해 회원 탈퇴를 요청할 수 있습니다. 회사는
          회원이 본 약관을 위반하거나, 불법적 행위를 하는 경우 회원 자격을
          정지하거나 해제할 수 있습니다.
          <br />
          <br />
          제8조 (책임의 한계)
          <br />
          회사는 사이트의 이용에 따른 회원의 손해에 대해 법적 책임을 지지
          않습니다. 회사는 사이트의 서비스 제공에 있어 발생할 수 있는 장애 및
          오류에 대해 책임지지 않습니다.
          <br />
          <br />
          제9조 (개인정보 보호)
          <br />
          회사는 회원의 개인정보를 보호하기 위해 최선을 다하며, 개인정보
          처리방침에 따라 이를 관리합니다.
          <br />
          <br />
          제10조 (준거법 및 분쟁 해결)
          <br />
          이 약관의 해석 및 적용에 대해서는 대한민국 법을 적용합니다. 이 약관에
          관한 분쟁은 회사의 본사 소재지 관할 법원에서 해결합니다.
          <br />
          부칙
          <br />
          <br />
          <span className="terms__text">
            이 약관은 [약관 시행일]부터 시행됩니다.
          </span>
          <div className="terms__checked-button">
            <Button
              variant="outlined"
              color="darkGrey"
              size="large"
              onClick={handleTermsCheckedButtonClick}
            >
              이용약관을 모두 확인했습니다.
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
