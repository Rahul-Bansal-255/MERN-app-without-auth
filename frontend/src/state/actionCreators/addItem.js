const addItem = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'add',
      payload: {
        data
      }
    });
  }
}

export default addItem;