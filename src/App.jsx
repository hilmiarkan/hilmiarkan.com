import "./App.css";

function getTitle(title) {
  return title;
}

const welcome = {
  title: "react",
  greeting: "ahoy there",
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

function App() {
  return (
    <div>
      <div>
        <h1>Hellooo {getTitle("react")}</h1>
        <label htmlFor="input">
          <p className="">{welcome.greeting}</p>
          <input id="input" type="text" />
        </label>
      </div>
      <div>
        <h2>my things</h2>
        <p>{list.map((x) => x).join(", ")}</p>
      </div>
      <div>
        <h2>numbers</h2>
        <p>{exponentialNumber}</p>
      </div>
      <div>
        <h2>Books</h2>
        {books.map(function (item) {
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
        })}
      </div>
      {/* {commmennntt} */}
    </div>
  );
}

export default App;
