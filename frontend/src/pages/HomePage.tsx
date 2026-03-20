import React from 'react';
import Header from '../components/Header';
import TabbedTreeDemo from '../components/TabbedTreeDemo';

const HomePage: React.FC = () => {
  return (
    <div>
      <Header title="Welcome to Thundracs" />
      <main style={{
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
      }}>
        <h2>Home Page</h2>
        <p>This is the home page of the Thundracs application.</p>
        <p>The application consists of:</p>
        <ul>
          <li><strong>Backend:</strong> Spring Boot Java application</li>
          <li><strong>Frontend:</strong> React TypeScript application</li>
        </ul>

        <div style={{ marginTop: '3rem' }}>
          <TabbedTreeDemo />
        </div>
      </main>
    </div>
  );
};

export default HomePage;