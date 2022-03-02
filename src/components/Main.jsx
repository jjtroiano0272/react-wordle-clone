import React, { useState, useEffect, forwardRef } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { nanoid } from 'nanoid';
import axios from 'axios';
// import 'dotenv/config';
// import express from 'express';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Jump from 'react-reveal';
import rainbowSpinLoader from './common/rainbowSpinLoader'; // just return <e>rainbowSpinLoader()</e>
// User-generated component imports go here

export default function Main(props) {
  const tileDisplay = document.querySelector('.tile-container');
  // const keyboard = document.querySelector('.key-container');
  const messageDisplay = document.querySelector('.msg-container');

  const [gameOver, setGameOver] = useState(false);
  let currentRow = 0;
  let currentTile = 0;
  let wordle = '';
  // TODO: Turn this back on when the logic works and you just need a real source for it.
  const wordleLength = 6;
  // Here's the paid option for an API call. I'm currently over quota [01MAR22]
  // const apiCallOptions = {
  //   method: 'GET',
  //   url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
  //   params: { count: '5', wordLength: wordleLength },
  //   headers: {
  //     'x-rapidapi-host': 'random-words5.p.rapidapi.com',
  //     // 'x-rapidapi-key': process.env.RAPID_API_KEY,
  //     'x-rapidapi-key': 'ff25be3b77msh3b29f7f8eea09bap187d99jsn385e047fde4c',
  //   },
  // };

  // const getWordle = () => {
  //   axios
  //     .request(apiCallOptions)
  //     .then(function (response) {
  //       console.log(`Wordle is: ${response.data[0].toUpperCase()}`);
  //       wordle = response.data[0].toUpperCase();
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // };
  // getWordle();

  const getWordleTEST = () => {
    axios
      .get(
        'https://raw.githubusercontent.com/RazorSh4rk/random-word-api/master/words.json'
      )
      .then(response => {
        // wordle = response.data[randIndex].toUpperCase();
        // console.log(`Wordle is: ${wordle.toUpperCase()}`);
        const responseList = response.data.filter(word => word.length === 6);
        const randIndex = Math.floor(
          Math.random() * Object.keys(responseList).length
        );
        wordle = responseList[randIndex].toUpperCase();
        console.log(wordle);
      })
      .catch(error => {
        console.error(error);
      });
  };
  getWordleTEST();

  var PAID_options = {
    method: 'GET',
    url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/theme/',
    // Entry is the word we're checking
    params: { entry: wordle },
    headers: {
      'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com',
      'x-rapidapi-key': 'ff25be3b77msh3b29f7f8eea09bap187d99jsn385e047fde4c',
    },
  };

  const inDictionary = async word => {
    let exists;

    var options = {
      method: 'GET',
      url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/theme/',
      params: { entry: `${word}` },
      headers: {
        'x-rapidapi-host': 'twinword-word-graph-dictionary.p.rapidapi.com',
        'x-rapidapi-key': 'ff25be3b77msh3b29f7f8eea09bap187d99jsn385e047fde4c',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.result_code);

      if (response.data.result_code == 200) {
        exists = true;
      } else if (response.data.result_code == 462) {
        exists = false;
      }

      console.log(`Exiting. ${word} found?: ${exists}`);

      return exists;
    } catch (error) {
      console.error(error);
      exists = false;
    }
  };

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
    '«',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'ENTER',
  ];

  const guessRows = [...Array(6)].map(row => Array(wordleLength).fill(''));
  console.log(`There are ${guessRows.length} guessRows.`);

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
        id={key}
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
      deleteLetter();
      return;
    }
    if (letter === 'ENTER') {
      checkRow();
      return;
    }

    addLetter(letter);
    console.log(`guessRows: ${guessRows}`);
  };

  const addLetter = letter => {
    // TODO: Here's the part you'll change for different game variants.
    if (currentTile < wordleLength && currentRow < guessRows.length) {
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

  const checkRow = async () => {
    console.log(`At top of checkRow`);
    // If guess row array is filled
    const guess = guessRows[currentRow].join('');
    console.log(`Guess is ${guess}\nWordle is ${wordle}`);

    // If user has filled out the entire row with a guess, check it.
    // TODO: Can I write this more elegantly? This logic is kinda gross
    if (currentTile > wordleLength - 1) {
      // Check if word exists in dictionary
      console.log(`Checking ${guess}...\n${await inDictionary(guess)}`);
      if ((await inDictionary(guess)) === false) {
        showMessage('Not a word!');
      }
      if ((await inDictionary(guess)) === true) {
        console.log('Flipping!');
        flipTile();
        if (guess === wordle) {
          showMessage('Success!');
          setGameOver(true);
          return;
        } else {
          if (currentRow >= wordleLength) {
            setGameOver(true);
            showMessage('Game over! Come back tomorrow!');
            return;
          }
          if (currentRow < wordleLength) {
            currentRow++;
            currentTile = 0;
          }
        }
      }
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

  const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter);
    // Here's the bug. Right here.
    key.classList.add(color);
  };

  const flipTile = () => {
    const rowTiles = document.querySelector(
      '#guessRow-' + currentRow
    ).childNodes;
    let checkWordle = wordle;
    const guess = [];

    rowTiles.forEach(tile => {
      guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay' });
    });

    // rowTiles.forEach((tile, index) => {
    //   const dataLetter = tile.getAttribute('data');

    //   setTimeout(() => {
    //     tile.classList.add('flip');
    //     if (dataLetter == wordle[index]) {
    //       tile.classList.add('green-overlay');
    //       addColorToKey(dataLetter, 'green-overlay');
    //     } else if (wordle.includes(dataLetter)) {
    //       tile.classList.add('yellow-overlay');
    //     } else {
    //       tile.classList.add('grey-overlay');
    //     }
    //   }, 500 * index);
    // });
    guess.forEach((guess, index) => {
      if (guess.letter == wordle[index]) {
        guess.color = 'green-overlay';
        checkWordle = checkWordle.replace(guess.letter, '');
      }
    });

    guess.forEach(guess => {
      if (checkWordle.includes(guess.letter)) {
        guess.color = 'yellow-overlay';
        checkWordle = checkWordle.replace(guess.letter, '');
      }
    });

    rowTiles.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add('flip');
        tile.classList.add(guess[index].color);
        addColorToKey(guess[index].letter, guess[index].color);
      }, 500 * index);
    });
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const [snackBarOpen, setSnackBarOpen] = useState(true);
  const handleCloseSnackbar = () => {
    setSnackBarOpen(false);
  };

  return (
    // <div className='container'>

    <div className='game-container'>
      <div className='msg-container'>
        {/* {gameOver && showMessage('helloooooo')} */}
        <Snackbar
          open={snackBarOpen}
          autoHideDuration={8000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          // message={`This current version doesn't have access to the random word API--it's over the quota for a free API. It'll be back online soon.`}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity='info'
            sx={{ width: '100%' }}
          >
            This current version doesn't have access to the random word
            API--it's over the quota for a free API. It'll be back online soon.
          </Alert>
        </Snackbar>
      </div>
      <div className='tile-container'>{guessRowsDisplay}</div>
      <div className='key-container'>{keyboard}</div>
    </div>
    // </div>
  );
}
