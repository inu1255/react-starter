import React from 'react';
import storage from 'asha/libs/storage.js'
import Input from './input-outline.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'App';
        this.select = storage("select."+this.props.storage)
        this.state = {}
        if(!this.select.data&&this.props.getJson)this.props.getJson().then((data)=>{
            this.select.data = data
            this.select.saveStorage()
            this.setState({})
        })
    }
    render() {
        return <Input {...this.props} select={this.select.data}></Input>
    }
}

export default App
