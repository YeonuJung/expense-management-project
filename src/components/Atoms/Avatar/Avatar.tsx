import "./Avatar.scss";

interface AvatarProps {
  shape: "circular" | "rounded" | "square";
  type?: "img" | "text" | "icon";
  label?: string
  //label 설정 이유는 content가 텍스트일 때 텍스트를 받기 위해서
}
function Avatar(props: AvatarProps) {
  const { shape, type = "icon", label} = props;

  //컨텐츠가 이미지인 경우 -> 이미지 태그에도 아바타 쉐입 넣어줌
  //그래야 컨테이너의 border-radius를 무시하지 않고 이미지를 넣을 수 있음
  const AvatarWithImg = () => {
    return (
    <div className={`avatar__container avatar__${shape}`}>
      <img className={`avatar__${type} avatar__${shape}`} alt="avatar__img" src={process.env.PUBLIC_URL + '/avatar-image.png'} />    
    </div>
    )
  }
   //컨텐츠가 텍스트인 경우 -> label로 텍스트 받을 수 있도록
  //이외 label로 텍스트를 받아도 텍스트 표시 X
  const AvatarWithText = () => {
    return (<div className={`avatar__container avatar__${shape}`}>
      <div className={`avatar__${type}`}>{label}</div>
    </div>)
  }
  //컨텐츠가 아이콘인 경우(디폴트로 설정되어 있음)
  const AvatarWithIcon = () => {
    return (<div className={`avatar__container avatar__${shape}`}>
      <div className={`avatar__${type}`}/>
    </div>)
  }
 
  if(type === 'img'){
    return <AvatarWithImg/>
  }
  else if(type === 'text'){
    return <AvatarWithText/>
  }
  else{
    return <AvatarWithIcon/>
  }
  
}

export default Avatar;
