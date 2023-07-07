/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';

function VotingLayout() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleCandidateSelection = (name) => {
    setSelectedCandidate(name);
  };

  const renderCandidate = (name, partylist, imageUrl) => {
    const isSelected = selectedCandidate === name;

    return (
      <li key={name}>
        <div className={`relative ${isSelected ? 'opacity-50' : ''}`}>
          <a
            href="#"
            className={`block overflow-hidden group ${
              isSelected ? 'pointer-events-none' : ''
            }`}
            onClick={() => handleCandidateSelection(name)}
          >
            <img
              src={imageUrl}
              alt=""
              className={`h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]`}
            />

            <div className="relative pt-3 bg-white">
              <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                {name}
              </h3>

              <p className="mt-2">
                <span className="sr-only">Regular Price</span>
                <span className="tracking-wider text-gray-900">£24.00 GBP</span>
              </p>
            </div>
          </a>

          {isSelected && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center bg-green-200 bg-opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-green-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.293 16.293a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L9 13.586l7.293-7.293a1 1 0 1 1 1.414 1.414l-8 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-green-600 text-lg font-semibold ml-2">
                  You've voted for {name} of {partylist}
                </p>
              </div>
            </div>
          )}
        </div>
      </li>
    );
  };

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Election Name
          </h2>

          <p className="max-w-md mx-auto mt-4 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
            natus?
          </p>
        </header>

        <p className="mt-8">
          <span className="tracking-wider text-lg font-semibold text-gray-900">
            Position 1
          </span>
        </p>
        <ul className="grid gap-4 mt-2 sm:grid-cols-2 lg:grid-cols-4">
          {renderCandidate(
            'Candidate 1',
            'Partylist 1',
            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          )}
          {renderCandidate(
            'Candidate 2',
            'Partylist 2',
            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          )}
          {renderCandidate(
            'Candidate 3',
            'Partylist 3',
            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          )}
          {renderCandidate(
            'Candidate 4',
            'Partylist 4',
            'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          )}
        </ul>
      </div>
    </section>
  );
}

export default VotingLayout;
