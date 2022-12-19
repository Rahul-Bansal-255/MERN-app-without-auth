import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import removeItem from '../../../state/actionCreators/removeItem'
import Modal from '../../Modal/Modal.js'
import ItemModal from '../ItemModal/ItemModal.js'

const Item = (props) => {
  // Boolean flag to control the modal
  const [togglerflag, setTogglerFlag] = useState(false)
  // Function to toggle the modal controller flag
  const toggler = (event) => {
    event.stopPropagation()
    setTogglerFlag(!togglerflag)
  }

  const dispatch = useDispatch()
  // Boolean flag to control the api calls
  const [useEffectFlag, setUseEffectFlag] = useState(false)
  useEffect(() => {
    if (useEffectFlag) {
      async function apiCall() {
        try {
          const response = await fetch(`http://127.0.0.1:4000/api/users/${props.data._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charse=utf-8'
            }
          })
          // Check: if item was successfully deleted
          if (response.status !== 200) return
          // Parsing the response body
          const item = await response.json()
          // Dispatching the changes to reducers
          dispatch(removeItem(item._id))
        } catch (err) {
          console.log(err)
        }
      }
      // Calling the Asynchoronus function
      apiCall()
      setUseEffectFlag(false)
    }
  }, [useEffectFlag])
  // Function to toggle the api call controller flag
  const useEffectToggler = (event) => {
    event.stopPropagation()
    setUseEffectFlag(true)
  }

  return (
    <>
      <div className="item" onClick={toggler}>
        <p>Name : {props.data.name}</p>
        <p>Email : {props.data.email}</p>
        <p>Address : {props.data.address}</p>
        <div className='delete-btn' onClick={useEffectToggler}>Delete</div>
      </div>
      {
        togglerflag &&
        <Modal toggler={toggler}>
          <ItemModal data={props.data} />
        </Modal>
      }
    </>
  );
}

export default Item