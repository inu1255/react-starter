import React from 'react';
import { connect } from 'asha/libs/storage.js';
import styles from './movie.less';
import classnames from "classnames/bind"
const cx = classnames.bind(styles)

class Movie extends React.Component {
    constructor(props) {
        super(props)
        this.displayName = 'Movie'
        this.state = {}
    }
    render() {
        console.log("menu")
        return (
            <div className={ cx("movie-container") }>
                movie.js
            </div>
        )
    }
}

export default connect("app")(Movie)
