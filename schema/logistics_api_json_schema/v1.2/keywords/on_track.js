module.exports = {
  isTrackingFutureDated: (data) => {
    const contextTime = data?.context?.timestamp;
    const timestamp = data?.message?.tracking?.location?.time?.timestamp;
    const updated_at = data?.message?.tracking?.location?.updated_at;
   
    if (
      (timestamp && timestamp > contextTime) ||
      (updated_at && updated_at > contextTime)
    )
      return false;
    return true;
  },
};
