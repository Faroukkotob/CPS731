import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../LibraryManager/LibraryManager.css';
import { useNavigate } from "react-router-dom";


const Sidebar = () => (
  <aside className="sidebar">
    <div className="sidebar-section">
      <div className="sidebar-item">Library</div>
      <div className="search-container">
        <form className="search-bar">
          <input type="search" placeholder="Search books..." />
          <button type="submit">🔍</button>
        </form>
      </div>
      <div className="sidebar-item active">Dashboard</div>
      <div className="sidebar-item">Reading List</div>
      <div className="sidebar-item">Manage Inventory (staff)</div>
    </div>
    <div className="sidebar-section">
    <div className="sidebar-item">Profile</div>
      <div className="sidebar-item">Logout</div> 
    </div>
  </aside>
);
//navigate("/libraryManager")


const Checkout = () => {

  const scopedStyles = `
  .parent-container {
    display: flex;
    width: 100%;
    height: 90vh;
  }
  
  .containerC {
    display: flex;
    align-items: center;
    justify-content: center; /* Center horizontally */
    width: 1100px;
    height: 550px;
    border-radius: 50px;
    border: 5px solid #5B8078;
    background: #FFF;
    box-shadow: 0px 20px 30px 0px rgba(0, 0, 0, 0.25);
    margin: auto; /* Center vertically and adjust margin-left */
    margin-left: 600px; /* Add this if you want to keep the original margin-left */
  }
  
  

.inside-element-left,
.inside-element-right {
  border-radius: 20px;
  border: 1px solid var(--border-grey, #CFCFCF);
  background: var(--white, #FFF);
  display: flex;
  width: 500px;
  height: 500px;
  flex-direction: column;
}

.inside-element-right {
  margin-left: 20px;
  align-items: flex-end;
}

label {
    display: block; /* Ensure each label is on a new line */
    margin-bottom: 5px; /* Add some spacing between labels */
  }
  
  input {
    width: 100%; /* Make the input take up the full width */
    padding: 8px; /* Add some padding for better visual appearance */
    box-sizing: border-box; /* Ensure padding is included in the width */
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px; /* Add margin to separate the table from other elements */
  }
  
  th, td {
    padding: 10px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2; /* Add a background color for header cells */
  }

  .error-message {
    font-size: 14px;
    color: red;
  }`;

  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    bank: '',
    name: '',
    expirationDate: '',
  });

  const navigate = useNavigate('');

  const [cardNumberError, setCardNumberError] = useState('');
  const [expirationDateError, setExpirationDateError] = useState('');

  const openAddCardModal = () => {
    setShowAddCardModal(true);
  };

  const closeAddCardModal = () => {
    setShowAddCardModal(false);
  };

  const handleCardInputChange = (event) => {
    const { name, value } = event.target;
    setNewCard({
      ...newCard,
      [name]: value,
    });
    if (name === 'cardNumber') {
      const cardNumberRegex = /^\d{16}$/;
      const isValidCardNumber = cardNumberRegex.test(value);

      setCardNumberError(isValidCardNumber ? '' : 'Card number must be 16 digits');
    }

    // Validate expiration date
    if (name === 'expirationDate') {
      const expirationDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const isValidExpirationDate = expirationDateRegex.test(value);

      setExpirationDateError(isValidExpirationDate ? '' : 'Invalid expiration date format (MM/YY)');
    }
  };

  const submitCardForm = (event) => {
    event.preventDefault();
    if (cardNumberError || expirationDateError) {
      alert('Please fix validation errors before submitting.');
      return;
    }
    setCards([...cards, newCard]);
    setNewCard({
      cardNumber: '',
      bank: '',
      name: '',
      expirationDate: '',
    });
    closeAddCardModal();
  };

  const removeCard = (index) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
  };


  return (
    <>
      <Sidebar />
      <style>{scopedStyles}</style>
      <div className="parent-container">
        <div className="containerC">
          <div className="inside-element inside-element-left">
            <center><h1>Cards</h1></center>
            
            {/* Add Card Button */}
            <button onClick={openAddCardModal}>Add Card</button><br></br>

            {/* Card Table */}
            <table>
              <thead>
                <tr>
                  <th>Card Number</th>
                  <th>Bank</th>
                  <th>Name</th>
                  <th>Expiration Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card, index) => (
                  <tr key={index}>
                    <td>{card.cardNumber}</td>
                    <td>{card.bank}</td>
                    <td>{card.name}</td>
                    <td>{card.expirationDate}</td>
                    <td>
                      <button 
                        onClick={() => removeCard(index)}
                        style={{ background: 'red', color: 'white' }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showAddCardModal && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeAddCardModal}>&times;</span>
                  <form onSubmit={submitCardForm}>
                    {/* Card form fields */}
                    <label>Card Number:</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="xxxxxxxxxxxxxxxx"
                      value={newCard.cardNumber}
                      onChange={handleCardInputChange}
                      required
                    />
                    <span className="error-message">{cardNumberError}</span>

                    <label>Bank:</label>
                    <input
                      type="text"
                      name="bank"
                      placeholder="Name Of Bank"
                      value={newCard.bank}
                      onChange={handleCardInputChange}
                      required
                    />

                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name On Card"
                      value={newCard.name}
                      onChange={handleCardInputChange}
                      required
                    />

                    <label>Expiration Date:</label>
                    <input
                      type="text"
                      name="expirationDate"
                      placeholder="MM/YY"
                      value={newCard.expirationDate}
                      onChange={handleCardInputChange}
                      required
                    />
                    <span className="error-message">{expirationDateError}</span>

                    <button type="submit">Add Card</button>
                  </form>
                </div>
              </div>
            )}
          </div>
          <div className="inside-element inside-element-right">
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

