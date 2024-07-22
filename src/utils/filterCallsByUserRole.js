const filterCallsByUserRole = (calls, user) => {
  if (!user) {
    return [];
  }

  const { role, name } = user;

  let from;

  const ownerFromMapping = {
    "Owner 1": 1,
    "Owner 2": 2,
    "Owner 3": 4,
  };

  if (role === "Owner") {
    from = ownerFromMapping[name];
  }

  const filteredCalls = calls.filter((call) => {
    const isRelevantCall =
      (call.from === from || call.to === from) &&
      !call.is_archived &&
      (call.call_type === "answered" || call.call_type === "missed");

    return role === "Admin"
      ? !call.is_archived &&
          (call.call_type === "answered" || call.call_type === "missed")
      : isRelevantCall;
  });

  return filteredCalls;
};

export default filterCallsByUserRole;
