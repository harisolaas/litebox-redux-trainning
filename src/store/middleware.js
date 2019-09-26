export const saveToLocalStorage = store => next => action => {
  // Execute reducer on the previous state.
  let result = next(action);

  // Save to local storage.
  const stringifiedState = JSON.stringify(store.getState());
  localStorage.setItem("state", stringifiedState);

  // Pass the new state.
  return result;
};
