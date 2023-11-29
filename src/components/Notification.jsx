const Notification = ({ message, appliedStyle }) => {
  return (
    <>
      <p style={appliedStyle}>{message}</p>
    </>
  );
};

export default Notification;
