const initialState = {
  test: "hello",
};

const tesRedu = (state = initialState, action) => {
  switch (action.type) {
    case "TEST":
      return {
        ...state,
        test: "hole",
      };
    default:
      return state;
  }
};

export default tesRedu;
