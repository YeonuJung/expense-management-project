import Sidebar from "../../Organism/Sidebar/Sidebar";
import Appbar from "../../Organism/Appbar/Appbar";
import "./Home.scss";

function Home() {
  return (
    <div className="home__container">
      <Sidebar />
      <div className="home__content-container">
        <Appbar />
        <div className="home__main-container">
            
        </div>
      </div>
    </div>
  )
}

export default Home
