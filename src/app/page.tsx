import Image from "next/image";
import HomePageLogo from "@/public/image/home-page-logo.png"

export default function Home() {
  return (
    <div className="main-container">
      <div className="blur-circle1">

      </div>
      <div className="blur-circle2">

      </div>
      <div className="landing-page">
        <header>
          <div className="container">
            <a href="#" className="logo">Your <b>Website</b></a>
            <ul className="links">
              <a href="https://www.fiverr.com/s/DBz8ApX"><li>Home</li></a>
              <a href="https://www.fiverr.com/s/DBz8ApX"><li>About Us</li></a>
              <a href="https://www.fiverr.com/s/DBz8ApX"><li>Work</li></a>
              <a href="https://www.fiverr.com/s/DBz8ApX"><li>Info</li></a>
              <a href="https://www.fiverr.com/s/DBz8ApX"><li>Get Started</li></a>
            </ul>
          </div>
        </header>
        <div className="content">
          <div className="container">
            <div className="info">
              <h1>Looking For Inspiration</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit nihil ullam nesciunt quidem iste, Repellendus odit nihil</p>
              <a href="https://www.fiverr.com/s/DBz8ApX">
                <button>Let is go!</button>
              </a>

            </div>
            <div className="image">
              <a href="https://www.fiverr.com/s/DBz8ApX">
                <Image priority={true} className="main-image" src={HomePageLogo} alt="Home Page Logo" quality={100}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


