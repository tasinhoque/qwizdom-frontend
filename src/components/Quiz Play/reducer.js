export default function reducer(state = [], action) {
  if (action.type == 'questionChange') {
    return [
      ...state,
      {
        description: action.payload.description,
      },
    ];
  }
}
