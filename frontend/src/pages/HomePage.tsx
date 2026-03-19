import React from 'react';
import Header from '../components/Header';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header title="Welcome to Thundracs" />
      <main style={{
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <h2>Home Page</h2>
        <p>This is the home page of the Thundracs application.</p>
        <p>The application consists of:</p>
        <ul>
          <li><strong>Backend:</strong> Spring Boot Java application</li>
          <li><strong>Frontend:</strong> React TypeScript application</li>
        </ul>
      </main>
    </div>
  );
};

export default HomePage;