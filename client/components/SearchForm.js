import React, {Component} from 'react';
import {Icon, Feed, Card} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {SearchResultList} from './SearchResultList';
import {goSearch} from '../store/searchReducer';
import propTypes from 'prop-types';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: '',
      showResults: false
    };
  }
  handleClick = async e => {
    e.preventDefault();
    const searchParams = {
      q: this.state.searchParams,
      accessToken: this.props.accessToken
    };
    const music = await this.props.spotifyResults(searchParams);
    this.setState({searchParams: '', showResults: true, music: music});
  };

  keyPress = async e => {
    if (e.keyCode == 13) {
      const searchParams = {
        q: this.state.searchParams,
        accessToken: this.props.accessToken
      };
      const music = await this.props.spotifyResults(searchParams);
      this.setState({searchParams: '', showResults: true, music: music});
    }
  };

  handleChange = e => {
    this.setState({searchParams: e.target.value});
  };
  render() {
    // console.log('SearchForm music is: ', this.state.music);
    return (
      <Card>
        <Card.Content>
          <Card.Header>Search</Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed>
            <Card.Content>
              <Feed.Event>
                <Feed.Content>
                  <div className="ui icon input">
                    <input
                      type="text"
                      placeholder="track/artist..."
                      value={this.state.searchParams}
                      onChange={this.handleChange}
                      onKeyDown={this.keyPress}
                    />
                    <i
                      className="inverted circular search link icon"
                      onClick={this.handleClick}
                    />
                  </div>
                </Feed.Content>
              </Feed.Event>
            </Card.Content>
            {this.state.showResults ? (
              <Card.Content>
                <Feed.Event>
                  <Feed.Content>
                    <SearchResultList spotifyResult={this.state.music} />
                  </Feed.Content>
                </Feed.Event>
              </Card.Content>
            ) : (
              <p>Search track/artist</p>
            )}
          </Feed>
        </Card.Content>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  accessToken: state.user.accessToken
});

const mapDispatchToProps = dispatch => ({
  spotifyResults: searchParams => dispatch(goSearch(searchParams))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);

SearchForm.propTypes = {
  // userId:propTypes.number.isRequired
};
