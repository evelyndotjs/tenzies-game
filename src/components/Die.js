export default function Die(props) {
  return (
    <div className="die--face">
      <h2 className="die--boxes">{props.value}</h2>
    </div>
  );
}
