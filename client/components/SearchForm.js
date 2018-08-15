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
    handleClick = async (e) => {
            e.preventDefault();
            const searchParams = { q: this.state.searchParams, accessToken: this.props.accessToken};
            const music = await this.props.spotifyResults(searchParams)
            this.setState({ searchParams: '', showResults: true , music: music })
    }


    handleChange = (e) => {
        this.setState({ searchParams: e.target.value })
    }
    render() {
        return <div>
        <div className="ui icon input" >
                <input type="text" placeholder="track/artist..." value={this.state.searchParams} onChange={this.handleChange}/>
                <i class="inverted circular search link icon" onClick={this.handleClick} ></i>
        </div>
        {(this.state.showResults) ?
            (<SearchResultList spotifyResult = {this.state.music} />) : (<p>Search track/artist</p>)}
            </div>
    }
}


const mapStateToProps = state => ({
  accessToken: state.user.accessToken,
});

const mapDispatchToProps = dispatch => ({
    spotifyResults: searchParams => dispatch(goSearch(searchParams))
})


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm)

SearchForm.propTypes = {
    // userId:propTypes.number.isRequired
}