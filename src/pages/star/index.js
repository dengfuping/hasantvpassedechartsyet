import React from 'react';
import axios from 'axios';
import StarIcon from '@/components/StarIcon';
import styles from './index.css';

class IndexPage extends React.Component {
  state = {
    loading: false,
    antvStar: 0,
    echartsStar: 0,
  };

  componentDidMount() {
    this.getData(false);
    if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
      document.body.classList.remove('no-touch');
    }
  }

  getData = isDelay => {
    this.setState({
      loading: true,
    });
    const antvRepoList = ['g2', 'g6', 'f2', 'L7'];
    const echartsList = ['incubator-echarts'];
    const promiseList = [...antvRepoList, ...echartsList].map(repo => {
      if (antvRepoList.indexOf(repo) !== -1) {
        return axios.get(`https://api.github.com/repos/antvis/${repo}`);
      } else if (echartsList.indexOf(repo) !== -1) {
        return axios.get(`https://api.github.com/repos/apache/${repo}`);
      }
      return new Promise();
    });
    Promise.all(promiseList).then(resList => {
      this.setState({
        antvStar: resList
          .filter(res => res.data && antvRepoList.indexOf(res.data.name) !== -1)
          .map(res => res.data && res.data.stargazers_count)
          .reduce((a, b) => a + b),
        echartsStar: resList
          .filter(res => res.data && echartsList.indexOf(res.data.name) !== -1)
          .map(res => res.data && res.data.stargazers_count)
          .reduce((a, b) => a + b),
      });
      if (isDelay) {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 1000);
      } else {
        this.setState({
          loading: false,
        });
      }
    });
  };

  reload = () => {
    const { loading } = this.state;
    if (loading) {
      return;
    }
    this.getData(true);
  };

  render() {
    const { loading, antvStar, echartsStar } = this.state;
    return (
      <div className={styles.container}>
        <github-corner />
        <p>Has AntV passed ECharts yet?</p>
        {antvStar === 0 || echartsStar === 0 ? (
          <div style={{ marginBottom: '1em' }}>Loading...</div>
        ) : (
          <div>
            {antvStar === echartsStar ? (
              <h1 className={styles.pad}>TIE!</h1>
            ) : (
              <h1>{antvStar > echartsStar ? 'YES' : 'NO'}</h1>
            )}
            <p>
              {antvStar > echartsStar && (
                <small className={styles.ahead}>
                  Ahead by {antvStar - echartsStar}{' '}
                  {antvStar - echartsStar === 1 ? 'star' : 'stars'}!
                </small>
              )}
              {antvStar < echartsStar && (
                <small className={styles.away}>
                  Only {echartsStar - antvStar} {echartsStar - antvStar === 1 ? 'star' : 'stars'}{' '}
                  away!
                </small>
              )}
            </p>
            <ul>
              <li>
                <a href="https://github.com/antvis" target="_blank" rel="noopener noreferrer">
                  <img
                    src="/static/antv.png"
                    alt="AntV"
                    style={{
                      width: 22,
                    }}
                  />
                  <span>{antvStar}</span>
                  <StarIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/apache/incubator-echarts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/static/echarts.png"
                    alt="ECharts"
                    style={{
                      width: 22,
                    }}
                  />
                  <span>{echartsStar}</span>
                  <StarIcon />
                </a>
              </li>
            </ul>
            <span className={styles.reload} onClick={this.reload}>
              <svg
                className={loading ? styles.reloading : ''}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
              >
                <path
                  fill="#333333"
                  d="M19 8l-4 4h3c0 3.31-2.69 6-6 6a5.87 5.87 0 0 1-2.8-.7l-1.46 1.46A7.93 7.93 0 0 0 12 20c4.42 0 8-3.58 8-8h3l-4-4zM6 12c0-3.31 2.69-6 6-6 1.01 0 1.97.25 2.8.7l1.46-1.46A7.93 7.93 0 0 0 12 4c-4.42 0-8 3.58-8 8H1l4 4 4-4H6z"
                />
                <path d="M0 0h24v24H0z" fill="none" />
              </svg>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default IndexPage;
