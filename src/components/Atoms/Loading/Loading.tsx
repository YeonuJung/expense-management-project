import { FadeLoader } from 'react-spinners'
import './Loading.scss'

interface LoadingProps {
 size?: "small" | "medium" | "large";
}
function Loading({size= "large"} : LoadingProps) {
  switch(size){
    case "small":
      return <div className= "loading__spinner"><FadeLoader color="#5048e5" height={9} width={3} margin= {-6}/></div>
    case "medium":
      return <div className= "loading__spinner"><FadeLoader color="#5048e5" height={13} width={4} margin= {-3}/></div>
    case "large":
      return <div className= "loading__spinner"><FadeLoader color="#5048e5" margin= {0}/></div>
  }
}

export default Loading
