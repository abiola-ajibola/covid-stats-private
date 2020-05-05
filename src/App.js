import React, { Fragment } from 'react';
import './App.css';
import Header from './components/header';
import Newspane from './components/news-pane';
import Statsboard from './components/stats';
import Searchbar from './components/searchbar';
import Chart from './components/Modal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      globalHistory: [],
      countryHistory: [],
      globalBreakdowns: [],
      filteredBreakdowns: [],
      news: [],
      countryName: '',
      images: [],
      searchfield: '',
      openModal: false
    }
    this.handleInput = this.handleInput.bind(this);
    this.fetchHistory = this.fetchHistory.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount = () => {
    fetch('https://api.smartable.ai/coronavirus/stats/global', {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "Subscription-Key": "d383a676794343deab023ff0a5a7f2e5"
      }
    })
      .then(response => response.json())
      .then(data => this.setState({
        globalHistory: data.stats.history,
        globalBreakdowns: data.stats.breakdowns,
        filteredBreakdowns: data.stats.breakdowns
      }))

    fetch('https://api.smartable.ai/coronavirus/news/global', {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "Subscription-Key": "d383a676794343deab023ff0a5a7f2e5"
      }
    })
      .then(response => response.json())
      .then(data => data.news)
      .then(news => {
        let imagesArr = [];
        imagesArr = news.map((item) => {
          if (item.images === null) {
            return {
              url: '',
              title: ''
            }
          }
          return item.images[0];
        })
        this.setState({
          news: news,
          images: imagesArr
        });
      })
  }

  handleInput(event) {
    this.setState({ searchfield: event.target.value })
  }

  fetchHistory(isoCode) {
    if (isoCode !== null) {
    console.log('Preparing to fetch: ', isoCode);
    this.setState({
      openModal: true
    });

    console.log('Fetching', isoCode)
    fetch(`https://api.smartable.ai/coronavirus/stats/${isoCode}`, {
      method: 'get',
      headers: {
        "content-type": "application/json",
        "Subscription-Key": "d383a676794343deab023ff0a5a7f2e5"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({countryName: data.location.countryOrRegion})
        return data.stats
      })
      .then(stats => stats.history)
      .then(history => {
        let newHistory = history.map(detail => {
          return Object.assign({}, detail, { date: new Date(detail.date).toDateString().slice(4, 10) })
        })
        this.setState((state) => {
          return {
            countryHistory: newHistory
          }
        })
      })
      .catch(e => console.log('Error!', e))
    } else {
      alert(`Sorry! data not available :(`)
    }
  }

  closeModal() {
    this.setState({ openModal: false });
  }

  render() {
    const { news, images, openModal, countryHistory } = this.state;
    const filteredBreakdowns = this.state.globalBreakdowns.filter(countryStat => {
      return countryStat.location.countryOrRegion.toLocaleLowerCase().includes(this.state.searchfield.toLocaleLowerCase())
    });

    return (
      <Fragment>
        <Header />
        <Searchbar onChange={this.handleInput} />
        <div className="main-container">
          {(!openModal)
            ? <Statsboard globalBreakdowns={filteredBreakdowns} fetchHistory={this.fetchHistory} />
            : <div className="board-container">
              <Chart graphData={countryHistory} close={this.closeModal} countryName={this.state.countryName} />
            </div>}
          <Newspane news={news} images={images} />
        </div>
      </Fragment>
    );
  }
}

export default App;
