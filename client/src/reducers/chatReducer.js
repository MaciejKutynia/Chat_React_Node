const initialState = {
  name: '',
  room: '',
};

const chatReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case 'GET_NAME':
      return {
        ...state,
        name: payload.name,
        room: payload.room,
      };
    case 'CLEAR_NAME':
      return {
        ...state,
        name: null,
        room: null,
      };
    default:
      return { ...state };
  }
};

export default chatReducer;
