export const getCallTypeIcon = (callType, currentTab) => {
  if (currentTab === "all-calls") {
    switch (callType) {
      case "missed":
        return <LuPhoneMissed className="iconStyle" style={{ color: "red" }} />;
      case "answered":
        return (
          <TbPhoneCheck className="iconStyle" style={{ color: "#05e322" }} />
        );
      case "voicemail":
        return (
          <PiVoicemailFill className="iconStyle" style={{ color: "red" }} />
        );
      default:
        return null;
    }
  } else {
    switch (callType) {
      case "missed":
        return <LuPhoneMissed className="iconStyle" style={{ color: "red" }} />;
      case "answered":
        return <FiPhoneCall className="iconStyle" style={{ color: "red" }} />;
      case "voicemail":
        return (
          <PiVoicemailFill className="iconStyle" style={{ color: "red" }} />
        );
      default:
        return null;
    }
  }
};

export const getCallDirectionIcon = (direction) => {
  switch (direction) {
    case "outbound":
      return (
        <BsFillTelephoneOutboundFill
          className="iconStyle"
          style={{ color: "#0680d1" }}
        />
      );
    case "inbound":
      return (
        <BsFillTelephoneInboundFill
          className="iconStyle"
          style={{ color: "#15d1cc" }}
        />
      );
    default:
      return null;
  }
};

export const groupCallsByDate = (calls) => {
  return calls.reduce((acc, call) => {
    const date = new Date(call.created_at).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(call);
    return acc;
  }, {});
};

export const formatDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds.toString().padStart(2, "0")} sec`;
  }
  const minutes = Math.floor(seconds / 60);
  return `${minutes} min`;
};
