import styles from './Menu.module.css'
import React, { useEffect, useState } from 'react';
import { setDoc } from 'firebase/firestore';
import uniqid from 'uniqid'

function Menu(props) {
  const [status, setStatus] = useState('offline');
  const [modifiedMenu, setModifiedMenu] = useState('flex')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState([])

  const handleClick = () => {
    if(username.trim() !== ''){
      status === 'offline' ? setStatus('online') : setStatus('offline')
      addUser(username)
    } else {
      setErrorMessage([
        'Please enter a valid username'
      ])
    }
  }

  const signOut = () => {
    setStatus('offline')
    props.signedOut();
  }
  
  useEffect(() => {
    props.playStatus === 'active' || props.playStatus === 'paused' ? setModifiedMenu('none') : setModifiedMenu('flex')
  }, [props.playStatus])

  const handlePlayButtonClick = () => {
    if (props.currentPlayer.name !== '' && status !== 'offline'){
      props.togglePlayStatus()
      props.toggleMenu()
      props.beginTimer()
    } else {
      setErrorMessage([
        'You must be logged in to play!'
      ])
    }
  }

  const getUsername = (e) => {
    setErrorMessage('')
    setUsername(e.target.value)
  }

  async function addUser(name){
    await setDoc(props.doc(props.db, 'users', name), {
      name: name,
      id: uniqid()
    });
    props.addCurrentPlayer(name)
  }

  useEffect(() => {
    if (props.playStatus === 'finished'){
      updateUserInfo()
    }
  }, [props.playStatus])

  async function updateUserInfo(){
    await setDoc(props.doc(props.db, 'users', props.currentPlayer.name), {
      [props.currentLevel.name]: props.currentTime
    }, { merge: true });
  }

  return (
    <div style={{display: props.displayStatus}} className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        {status === 'offline' ?
          <div className={styles.accountContainer}>
            <div className={styles.enterAccountInfo}>
                <input type='text' placeholder='Username' onChange={e => getUsername(e)}></input>
                <div onClick={() => handleClick('login')}>Login</div>
                <div className={styles.errorMessage} style={{position: 'absolute', top: '80px'}}> {errorMessage} </div>
            </div>
          </div>
          :
          <div className={styles.accountContainer}>
            <div>You are logged in as: </div>
            <div>{props.currentPlayer.name}</div>
            <div onClick={signOut}>Sign Out</div>
          </div>
        }
        <div className={styles.leaderboardContainer}>
          <div className={styles.leaderboardHeader}> {props.currentLevel.displayName} Level Leaderboard</div>
          <div className={styles.leaderboard}>
            <div>
                {props.leaderboard.map(item => {
                  return <div key={uniqid()}> 
                      <div>{item.count}</div>
                      <div>{item.name}</div>
                      <div>{item[props.currentLevel.name]}</div> 
                    </div>
                })}
            </div>
          </div>
        </div>
      </div>
      <div style={{display: modifiedMenu}} className={styles.selectLevelContainer}>
        <div onClick={() => props.changeLevel('left')}> {`<`} </div>
        <div> <img alt='Small display of level' src={props.currentLevel.smallImage}/></div>
        <div onClick={() => props.changeLevel('right')}> {`>`} </div>
      </div>
      {props.playStatus === 'inactive' || props.playStatus === 'finished' ?
        <div onClick={handlePlayButtonClick} style={{display: modifiedMenu}} className={styles.playButton}>
          PLAY
        </div>
        :
        <div onClick={props.resumeGame} className={styles.playButton}>
          RESUME
        </div>
      }
    </div>    
  );
}

export default Menu;