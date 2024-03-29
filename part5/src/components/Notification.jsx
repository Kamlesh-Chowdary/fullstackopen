const Notification = ({ message }) => {
  if (!message.message) {
    return null;
  }
  const style = {
    color: message.type === "error" ? "red" : "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return (
    <div style={style} className="error">
      {message.message}
    </div>
  );
};

export default Notification;
