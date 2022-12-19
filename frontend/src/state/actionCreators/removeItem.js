const removeItem = (id) => {
  return (dispatch) => {
    dispatch({
      type: 'remove',
      payload: {
        id
      }
    });
  }
}

export default removeItem;