import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [cache, setCache] = useState({});
  const [display, setDisplay] = useState(false);

  const fetchData = async () => {
    if (cache[input]) {
      console.log("return from CACHE:", input);
      setData(cache[input]);
      return;
    }

    console.log("fetch:", input);
    const res = await fetch(`https://dummyjson.com/recipes/search?q=${input}`);
    const result = await res.json();
    setCache({ ...cache, [input]: result.recipes });
    setData(result.recipes);
  };

  useEffect(() => {
    // console.log("mount");
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="App">
      Debouncing <br /> <br />
      <div>
        <input
          className="input-box"
          type="text"
          value={input}
          onFocus={() => setDisplay(true)}
          onBlur={() => setDisplay(false)}
          onChange={(e) => setInput(e.target.value)}
        />
        {display && (
          <div className="results-container">
            {data.map((item) => (
              <span className="items" key={item.id}>
                {item.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
