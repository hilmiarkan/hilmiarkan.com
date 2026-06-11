import "./App.css";
import * as React from "react";

const getTitle = (title) => title;

const welcome = {
  title: "react",
  greeting: "ahoy there, what ye lookin for?",
};

const getNull = () => null;

const list = ["laptop", "iphone xs", "macbook air", "claude"];
const number = [1, 2, 3, 4];
const exponentialNumber = number.map((number) => number * number).join(", ");

const filteredNumber = number.filter((number) => number > 2).join(", ");

const initialValue = 0;
// const cobaReduce = number.reduce(
//   (prevVal, curVal, curIndex) => prevVal + ", " + curVal + ", " + curIndex,
// );

const Item = (props) => (
  <div key={props.wkwk.objectID}>
    <a href={props.wkwk.url}>
      <h3>{props.wkwk.title}</h3>
    </a>
    <p>{props.wkwk.author}</p>
    <p>Comment: {props.wkwk.num_comment}</p>
    <p>{props.wkwk.point} Point</p>
  </div>
);

const List = (props) => {
  console.log("List renders");
  return (
    <div>
      <div>
        <h2>Books</h2>
        {props.ooyi.map((item) => (
          <Item key={item.objectID} wkwk={item} />
        ))}
      </div>
      <div>
        <h2>my things</h2>
        <div>{list.map((x) => x).join(", ")}</div>
      </div>
      <div>
        <h2>numbers</h2>
        <div>{exponentialNumber}</div>
      </div>
      {/* {commmennntt} */}
      <h4>coba filteredNumber()</h4>
      <div>{filteredNumber}</div>
      <h4>coba reduce()</h4>
      <div>
        {number.reduce((prevVal, curVal, curIndex, array) => (
          <div>
            <div>PrevVal [{prevVal}]</div>
            <div>CurVal [{curVal}]</div>
            <div>CurIndex [{curIndex}]</div>
            <div>Array [{array}]</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleChange = (event) => {
    console.log(event);
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <label htmlFor="input">
        <p className="">{welcome.greeting}</p>
        <input
          id="input"
          type="text"
          onChange={handleChange}
          onBlur={handleChange}
        />
        <p>searching for {searchTerm}</p>
      </label>
    </div>
  );
};

const App = () => {
  console.log("App renders");
  const books = [
    {
      title: "book of numbers",
      author: "jesus",
      num_comment: 5,
      url: "https://bookofnumbers.com",
      point: 7,
      objectID: 0,
    },
    {
      title: "quran",
      author: "allah",
      num_comment: 999999,
      url: "https://quran.com",
      point: 9999999,
      objectID: 1,
    },
  ];
  return (
    <div>
      <h1>Hellooo {getTitle("internet surfer")}</h1>
      <Search />
      <Search />

      <List ooyi={books} />
    </div>
  );
};
export default App;
