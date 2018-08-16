import React, { Component } from 'react';
import { Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import {SearchResultList} from "./SearchResultList"
import { goSearch } from '../store/searchReducer'
import propTypes from 'prop-types'


class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchParams: '',
            showResults: false
        }
    }
    handleClick = (e) => {
        e.preventDefault();
        console.log('Searched was clicked!!');
        console.log('new state', this.state)
        const searchParams = { q: this.state, userRefreshToken: this.props.fakeUserToken };
        const music = this.props.spotifyResults(searchParams)
        this.setState({ searchParams: '', showResults: true , music: music })
    }
    handleChange = (e) => {
        this.setState({ searchParams: e.target.value })
    }
    render() {
        if (this.state.showResults) {
            return <SearchResultList spotifyResults={this.state.music} />
        } else {
            return <div className="ui icon input">
                <input type="text" placeholder="track/artist..." value={this.state.searchParams} onChange={this.handleChange} />
                <i class="inverted circular search link icon" onClick={this.handleClick}></i>
            </div>

        }

    }
}


const mapStateToProps = state => ({
  userRefreshToken: state.user.refreshToken,
  fakeUserToken:
    'BQA9hBhPPRk-kuM3ywsCXsMO2c5MwGsZOgYPagpZzTuFAVMAaV0ziL7n0yNXjLkTveunajRCbFMjieiffQtj2UHT8-8RQMLgd7QZv1PUMyqnw7s38nCQqNky9nRUdXuJBPkqHgwWfWpap0eM'
});

const mapDispatchToProps = dispatch => ({
    spotifyResults: searchParams => dispatch(goSearch(searchParams))
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)

SearchForm.propTypes = {
    // userId:propTypes.number.isRequired
}