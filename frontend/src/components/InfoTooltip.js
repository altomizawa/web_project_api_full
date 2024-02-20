import React from 'react';
import { useNavigate } from 'react-router-dom';

function InfoToolTip({ isPopupActive, setIsPopupActive, registrationStatus }) {
  //----------FUNCTION TO REDIRECT AFTER SUCCESSFUL LOGIN ---------
  const navigate = useNavigate();

  //---------------CLOSE POPUP FUNCTION----------------
  async function closePopup() {
    setIsPopupActive(false);
    if (registrationStatus === 'success') {
      navigate('/login');
    } else return;
  };

  //--------------SET ICON INSIDE POPUP --------------------
  const popupIconSuccess = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="150"
      viewBox="0 -960 960 960"
      width="150"
    >
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );

  const popupIconError = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="150"
      viewBox="0 -960 960 960"
      width="150"
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );

  //---------------JSX--------------------
  return (
    <div
      className={
        isPopupActive ? 'infotooltip infotooltip_active' : 'infotooltip'
      }
    >
      <div className="infotooltip__popup">
        <button onClick={closePopup}>X</button>
        <div className="infotooltip__checkmark-wrapper">
          {registrationStatus === 'success' ? popupIconSuccess : popupIconError}
        </div>

        <h2 className="infotooltip__text">
          {registrationStatus === 'success' ? 'Success! Please Sign In Now.' : 'Something went wrong. Please try again'}
        </h2>
      </div>
    </div>
  );
}

export default InfoToolTip;
