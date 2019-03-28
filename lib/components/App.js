import React from 'react';
import axios from 'axios';

import ArticleList from './ArticleList';

import DataApi from 'state-api';
// import { data } from '../testData';

// const api = new DataApi(data);

class App extends React.Component {
  state = {
    articles: this.props.intialData.articles,
    authors: this.props.intialData.authors,
  };
  async componentDidMount() {
    const resp = await axios.get('/data');
    const api = new DataApi(resp.data);

    this.setState(() => {
      return {
        articles: api.getArticles(),
        authors: api.getAuthors(),
      };
    });
  }
  articleActions = {
    lookupAuthor: authorId => this.state.authors[authorId],
  }
  render() {
    return (
      <ArticleList
        articles={this.state.articles}
        articleActions={this.articleActions}
      />
    );
  }
}

export default App;
