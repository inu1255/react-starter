import React from 'react'
import './tab-control.less' 

class TabsControl extends React.Component{
    constructor(props){
        super(props);
        this.state={ 
            currentIndex : 0
        };
    }
    check_title_index(index){
        return index===this.state.currentIndex ? "Tab_title active" : "Tab_title";
    }
    check_item_index(index){
        return index===this.state.currentIndex ? "Tab_item show" : "Tab_item";
    }
    add(){
        this.state.currentIndex = this.props.children.length
        this.props.add()
    }
    render(){
        let _this=this;
        return(
            <div className={cx(tabs-control)}>
                {/*动态生成Tab导航*/}
                <div className={cx("Tab_title_wrap")}>
                    { 
                        React.Children.map( this.props.children , (element,index) => {
                        return(
                            /*箭头函数没有自己的this，这里的this继承自外围作用域，即组件本身*/
                            <div onClick={ () => { this.setState({currentIndex : index}) } } className={ this.check_title_index(index) }>{ element.props.name }</div>
                            );
                    }) 
                    }
                    {this.props.add?<div className={cx("Tab_title")} onClick={this.add.bind(this)}>添加</div>:null}
                </div>
                {/*Tab内容区域*/}
                <div className={cx("Tab_item_wrap")}>
                    {React.Children.map(this.props.children,(element,index)=>{
                        return(
                            <div className={ this.check_item_index(index) }>{ element }</div>
                            );
                    })}
                </div>
            </div>
        );
    }
}

export default TabsControl
