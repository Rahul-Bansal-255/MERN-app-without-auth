import { useSelector } from 'react-redux'
import Item from './Item/Item.js'

const List = () => {
  const state = useSelector(state => state)

  return (<>
    <div className="list">
      {
        state.map(item => {
          return (<Item key={item._id} data={item}></Item>)
        })
      }
    </div>
  </>
  );
}

export default List