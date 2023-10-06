module.exports = {
  isFutureDated: (data) => {
    const contextTime = data?.context?.timestamp;
    const created_at = data?.message?.order?.created_at;
    const updated_at = data?.message?.order?.updated_at;
    if (created_at > contextTime || updated_at > contextTime) return false;
    else return true;
  },
};
