export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#FFF",
  };
  return (
    <div className="die--face" style={styles}>
      <h2 className="die--boxes">{props.value}</h2>
    </div>
  );
}
