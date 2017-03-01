import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';
import Menu from '../components/layout/Menu.js'

function IndexPage(props) {
  console.log(props)
  return (
    <div className={styles.container}>
      <Menu menu={props.menu} theme="dark" mode="horizontal"></Menu>
      <div className={styles.welcome} />
      div#array.i.
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect(({index})=>index)(IndexPage);
