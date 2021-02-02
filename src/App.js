import React, { Fragment } from "react";
import "./App.css";
import Header from "./components/header";
import Newspane from "./components/news-pane";
import Statsboard from "./components/stats";
import Searchbar from "./components/searchbar";
import Chart from "./components/Modal";


let HOST =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_HOST
    : "http://localhost:4888";

let HOST = (process.env.NODE_ENV === 'production') ? process.env.REACT_APP_API_HOST : 'http://localhost:4888'
console.log(HOST)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalHistory: [],
      countryHistory: [],
      globalBreakdowns: [],
      filteredBreakdowns: [],
      news: [],
      countryName: "",
      images: [],
      searchfield: "",
      openModal: false,
    };
    this.handleInput = this.handleInput.bind(this);
    this.fetchHistory = this.fetchHistory.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = () => {
    fetch(`${HOST}/stats`, {
      headers: {
        "content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ param: "global" }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          globalHistory: data.stats.history,
          globalBreakdowns: data.stats.breakdowns,
          filteredBreakdowns: data.stats.breakdowns,
        });
      });
    fetch(`${HOST}/news`, {
      method: "get",
    })
      .then((response) => response.json())
      .then((data) => data.news)
      .then((news) => {
        let imagesArr = [];
        imagesArr = news.map((item) => {
          if (item.images === null) {
            return {
              url: "",
              title: "",
            };
          }
          return item.images[0];
        });
        this.setState({
          news: news,
          images: imagesArr,
        });
      });
  };

  handleInput(event) {
    this.setState({ searchfield: event.target.value });
  }

  fetchHistory(isoCode) {
    if (isoCode !== null) {
      console.log("Preparing to fetch: ", isoCode);
      this.setState({
        openModal: true,
      });

      console.log("Fetching", isoCode);
      fetch(`${HOST}/stats`, {
        headers: {
          "content-type": "application/json",
        },
        method: "post",
        body: JSON.stringify({ param: isoCode }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState({ countryName: data.location.countryOrRegion });
          return data.stats.history;
        })
        // .then(stats => stats.history)
        .then((history) => {
          this.setState({ countryHistory: [] });
          let newHistory = history.map((detail) => {
            return Object.assign({}, detail, {
              date: new Date(detail.date).toDateString().slice(4, 10),
            });
          });
          this.setState({ countryHistory: newHistory });
        })
        .catch((e) => console.log("Error!", e));
    } else {
      alert(`Sorry! data not available :(`);
    }
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    const { news, images, openModal, countryHistory } = this.state;
    const filteredBreakdowns = this.state.globalBreakdowns.filter(
      (countryStat) => {
        return countryStat.location.countryOrRegion
          .toLocaleLowerCase()
          .includes(this.state.searchfield.toLocaleLowerCase());
      }
    );

    return (
      <Fragment>
        <Header />
        <Searchbar onChange={this.handleInput} />
        <div className="main-container">
          {!openModal ? (
            <Statsboard
              globalBreakdowns={filteredBreakdowns}
              fetchHistory={this.fetchHistory}
            />
          ) : (
            <div className="board-container">
              <Chart
                graphData={countryHistory}
                close={this.closeModal}
                countryName={this.state.countryName}
              />
            </div>
          )}
          <Newspane news={news} images={images} />
        </div>
      </Fragment>
    );
  }
}

export default App;
