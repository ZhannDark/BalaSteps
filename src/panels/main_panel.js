"use strict";
// import React, { useState } from 'react';
// import { Button } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import './symptom_tracker.scss';
// import logo from '../../images/logo/main_logo.png';
//
// const SymptomTracker = () => {
//   const navigate = useNavigate();
//   const [symptoms, setSymptoms] = useState([
//     {
//       id: 1,
//       name: 'Symptom 1',
//       actions: 'Actions/therapies for the symptom 1',
//     },
//     {
//       id: 2,
//       name: 'Symptom 1',
//       actions: 'Actions/therapies for the symptom 1',
//     },
//     {
//       id: 3,
//       name: 'Symptom 1',
//       actions: 'Actions/therapies for the symptom 1',
//     },
//   ]);
//
//   const handleLogout = async () => {
//     try {
//       const response = await fetch('https://your-api.com/auth/logout', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//
//       if (response.ok) {
//         localStorage.removeItem('token');
//         navigate('/login');
//       } else {
//         console.error('Logout failed');
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };
//
//   return (
//     <div className="symptom-tracker-container">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <img src={logo} alt="Balasteps" className="logo" />
//         <button className="menu-button">☰</button>
//         <nav className="nav-menu">
//           <button className="nav-item active">🩺 Symptom Tracker</button>
//           <button className="nav-item">💬 Discussion Forum</button>
//           <button className="nav-item">ℹ️ Information Hub</button>
//           <button className="nav-item">🛒 Marketplace</button>
//           <button className="nav-item">🤖 iKomek AI Assistant</button>
//           <button className="nav-item">👤 Profile</button>
//         </nav>
//       </aside>
//
//       {/* Main Content */}
//       <main className="content">
//         <div className="header">
//           <h1 className="title">Symptom Tracker</h1>
//           <Button className="logout-button" onClick={handleLogout}>
//             Log out
//           </Button>
//         </div>
//
//         <Button className="add-symptom">+ Add Symptom</Button>
//
//         {/* Symptom Cards */}
//         <div className="symptoms-list">
//           {symptoms.map((symptom) => (
//             <div key={symptom.id} className="symptom-card">
//               <strong>{symptom.name}</strong>
//               <p>{symptom.actions}</p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };
//
// export default SymptomTracker;
//# sourceMappingURL=main_panel.js.map