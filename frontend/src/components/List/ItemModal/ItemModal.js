import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import updateItem from '../../../state/actionCreators/updateItem.js'

const ItemModal = (props) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    name: props.data.name,
    email: props.data.email,
    address: props.data.address
  })
  // Boolean flag to control the api call
  const [flag, setFlag] = useState(false)

  const formHandler = (event) => {
    event.preventDefault()
    switch (event.target.name) {
      case 'name':
        setValues(prev => {
          return { ...prev, name: event.target.value }
        })
        break
      case 'email':
        setValues(prev => {
          return { ...prev, email: event.target.value }
        })
        break
      case 'address':
        setValues(prev => {
          return { ...prev, address: event.target.value }
        })
        break
      case 'submit':
        setFlag(true)
        break
      default:
        break
    }

  }

  useEffect(() => {
    if (flag) {
      async function apiCall() {
        try {
          const response = await fetch(`http://127.0.0.1:4000/api/users/${props.data._id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json;charse=utf-8'
            },
            body: JSON.stringify(values)
          })
          // Check: if data was successfully updated
          if (response.status !== 200) return
          // Parsing the response body
          const item = await response.json()
          // Dispatching the changes to reducers
          dispatch(updateItem(item, item._id))
        } catch (err) {
          console.log(err)
        }
      }
      // Calling the Asynchronous function
      apiCall()
      setFlag(false)
    }
  }, [flag])

  return (
    <div className="item-modal-form">
      <form>
        <div>
          <p>Name </p>
          <input type='text' name='name' value={values.name} onChange={formHandler} required />
        </div>
        <div>
          <p>Email </p>
          <input type='email' name='email' value={values.email} onChange={formHandler} required />
        </div>
        <div>
          <p>Address </p>
          <input type='text' name='address' value={values.address} onChange={formHandler} required />
        </div>
        <button type='button' name='submit' onClick={formHandler}>Submit</button>
      </form>
    </div>
  )
}

export default ItemModal