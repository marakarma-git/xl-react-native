const dummyTurnOn = () => {
  return {
    type: 'DUMMY_REDUCER_ON',
  };
};
const dummyTurnOff = () => {
  return {
    type: 'DUMMY_REDUCER_OFF',
  };
};
export {dummyTurnOn, dummyTurnOff};
