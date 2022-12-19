import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import addItem from '../../state/actionCreators/addItem.js'

const Form = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: '',
    email: '',
    address: ''
  })
  // flag to control the api calls
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
          const response = await fetch('http://127.0.0.1:4000/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charse=utf-8'
            },
            body: JSON.stringify(values)
          })
          // Check: if resource was successfully created
          if (response.status !== 201) return
          // Parsing the response body
          const item = await response.json()
          // Dispaching the new item to reducers
          dispatch(addItem(item))
          // Reseting the form values to empty
          setValues({
            name: '',
            email: '',
            address: ''
          })
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
    <div className="form">
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
  );
}

export default Form