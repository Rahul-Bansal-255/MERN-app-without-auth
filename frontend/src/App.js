import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import addItem from './state/actionCreators/addItem.js'
import List from './components/List/List.js'
import Form from './components/Form/Form.js'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://127.0.0.1:4000/api/users', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        response.forEach(element => {
          dispatch(addItem(element))
        });
      })
      .catch(err => console.log(err));
  })

  return (
    <div className='body'>
      <Form></Form>
      <List></List>
    </div>
  );
}

export default App;
