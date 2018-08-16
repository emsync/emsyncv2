import React from "react"
import QueueElement from "./QueueElement"
import propTypes from 'prop-types';

//all clickcable elements thrown by the spotify search before this.
//Room id should come from props 

export const SearchResultList = (props) => {
    return <div>
        {props.map(song => <QueueElement  spotifyLink= {props.spotifyLink} image ={props.ImageUrl} key={song.name}/>)}
        </div>
}


SearchResultList.propTypes = {
    // roomId:propTypes.number.isRequired,
}