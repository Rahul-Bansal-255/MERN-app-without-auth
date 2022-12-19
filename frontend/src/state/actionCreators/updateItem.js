const updateItem = (data, id) => {
  return (dispatch) => {
    dispatch({
      type: 'update',
      payload: {
        data,
        id
      }
    });
  }
}

export default updateItem;