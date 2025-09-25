import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <section className="counter">
      <h2>Contador</h2>
      <p>Valor actual: {count}</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
      <button onClick={() => setCount(count - 1)}>Decrementar</button>
    </section>
  );
}

export default Counter;
