import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import React from 'react';
import { Link, withRouter } from 'react-router'

class InuMenu extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'InuMenu';
        this.state = {
            count: 0
        }
        this.state.menu = this.renderMenu(this.props.menu)
    }
    selectedKeys(menu, i) {
        i = i || 0
        if (menu instanceof Array) {
            for (var j = 0; j < menu.length; j++) {
                var n = this.selectedKeys(menu[j], i++)
                if (n >= 0) return n
            }
        }
        if (menu.group) return this.selectedKeys(menu.menu, i)
        if (typeof menu.to == "string" && this.props.router.isActive({ pathname: menu.to })) {
            return i
        }
        if (typeof menu.to == "object" && this.props.router.isActive(menu.to)) {
            return i
        }
        return -1
    }
    renderItem(item) {
        var to
        if (typeof item.to == "object") {
            to = { ...this.props.location, ...item.to }
        } else if (typeof item.to == "string") {
            to = { ...this.props.location, pathname: item.to }
        }
        if (item.to && item.icon) return <Link to={ to }>
                                         <Icon type={ item.icon } />
                                         { item.title }
                                         </Link>
        if (item.to) return <Link to={ to }>
                            { item.title }
                            </Link>
        if (item.icon) return [<Icon key="1" type={ item.icon } />, <span key="2">{ item.title }</span>]
        return item.title
    }
    renderMenu(menu, i) {
        if (menu instanceof Array) {
            return menu.map((item, i) => {
                return this.renderMenu(item, i)
            })
        }
        if (menu.group) return <MenuItemGroup key={ this.state.count++ } title={ menu.group }>
                                   { this.renderMenu(menu.menu) }
                               </MenuItemGroup>
        if (menu.menu) return <SubMenu key={ i } title={ this.renderItem(menu) }>
                                  { this.renderMenu(menu.menu) }
                              </SubMenu>
        var style = (this.props.mode == "horizontal" && menu.right) ? {
            float: 'right'
        } : {}
        return <Menu.Item key={ this.state.count++ } style={ style }>
                   { this.renderItem(menu) }
               </Menu.Item>
    }
    render() {
        var current = this.selectedKeys(this.props.menu)
        if (current < 0)
            current = "0"
        this.state.count
        return <Menu {...this.props} selectedKeys={ [current.toString()] }>
                   { this.state.menu }
               </Menu>
    }
}

InuMenu.defaultProps = {
    menu: []
}

export default withRouter(InuMenu)
