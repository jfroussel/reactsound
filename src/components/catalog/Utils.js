import React from "react";
import "./table.css";
import AudioPlayer from './Audioplayer'

const style = {
  icon: {
    color: '#dcad54',
    backgroundColor: 'transparent',


  },
  iconBox: {
    border: 'solid 2px #dfe1e5c2',
    textAlign: 'center',
    paddingTop: 5,
    borderRadius: 50,
    width: 40,
    height: 40,
    cursor: 'pointer'
  },
  loops: {
    border: 'solid 2px #fff',
    textAlign: 'center',
    width: 30,
    height: 30,
    borderRadius: 50,
  }
}


const handleClickPlayer = () => {
  return (
    console.log('click on player')
  )
}

const handleMouseOver = (e) => {
  return (
    console.log('mouse over', e)
  )

}






