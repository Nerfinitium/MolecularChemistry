import { BrowserRouter } from "react-router-dom";

import {Navbar, WhiteBoard} from "./components";


const App = () => {
  return (
      <BrowserRouter>
        <div className='relative z-0 bg-primary'>
            <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
                <Navbar/>
                <WhiteBoard/>
            </div>
            <div className='relative z-0'>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;