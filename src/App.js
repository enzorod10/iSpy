import './style.css'
import styles from './App.module.css'
import React, { useEffect, useState } from 'react';
import beachVersion from './components/assets/beach-version.jpg'
import moonVersion from './components/assets/moon-version.jpg'
import snowVersion from './components/assets/snow-version.jpg'
import beachVersionSmall from './components/assets/beach-version-small.jpg'
import moonVersionSmall from './components/assets/moon-version-small.jpg'
import snowVersionSmall from './components/assets/snow-version-small.jpg'
import beachball from './components/assets/beachball.jpg'
import redyellowumbrella from './components/assets/redyellowumbrella.jpg'
import whitetowel from './components/assets/whitetowel.jpg'
import piratemannequin from './components/assets/piratemannequin.jpg'
import redmonster from './components/assets/redmonster.jpg'
import fallingrock from './components/assets/fallingrock.jpg'
import odlaw from './components/assets/odlaw.jpg'
import bigsnowball from './components/assets/bigsnowball.jpg'
import snowfigure from './components/assets/snowfigure.jpg'



import Menu from './components/Menu';
import Selection from './components/Selection';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, collection, where, query, getDocs } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqm6gPmV6WjpqlhBq_ANN8XvK3lhdxJrk",
  authDomain: "where-s-waldo-590ec.firebaseapp.com",
  projectId: "where-s-waldo-590ec",
  storageBucket: "where-s-waldo-590ec.appspot.com",
  messagingSenderId: "736068795985",
  appId: "1:736068795985:web:ad0e023701db2ced5d8270",
  measurementId: "G-M4BCFF1S0T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let timerToggle = null;

