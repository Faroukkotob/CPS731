import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, onSnapshot } from 'firebase/firestore';
import Navbar from "../Navbar/Navbar";

const Staff = () => {
    const scopedStyles = `
  .parent-Ocontainer {
    display: flex;
    align-items: center;
    justify-content: center; /* Center horizontally */
    width: 2200px;
    height: 550px;
  }
  .orders-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    margin-right: -1000;
  }
  
  .orders-table {
    width: 110%; /* Adjust the width as needed */
    font-size: 14px;
    border-collapse: collapse;
    margin-top: 20px; /* Adjust the top margin */
  }
  
  .orders-table th,
  .orders-table td {
    padding: 24px; /* Adjust the padding */
    border: 1px solid #ddd; /* Add border for better visibility */
  }
  
  .orders-table th {
    background-color: #f2f2f2; /* Background color for header */
  }
  
  .orders-table ul {
    list-style-type: none;
    padding: 0;
  }
  
  .orders-table li {
    margin-bottom: 5px; /* Add margin between list items */
  }`;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const db = getFirestore();
      const ordersCollection = collection(db, 'orders');

      const q = query(ordersCollection);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          userId: doc.data().userId, // Include the userId
          ...doc.data(),
        }));
        setOrders(newOrders);
      });

      return () => {
        unsubscribe();
      };
    };

    fetchOrders();
  }, []);

  return (
    <>
      <Navbar />
      <style>{scopedStyles}</style>
      <div className="parent-Ocontainer">
        <div className="orders-container"><br></br><br></br><br></br>
          <h1>All orders</h1>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th> {/* New column for User ID */}
                <th>Books</th>
                <th>Date Ordered</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td> {/* Display the User ID */}
                  <td>
                    <ul>
                      {order.books.map((book, index) => (
                        <li key={index}>
                          {book.title} by {book.author}, Price: {book.price}, Due: {book.due}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{new Date(order.timestamp.seconds * 1000).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Staff;
