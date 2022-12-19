const itemReducer = (state = [], action) => {
  switch (action.type) {
    case 'add':
      {
        return [...state, action.payload.data];
      }
    case 'remove':
      {
        const state_ = [...state];
        const index = state_.findIndex((item) => item._id === action.payload.id);
        if (index === -1) {
          return state
        } else {
          state_.splice(index, 1)
          return state_
        }
      }
    case 'update':
      {
        const state_ = [...state]
        const index = state_.findIndex((item) => item._id === action.payload.id);
        if (index === -1) {
          return state
        } else {
          state_[index] = { ...state_[index], ...action.payload.data }
          return state_
        }
      }
    default:
      {
        return state;
      }
  }
}

export default itemReducer;