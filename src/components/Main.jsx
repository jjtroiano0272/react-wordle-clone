import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
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
  const tileDisplay = document.querySelector('.tile-container');
  // const keyboard = document.querySelector('.key-container');

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
            className='tile'
          ></div>
        ))}
      </div>
    );
  });

  const handleClick = key => {
    console.log(`${key} clicked!`);
  };

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

  return (
    <div className='container'>
      {/* https://rapidapi.com/twinword/api/word-dictionary/
            "result_msg":"Success"
            "result_msg":"Entry word not found" */}
      {/* https://rapidapi.com/sheharyar566/api/random-words5/?utm_source=ANIA-KUBOW&utm_medium=DevRel&utm_campaign=DevRel
       */}
      {/* <div className='game-container'></div> */}
      {/* <div className='msg-container'></div> */}
      <div className='tile-container'>{guessRowsDisplay}</div>
      <div className='key-container'>{keyboard}</div>
    </div>
  );
}
