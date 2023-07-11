import React, { useState } from 'react';
import getJoke from '../api/jokeData';

function Home() {
  const [jokeSetup, setJokeSetup] = useState('');
  const [jokeDelivery, setJokeDelivery] = useState('');
  const [showPunchline, setShowPunchline] = useState(false);

  const handleGetJoke = async () => {
    try {
      const joke = await getJoke();
      setJokeSetup(joke.setup);
      setJokeDelivery(joke.delivery);
      setShowPunchline(false);
    } catch (error) {
      console.warn(error);
    }
  };

  const handleGetPunchline = () => {
    setShowPunchline(true);
  };

  const handleGetAnotherJoke = () => {
    handleGetJoke();
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {!jokeSetup && (
        <button type="button" onClick={handleGetJoke} className="btn btn-primary">
          Get a Joke
        </button>
      )}

      {jokeSetup && !showPunchline && (
        <>
          <p>{jokeSetup}</p>
          <button type="button" onClick={handleGetPunchline} className="btn btn-secondary">
            Get Punchline
          </button>
        </>
      )}

      {showPunchline && (
        <>
          <p>{jokeSetup}</p>
          <p>{jokeDelivery}</p>
          <button type="button" onClick={handleGetAnotherJoke} className="btn btn-primary">
            Get Another Joke
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
