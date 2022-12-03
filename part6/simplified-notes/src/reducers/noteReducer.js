const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return state.concat(action.data);
    case "TOGGLE_IMPORTANCE":
      return state.map((note) => {
        if (note.id !== action.data.id) {
          return note;
        }

        return { ...note, important: !note.important };
      });
    default:
      return state;
  }
};

export default noteReducer;