function App() {
  const [playStatus, setPlayStatus] = useState('inactive')
  const [menuDisplay,setMenuDisplay] = useState('flex')
  const [selectionDisplay, setSelectionDisplay] = useState('none')
  const [clickedPosition, setClickedPosition] = useState([0, 0])
  const [relativePosition, setRelativePosition] = useState([0, 0])
  const [allLevels, setAllLevels] = useState(
    [
      {
        name: 'beach',
        displayName: 'Beach',
        id: 0,
        image: beachVersion,
        smallImage: beachVersionSmall,
        items: [
          {
            name: 'bluebeachball',
            displayName: 'Blue Ball',
            image: beachball,
            found: false
          },
          {
            name: 'redyellowumbrella',
            displayName: 'Red/Yellow Umbrella',
            image: redyellowumbrella,
            found: false
          },
          {
            name: 'whitetowel',
            displayName: 'White Towel',
            image: whitetowel,
            found: false
          }
        ]
      },
      {
        name: 'moon',
        displayName: 'Moon',
        id: 1,
        image: moonVersion,
        smallImage: moonVersionSmall,
        items: [
          {
            name: 'redmonster',
            displayName: 'Red Monster',
            image: redmonster,
            found: false
          },
          {
            name: 'piratemannequin',
            displayName: 'Pirate Mannequin',
            image: piratemannequin,
            found: false
          },
          {
            name: 'fallingrock',
            displayName: 'Falling Rock',
            image: fallingrock,
            found: false
          }
        ]
      },
      {
        name: 'snow',
        displayName: 'Snow',
        id: 2,
        image: snowVersion,
        smallImage: snowVersionSmall,
        items: [
          {
            name: 'bigsnowball',
            displayName: 'Big Snowball',
            image: bigsnowball,
            found: false
          },
          {
            name: 'odlaw',
            displayName: 'Odlaw',
            image: odlaw,
            found: false
          },
          {
            name: 'snowfigure',
            displayName: 'Snow Figure',
            image: snowfigure,
            found: false
          }
        ]
      },
    ])
  const [currentLevel, setCurrentLevel] = useState(allLevels[2])
  const [picFilter, setPicFilter] = useState({})
  const [currentPlayer, setCurrentPlayer] = useState({})
  const [currentTime, setCurrentTime] = useState(0)
  const [currentModifiedTime, setCurrentModifiedTime] = useState(0)
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const usersSnap = query(collection(db, 'users'), where(currentLevel.name, '>', 0))
    getUsers(usersSnap)
  }, [currentLevel])


  async function getUsers(usersSnap){
    const users = await getDocs(usersSnap)
    let newArray = []
    users.forEach((doc) => {
      newArray.push(doc.data())
    })
    let count = 1;
    newArray.sort((a, b) => a[currentLevel.name] - b[currentLevel.name])
    newArray.forEach(item => {
      item.count = count;
      let modifiedTime;
      let m = item[currentLevel.name] / 60;
      let s = item[currentLevel.name] % 60;
      if (s < 10){
        s = ('0' + s)
      }
      modifiedTime = Math.floor(m) + ':' + s
      item[currentLevel.name] = modifiedTime
      count++;
    })
    setLeaderboard(newArray)
  }

  const toggleMenu = () => {
    window.scrollTo(0, 0)
    menuDisplay === 'none' ? setMenuDisplay('flex') : setMenuDisplay('none')
    if (selectionDisplay === 'flex'){
      setSelectionDisplay('none')
    }
    if (playStatus === 'finished'){
      const usersSnap = query(collection(db, 'users'), where(currentLevel.name, '>', 0))
      getUsers(usersSnap)
      setPlayStatus('inactive')
    }
  }

  const togglePlayStatus = () => {
    if (playStatus === 'inactive' || playStatus === 'finished'){
      setPlayStatus('active')
      setCurrentTime(0)
      const tempCurrLevel = currentLevel
      tempCurrLevel.items.forEach(item => {
        item.found = false
      })
    setCurrentLevel(tempCurrLevel)
    }
  }

  const toggleSelectionDisplay = () => {
    selectionDisplay === 'flex' ? setSelectionDisplay('none') : setSelectionDisplay('flex')
  }

  const turnOffSelectionDisplayOnScroll = () => {
    if (selectionDisplay === 'flex'){
      setSelectionDisplay('none')
    }
  }

  useEffect(() => {
    if (menuDisplay === 'flex' && playStatus === 'active'){
      setPlayStatus('paused')
    }
  }, [menuDisplay])

  useEffect(() => {
    playStatus === 'inactive' || playStatus === 'paused' || playStatus === 'finished' ? setPicFilter({opacity: '0.4', filter: 'blur(7px)'}) : setPicFilter({})
    if (playStatus === 'paused'){
      clearInterval(timerToggle)
    }
  }, [playStatus])
  
  const selectPosition = (e) => {
    if (playStatus === 'active'){
      toggleSelectionDisplay()
      setClickedPosition([e.pageX, e.pageY])
      setRelativePosition([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
    }
  }

  const foundItem = (name) => {
    const tempCurrLevel = currentLevel
    tempCurrLevel.items.forEach(item => {
      if (item.name === name){
        item.found = true
      }
    })
    setCurrentLevel(tempCurrLevel)
    checkWinStatus()
  }

  const checkWinStatus = () => {
    currentLevel.items.every(item => item.found) ? finishedGame() : console.log('still got more')
  }

  const finishedGame = () => {
    setPlayStatus('finished')
    window.scrollTo(0, 0)
    clearInterval(timerToggle)
    setPicFilter({opacity: '0.4', filter: 'blur(7px)'})
  }

  const changeLevel = (direction) => {
    if (direction === 'left'){
      currentLevel.id === 0 ? setCurrentLevel(allLevels[2]) : setCurrentLevel(allLevels[(currentLevel.id - 1) % 3])
    } else {
      setCurrentLevel(allLevels[(currentLevel.id + 1) % 3])
    }
  }

  const addCurrentPlayer = (name) => {
    setCurrentPlayer({name: name, time: 0})
  }

  const signedOut = () => {
    setPlayStatus('inactive')    
    setCurrentPlayer({})
    setCurrentTime(0)
    clearInterval(timerToggle)   
  }

  const resumeGame = () => {
    setPlayStatus('active')
    toggleMenu()
    beginTimer()
  }

  const beginTimer = () => {
    timerToggle = setInterval(() => {
      setCurrentTime(prevTimer => prevTimer + 1 )
    }, 1000)
  }

  useEffect(() => {
    let modifiedTime;
    let m = currentTime / 60;
    let s = currentTime % 60;
    if (s < 10){
      s = ('0' + s)
    }
    modifiedTime = Math.floor(m) + ':' + s

    setCurrentModifiedTime(modifiedTime)
  }, [currentTime])

  return (
    <div className={styles.outerContainer}>
      <Menu leaderboard={leaderboard} currentTime={currentTime} beginTimer={beginTimer} addCurrentPlayer={addCurrentPlayer} currentPlayer={currentPlayer} resumeGame={resumeGame} signedOut={signedOut} currentLevel={currentLevel} doc={doc} getDoc={getDoc} db={db} changeLevel={changeLevel} toggleMenu={toggleMenu} togglePlayStatus={togglePlayStatus} playStatus={playStatus} displayStatus={menuDisplay}/>
      <div className={styles.header}>
        <div className={styles.title}>RANDOM TITLE</div>
        <div className={styles.timer}> {currentModifiedTime}</div>
        <div onClick={toggleMenu}>MENU</div>
      </div>
      <div onScroll={turnOffSelectionDisplayOnScroll} className={styles.innerContainer}>
        <img style={picFilter} onClick={e => selectPosition(e)} alt={`${currentLevel.name} version selected`} src={currentLevel.image} />
      </div>
      <Selection foundItem={foundItem} doc={doc} getDoc={getDoc} currentLevel={currentLevel} db={db} relativePosition={relativePosition} clickedPosition={clickedPosition} toggleSelectionDisplay={toggleSelectionDisplay} selectionDisplay={selectionDisplay}/>
      <div className={styles.indicator} style={{display: selectionDisplay, left: clickedPosition[0] - 12.5, top: clickedPosition[1] - 12.5}}>
      </div>
      {playStatus === 'finished' ? 
      <div style={{position: 'absolute'}} className={styles.winningMenu}>
        <div>
          Well done!
        </div>
        <div>
          {currentPlayer.name}, <span>you managed to find all of the hidden objects in </span>{currentModifiedTime}.
        </div>
        <div style={{fontStyle: 'italic', fontWeight: '600'}}>
          Click on the menu to see where you are in the leaderboard or to play again.
        </div>
      </div> :
      <div style={{display: 'none'}}>
      </div>  
    }
      
    </div>
  );
}

export default App;