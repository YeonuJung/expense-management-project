import "./Badge.scss"

interface BadgeProps {
    color: 'primary' | 'success' | 'error';
    label?: number; // number | undefined
    // 필수가 아닌 경우 ?(옵셔널) 사용해서 값이 없는 경우도 커버 가능
}
function Badge(props: BadgeProps) {
    const {color, label} = props;

// 디폴트값이 있는 경우 =로 디폴트값 부여해놓음
// if문과 같은 분기를 최대한 지양하는 것이 코드가 명확할 수 있음. 물론 절대적인 것은 아님.
    const BadgeWithLabel = () => {
        return (
            <div className={`badge__container bg-${color}`}>
                <div className="badge__content">
                    {label}
                </div>
            </div>
        )
    }
    const BadgeWithoutLabel = () => {
        return(
        <div className={`badge__withoutLabel__container bg-${color}`}>
        </div>
        )
    }

//컴포넌트의 경우 jsx만 리턴하기 때문에 굳이 return값의 타입을 지정해줄 필요 X

    if(label){
        return <BadgeWithLabel/>
    }
    else{
        return <BadgeWithoutLabel/>
    }
}

export default Badge
