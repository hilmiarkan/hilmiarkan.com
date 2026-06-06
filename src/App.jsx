import "./App.css";

function getTitle(title) {
  return title;
}

const welcome = {
  title: "react",
  greeting: "ahoy there, what ye lookin for?",
};

function getNull() {
  return null;
}

const list = ["laptop", "iphone xs", "macbook air", "claude"];
const number = [1, 2, 3, 4];
const exponentialNumber = number
  .map(function (number) {
    return number * number;
  })
  .join(", ");

const filteredNumber = number
  .filter(function (number) {
    return number > 2;
  })
  .join(", ");

const initialValue = 0;
// const cobaReduce = number.reduce(
//   (prevVal, curVal, curIndex) => prevVal + ", " + curVal + ", " + curIndex,
// );

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

function Item({ item }) {
  return (
    <div key={item.objectID}>
      <a href={item.url}>
        <h3>{item.title}</h3>
      </a>
      <p>{item.author}</p>
      <p>Comment: {item.num_comment}</p>
      <p>{item.point} Point</p>
    </div>
  );
}

function List() {
  return (
    <div>
      <div>
        <h2>Books</h2>
        {books.map(function (item) {
          return <Item item={item} />;
        })}
      </div>
      <div>
        <h2>my things</h2>
        <p>{list.map((x) => x).join(", ")}</p>
      </div>
      <div>
        <h2>numbers</h2>
        <p>{exponentialNumber}</p>
      </div>
      {/* {commmennntt} */}
      <h4>coba filteredNumber()</h4>
      <p>{filteredNumber}</p>
      <h4>coba reduce()</h4>
      <div>
        {number.reduce(function (prevVal, curVal, curIndex, array) {
          return (
            <div>
              <p>PrevVal [{prevVal}]</p>
              <p>CurVal [{curVal}]</p>
              <p>CurIndex [{curIndex}]</p>
              <p>Array [{array}]</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Search() {
  return (
    <div>
      <label htmlFor="input">
        <p className="">{welcome.greeting}</p>
        <input id="input" type="text" />
      </label>
    </div>
  );
}

function App() {
  return (
    <div>
      <h1>Hellooo {getTitle("react")}</h1>
      <Search />
      <List />
    </div>
  );
}

export default App;
