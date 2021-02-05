export const dashboardHeaderAuth = (customerNo) => {
  const headerAuth = {
    Authorization: 'Bearer ' + customerNo,
    'Content-Type': 'application/json',
    Accept: '*/*',
  };
  return headerAuth;
};
