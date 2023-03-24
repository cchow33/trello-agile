import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import ListModal from './ActivityModal'
import AddCard from '../components/AddCard'
import SaveCardBtn from './SaveCardBtn'
import CancelCard from './CancelCard'
import './List.css'

const List = ({ name, cards }) => {
  const [openModal, setOpenModal] = useState(false)
  const [openNewCard, setOpenNewCard] = useState(false)
  
  const toggleModal = () => {
    setOpenModal(!openModal)
  }

  return (

    <div className="list">
      <span className="list-header">
      <p className="list-name">{name}</p>
      <span className="dots" onClick={() => toggleModal()}><BsThreeDots/></span>
      </span>

      {cards.map((card) => (
        <div key={card._id} className="cards">
          {card.title}
        </div>
      ))}

      <div>
    </div>
    
    <div className="input-field">
    
      <AddCard open={openNewCard}/>
      
        { !openNewCard ? 
          <button className="add-card" 
            onClick={() => { setOpenNewCard(true) }}>
              Add a card</button> : 
          <div className="card-btns">
              <SaveCardBtn/>  
              <CancelCard/>
          </div>
        }
      
      </div>
    </div>
    
    )
  }

export default List

