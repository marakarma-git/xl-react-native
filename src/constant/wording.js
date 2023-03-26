const bulkReconnectModal = (data) => {
  const total = data?.total;
  const success = data?.success;
  const fail = data?.fail;
  return `A device reconnect request has been sent successfully.\n\nEnable auto-refresh on the subscription activity area, and wait about two minutes for a new location update event to appear.\n\nThis event means that the device is successfully reconnected\n\nIf the event does not appear in the subscription activity table. Please check that the device can connect to the network.\n\nTotal processed device ${total}, success ${success} fail ${fail}`;
};

export {bulkReconnectModal};
