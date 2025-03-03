function ListGroup() {
  let items = ["New York", "San Francisco", "Chicago", "Manhattan"];
  
  if (items.length == 0) {
    return(
        <>
            <h1> Length</h1>
        </>
    )
  };

  return (
    <div>
      <h1>Hello Sir</h1>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item} className="list-group-item" onClick={() => console.log('clicked')}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListGroup;
