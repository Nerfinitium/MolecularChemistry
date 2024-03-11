import { BrowserRouter } from "react-router-dom";
import Modal from 'react-modal';Modal.setAppElement('#root'); // Replace '#root' with the appropriate selector for your root element

import {Navbar, WhiteBoard} from "./components";
import {useEffect} from "react";

Modal.setAppElement('#root'); // Replace '#root' with the appropriate selector for your root element


const App = () => {

    useEffect(() => {
        // Cleanup function to remove the app element association when the component unmounts
        return () => {
            Modal.setAppElement(null);
        };
    }, []);

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