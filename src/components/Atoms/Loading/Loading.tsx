import { FadeLoader } from 'react-spinners'
import './Loading.scss'

interface LoadingProps {
 size?: "small" | "medium" | "large";
}
function Loading({size= "large"} : LoadingProps) {
  switch(size){
    case "small":
      return <div className= "loading__spinner"><FadeLoader color="#5048e5" height={10} width={3} margin= {-3}/></div>
    case "medium":
      return <div className= "loading__spinner"><FadeLoader color="#5048e5" height={13} width={4} margin= {0}/></div>
    case "large":
      return <div className= "loading__spinner"><FadeLoader color="#5048e5" margin= {2}/></div>
  }
}

export default Loading
