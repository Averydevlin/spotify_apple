import React from "react"
import './Title.css'

const Title = (props) => (
    <h2 className="Title">
        <span className={props.white ? 'white' : ''}>
            {props.children}
        </span>
    </h2>
)

export default Title