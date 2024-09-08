import React from 'react';

const StoryDisplay = ({ story }) => {
  // Split the story into sections based on asterisks
  const sections = story.split('*').filter(section => section.trim() !== '');

  // Function to capitalize the first letter of each word
  const capitalize = (str) => {
    return str.replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      {sections.map((section, index) => {
        if (index === 0) {
          // This is the title
          return (
            <h1 key={index} className="text-3xl font-bold mb-6 text-center text-blue-800">
              {section.trim()}
            </h1>
          );
        } else if (section.includes(':')) {
          // This is a character description
          const [name, description] = section.split(':').map(s => s.trim());
          return (
            <div key={index} className="mb-4 bg-white text-black p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold mb-2 text-green-700">{capitalize(name)}</h2>
              <p>{description}</p>
            </div>
          );
        } else {
          // This is a regular paragraph
          return (
            <p key={index} className="mb-4 text-gray-800 leading-relaxed">
              {section.trim()}
            </p>
          );
        }
      })}
    </div>
  );
};

export default StoryDisplay;