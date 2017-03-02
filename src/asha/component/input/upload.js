import Progress from 'asha/component/plugin/progress.js'
import React from 'react';
import Switch from 'asha/component/plugin/switch.js'
import stream from 'asha/libs/file/stream.js'
import pick from 'asha/libs/file/picker.js'
import api from 'asha/libs/api.js'

class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Upload';
        this.state = {}
        this.uploading
    }
    componentDidMount(){
        if(this.props.file){
            this.upload(this.props.file)
        }
    }
    click(){
        if(this.uploading||this.props.file)return;
        api.pick(this.props.accept).then((file)=>{
            this.upload(file)
        }).catch(()=>{
            this.uploading = false
        })
    }
    upload(file){
        this.uploading = true
        api.upload(file,(percent)=>{
            this.setState({percent})
        }).then((data)=>{
            this.setState({data})
            if(!this.props.once)this.uploading = false
            if(this.props.onChange)this.props.onChange(data)
        }).catch(()=>{
            this.uploading = false
        })
    }
    render() {
        return <Progress {...this.props} percent={this.state.percent} onClick={this.click.bind(this)}>
            <Switch status={this.state.data} each={this.props.each}>{this.props.children}</Switch>
        </Progress>
    }
}

export default Upload
