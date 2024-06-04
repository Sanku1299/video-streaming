import React from 'react'
import Button from './Button';

const ButtonList = () => {
  const list = ['All','Live','Gaming','News','Superhero','Bollywood','All','Live','Gaming','News','Superhero','Bollywood','All','Live','Gaming','News','Superhero'];
  return (
    <div className='flex'>
      {list.map((name, index)=><Button key={index} name={name}/>)}
    </div>
  )
}

export default ButtonList