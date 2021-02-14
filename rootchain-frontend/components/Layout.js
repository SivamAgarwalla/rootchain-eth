import React, { useState, useContext } from 'react';
import layoutStyles from '../styles/components/layout.module.css';
import { Layout, Button } from 'antd';
import { BranchesOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
import { Link } from '../routes';
import { FirebaseContext } from '../contexts/FirebaseContext';
import firebase from 'firebase';
import 'firebase/firestore';

export default (props) => {
  const [logOutSuccess, setLogOutSuccess] = useState(false);
  const firebase = useContext(FirebaseContext);
  const removeUserStateWrapper = () => {
    localStorage.removeItem('displayName');
    localStorage.removeItem('photoURL');
    window.location.href = '/';
  };
  const logOut = async () => {
    const loggedOut = await firebase.logOut();
    if (loggedOut) {
      removeUserStateWrapper();
    }
  };

  return (
    <div>
      <Header className={layoutStyles.discoverHeader}>
        <div className={layoutStyles.discoverHeaderTitle}>
          <Link route="/">
            <a>
              <BranchesOutlined className={layoutStyles.branches__icon} />
              rootchain
            </a>
          </Link>
        </div>
        <div className={layoutStyles.discoverHeaderButtons}>
          <Link route="/discover">
            <a>Campaigns </a>
          </Link>
          <Link route="/dashboard">
            <a>Profile </a>
          </Link>
          <a onClick={logOut}>Logout</a>
        </div>
      </Header>
      <Layout>
        <Content className={layoutStyles.discoverContent}>
          {props.children}
        </Content>
      </Layout>
    </div>
  );
};
