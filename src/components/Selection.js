import styles from './Selection.module.css'
import React from 'react';


function Selection(props) {
  async function checkIfFound(item){ 
    const levelRef = props.doc(props.db, 'location', props.currentLevel.name)
    const levelSnap = await props.getDoc(levelRef)
    if (levelSnap.exists()){
      const compareItem = levelSnap.data()[item]
      if (((compareItem[0] >= props.relativePosition[0] && compareItem[0] <= props.relativePosition[0] + 32) 
      || (compareItem[0] <= props.relativePosition[0] && compareItem[0] >= props.relativePosition[0] - 32))
      && ((compareItem[1] >= props.relativePosition[1] && compareItem[1] <= props.relativePosition[1] + 32) 
      || (compareItem[1] <= props.relativePosition[1] && compareItem[1] >= props.relativePosition[1] - 32))){
        props.foundItem(item)
      }
    }
    props.toggleSelectionDisplay()
  }

  return (
    <div className={styles.selectionContainer} style={{display: props.selectionDisplay, left: props.clickedPosition[0] + 170 > window.innerWidth ? props.clickedPosition[0] - 170 : props.clickedPosition[0] + 20, top: props.clickedPosition[1] + 120 > window.innerHeight ? props.clickedPosition[1] - 120 : props.clickedPosition[1] + 20}}>
      <div style={props.currentLevel.items[0].found ? {backgroundColor: 'green'} : {}} onClick={() => checkIfFound(props.currentLevel.items[0].name)} className={styles.option1}>
        <img alt='Item to find' src={props.currentLevel.items[0].image}/>{props.currentLevel.items[0].displayName}
      </div>
      <div style={props.currentLevel.items[1].found ? {backgroundColor: 'green'} : {}} onClick={() => checkIfFound(props.currentLevel.items[1].name)} className={styles.option2}>
      <img alt='Item to find' src={props.currentLevel.items[1].image}/> {props.currentLevel.items[1].displayName}
      </div>
      <div style={props.currentLevel.items[2].found ? {backgroundColor: 'green'} : {}} onClick={() => checkIfFound(props.currentLevel.items[2].name)} className={styles.option3}>
      <img alt='Item to find' src={props.currentLevel.items[2].image}/> {props.currentLevel.items[2].displayName} 
      </div>
    </div>    
  );
}

export default Selection;