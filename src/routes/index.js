import React from 'react';
import { connect } from 'dva';
import { Carousel } from 'antd'
import Img from 'asha/component/image/img.js'

import styles from './index.less';
import Menu from '../components/layout/menu.js'
import banner from "../assets/banner.jpg"

function Index(props) {
  return (
    <div className={styles.container}>
      <Menu menu={[
        {
            icon:"cloud",
            to:"index",
            title:"网站名"
        },
        {
            title:"注册",
            to:"register",
            right:true
        },
        {
            title:"登录",
            to:"login",
            right:true
        }
    ]} theme="dark" mode="horizontal"></Menu>
      <Carousel autoplay>
        <div><Img src={banner}></Img></div>
        <div><Img src={banner}></Img></div>
        <div><Img src={banner}></Img></div>
        <div><Img src={banner}></Img></div>
      </Carousel>
    </div>
  );
}

Index.propTypes = {
};

export default connect()(Index);
