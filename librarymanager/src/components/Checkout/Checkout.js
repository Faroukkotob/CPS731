import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../LibraryManager/LibraryManager.css';
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth } from "../Auth/Auth";
import Auth from '../Auth/Auth'; 





const Checkout = () => {

  const scopedStyles = `
  .parent-container {
    display: flex;
    width: 110%;
    height: 90vh;
    margin: 0 auto; 
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
  }
  .add-button {
    background-color: rgba(91, 128, 120, 0.57);
    width: 100px;
    margin: 0 auto; 
    display: block;
  }
  .pay-fines-button {
    display: flex;
    width: 400px;
    padding: 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: var(--green, #1BB66E);
    text-align: center;
    color: white; /* Adjust text color */
    font-size: 16px; /* Adjust font size */
    cursor: pointer;
    border: none;
  }
  
  .pay-fines-button:hover {
    background: var(--dark-green, #159358); /* Adjust hover background color */
  }
  `;

  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [cards, setCards] = useState([]);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    bank: '',
    name: '',
    expirationDate: '',
  });

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
  const [books, setBooks] = useState([
    { author: 'zuheir', title: 'psy', due: 'jan 24', price: '71.2$' },
    { author: 'seema', title: 'cs', due: 'DEC 26', price: '13.5$' },
    // Add more books as needed
  ]);

  const totalFee = books.reduce((acc, book) => acc + parseFloat(book.price), 0);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardSelection = (card) => {
    setSelectedCard(card);
  };


  const payFines = () => {
    if (!selectedCard) {
      alert('Please select a card before paying.');
      return;
    }
  
    if (totalFee === 0) {
      alert('Total Fee is zero. No payment required.');
      return;
    }
  
    // Logic for handling payment, e.g., redirect to a payment gateway
    alert(`Total Fee: $${totalFee.toFixed(2)} - Payment Successful with Card: ${selectedCard.cardNumber}`);
    sendOrderAndPaymentToFirebase();
    setBooks([]);
  };

  const clearTableContent = () => {
    setBooks([]);
  };

  const sendOrderToFirebase = async () => {
    try {
      const db = getFirestore();
      const ordersCollection = collection(db, 'orders');

      const orderData = {
        userId: auth.currentUser.uid,
        books: books,
        timestamp: serverTimestamp(),
      };
  
      await addDoc(ordersCollection, orderData);

      console.log('Order successfully added to Firebase');
  
    } catch (error) {
      console.error('Error adding order to Firebase: ', error);
    }
  };

  const sendOrderAndPaymentToFirebase = async () => {
    try {
      const db = getFirestore();
      const ordersCollection = collection(db, 'orders');
      const paymentsCollection = collection(db, 'payments');
  
      // Create a new order
      const orderData = {
        userId: auth.currentUser.uid,
        books: books,
        timestamp: serverTimestamp(),
      };
  
      // Add the order to the 'orders' collection
      const orderRef = await addDoc(ordersCollection, orderData);
  
      // Create a new payment
      const paymentData = {
        orderId: orderRef.id, // Use the ID of the newly added order
        userId: auth.currentUser.uid,
        cardNumber: selectedCard.cardNumber,
        amount: totalFee.toFixed(2),
        timestamp: serverTimestamp(),
      };
  
      // Add the payment to the 'payments' collection
      await addDoc(paymentsCollection, paymentData);
  
      console.log('Order and Payment successfully added to Firebase');
  
    } catch (error) {
      console.error('Error adding Order and Payment to Firebase: ', error);
    }
  };


  return (
    <>
      <Navbar />
      <style>{scopedStyles}</style>
      <div className="parent-container">
        <div className="containerC">
          <div className="inside-element inside-element-left">
            <center><h1>Cards</h1></center>
            
            {/* Add Card Button */}
            <button onClick={openAddCardModal} className="add-button" >Add Card</button><br></br>

            {/* Card Table */}
            <table>
              <thead>
                <tr>
                  <th></th>
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
                     <td>
                      <input
                        type="radio"
                        name="cardSelection"
                        checked={selectedCard === card}
                        onChange={() => handleCardSelection(card)}
                      />
                    </td>
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
            <table>
            <thead>
              <tr>
                <th>Author</th>
                <th>Title</th>
                <th>Due</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book, index) => (
              <tr key={index}>
                <td>{book.author}</td>
                <td>{book.title}</td>
                <td>{book.due}</td>
                <td>{book.price}</td>
              </tr>
              ))}
            </tbody>
            </table>
            <div className="total-fee-section">
              <p>Total Fee: ${totalFee.toFixed(2)}</p>
              <button onClick={() => { payFines();}} className="pay-fines-button">Pay Fines</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

