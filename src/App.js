import GlobalProvider from './contexts/GlobalContext';
import './App.css';

import {useState,useEffect} from 'react';

import Header from './components/Header.jsx';
import CardDisplay from './components/CardDisplay.jsx';
import ApproveOfferSnackbar from './components/ApproveOfferSnackbar.jsx';
import BoughtCardSnackbar from './components/BoughtCardSnackbar.jsx';

import CardDetailModal from './components/CardDetailModal.jsx';
import { cards } from './cards.js';
import { bidingInfos} from "./bidingInfos";

function App() {

  const [availableCards, setAvailableCards] = useState([]);
  const [needToApproveOffer, setNeedToApproveOffer] = useState(false);
  const [boughtCard, setBoughtCard] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  //const [tokenDisplayInfo, setTokenDisplayInfo] = useState(null);
  const tokenDisplayInfo = null;


  useEffect(() => {
    // Receive callbacks from the wallet connection.
    setAvailableCards(cards);

  },[]);

  const handleCardClick = (name) => {
    setActiveCard(name);
  };

  const handleCardModalClose = () => {
    setActiveCard(null);
  };

  const handleGetCardDetail = (name) => {
    return new Promise(function (resolve, reject) {
      resolve(bidingInfos[name]);
    });
  };

  const submitCardOffer = (name, price, selectedPurse) => {
    handleCardModalClose();
  };

  const handleOnClose = () => {
    setNeedToApproveOffer(false);
    setBoughtCard(false);
  };

  return (
      <GlobalProvider>
          <div className="App">
              <Header />
              <CardDisplay
                  playerNames={availableCards}
                  handleClick={handleCardClick}
              />
              <CardDetailModal
                  open={!!activeCard}
                  onClose={handleCardModalClose}
                  onGetCardDetail={handleGetCardDetail}
                  onBidCard={submitCardOffer}
                  playerName={activeCard}
                  tokenDisplayInfo={tokenDisplayInfo}
              />
              <ApproveOfferSnackbar
                  open={needToApproveOffer}
                  onClose={handleOnClose}
              />
              <BoughtCardSnackbar open={boughtCard} onClose={handleOnClose}/>
          </div>
      </GlobalProvider>
  );
}

export default App;
