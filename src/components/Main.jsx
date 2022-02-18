import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import $ from 'jquery';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import rainbowSpinLoader from './common/rainbowSpinLoader'; // just return <e>rainbowSpinLoader()</e>
// User-generated component imports go here

export default function Main(props) {
  const [gameOver, setGameOver] = useState(false);

  const tileDisplay = document.querySelector('.tile-container');
  // const keyboard = document.querySelector('.key-container');

  const word = 'SUPER';
  const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',
  ];

  let currentRow = 0;
  let currentTile = 0;

  const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  // for every guessRow =>

  const guessRowsDisplay = guessRows.map((row, rowIndex) => {
    return (
      <div id={`guessRow-${rowIndex}`} key={rowIndex}>
        {/* tileElement */}
        {row.map((guess, guessIndex) => (
          <div
            id={`guessRow-${rowIndex}-tile-${guessIndex}`}
            key={guessIndex}
            className='tile'
          ></div>
        ))}
      </div>
    );
  });

  const keyboard = keys.map((key, index) => {
    return (
      <button
        className='btn'
        id={index}
        onClick={() => handleClick(key)}
        key={index}
      >
        {key}
      </button>
    );
  });

  const handleClick = letter => {
    console.log(`${letter} clicked!`);

    if (letter === '«') {
      console.log('delete letter');
      console.log(`guessRows: ${guessRows}`);
      deleteLetter();
      return;
    }
    if (letter === 'ENTER') {
      checkRow();
      console.log('check row');
      console.log(`guessRows: ${guessRows}`);
      return;
    }

    addLetter(letter);
    console.log(`guessRows: ${guessRows}`);
  };

  const addLetter = letter => {
    // TODO: Here's the part you'll change for different game variants.
    if (currentTile < 5 && currentRow < 6) {
      const tile = document.getElementById(
        `guessRow-${currentRow}-tile-${currentTile}`
      );
      tile.textContent = letter;

      guessRows[currentRow][currentTile] = letter;
      tile.setAttribute('data', letter);

      currentTile++;
    }
  };

  const deleteLetter = () => {
    if (currentTile > 0) {
      currentTile--;
      const tile = document.getElementById(
        `guessRow-${currentRow}-tile-${currentTile}`
      );
      tile.textContent = '';
      guessRows[currentRow][currentTile] = '';
      tile.setAttribute('data', '');
    }
  };

  const showMessage = message => {
    // GFYCat Gif
    // return (
    //   <div
    //     style={{ position: 'relative', paddingBottom: 'calc(75.00% + 44px)' }}
    //   >
    //     <iframe
    //       src='https://gfycat.com/ifr/BossyDownrightCassowary'
    //       frameborder='0'
    //       scrolling='no'
    //       width='40%'
    //       height='40%'
    //       style={{ position: 'absolute', top: '20%', left: '0' }}
    //     />
    //   </div>
    // );
    // return <p className='lead text-light'>{message}</p>;

    // Vanilla JS version
    const messageDisplay = document.querySelector('.msg-container'); // This fixes it returning null
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000);

    // React approach
  };

  const checkRow = () => {
    // If guess row array is filled
    const guess = guessRows[currentRow].join('');

    if (currentTile > 4) {
      console.log(`Guess is ${guess}\nWordle is ${word}`);
      flipTile();
      if (guess === word) {
        showMessage('Success!');
        setGameOver(true);
        return;
      } else {
        if (currentRow >= 5) {
          setGameOver(false);
          showMessage('Game over!');
          return;
        }
        if (currentRow < 5) {
          currentRow++;
          currentTile = 0;
        }
      }
    }
  };

  const flipTile = () => {
    const rowTiles = document.querySelector(
      `#guessRow-${currentRow}`
    ).childNodes;

    rowTiles.forEach((tile, index) => {
      const dataLetter = tile.getAttribute('data');
      if (dataLetter === word[index]) {
        tile.classList.add('green-overlay', 'text-light');
      } else if (word.includes(dataLetter)) {
        tile.classList.add('yellow-overlay', 'text-light');
      } else {
        tile.classList.add('grey-overlay', 'text-light');
      }
    });
  };

  return (
    // <div className='container'>

    <div className='game-container'>
      <div className='msg-container'>
        {/* {gameOver && showMessage('helloooooo')} */}
      </div>
      <div className='tile-container'>{guessRowsDisplay}</div>
      <div className='key-container'>{keyboard}</div>
    </div>
    // </div>
  );
}
