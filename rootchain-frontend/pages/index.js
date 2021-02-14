import React, { useEffect, useState, useContext } from 'react';
import Head from 'next/head';
import { FirebaseContext } from '../contexts/FirebaseContext';
import { UserContext } from './_app';
import { Link } from '../routes';
import { Layout, Row, Col, Button } from 'antd';
const { Header } = Layout;
import landingStyles from '../styles/pages/landing.module.css';
import LandingIllustration from '../public/landing-illustration.svg';
import { GoogleOutlined } from '@ant-design/icons';
import { BranchesOutlined } from '@ant-design/icons';
import firebase from 'firebase';
import 'firebase/firestore';

const db = firebase.firestore();

const Landing = () => {
  const firebase = useContext(FirebaseContext);
  const { setUid, setDisplayName, setEmail, setPhotoURL } = useContext(
    UserContext
  );
  const [signInError, setSignInError] = useState(false);

  const signIn = async () => {
    try {
      const result = await firebase.signIn();
      const { uid, email, displayName, photoURL } = await result.user;
      setSignInError(false);
      writeUserToFirebase(uid, displayName, email, photoURL);
    } catch (error) {
      setSignInError(true);
    }
  };

  const writeUserToFirebase = (uid, displayName, email, photoURL) => {
    db.collection('users')
      .add({
        uid: uid,
        displayName: displayName,
        email: email,
        photoURL: photoURL,
      })
      .then(() => {
        console.log('User successfully written');
        setUserStateAndRedirect(uid, displayName, email, photoURL);
      })
      .catch((error) => {
        console.error('Error writing user', error);
      });
  };

  const setUserStateAndRedirect = (uid, displayName, email, photoURL) => {
    setUid(uid);
    setDisplayName(displayName);
    setEmail(email);
    setPhotoURL(photoURL);
    localStorage.setItem('uid', uid);
    localStorage.setItem('displayName', displayName);
    localStorage.setItem('email', email);
    localStorage.setItem('photoURL', photoURL);
    window.location.href = '/dashboard';
  };

  return (
    <Layout className={landingStyles.root}>
      <Head>
        <title>Welcome to rootchain!</title>
      </Head>
      <Header className={landingStyles.discoverHeader}>
        <div className={landingStyles.discoverHeaderTitle}>
          <Link route="/">
            <a>
              <BranchesOutlined className={landingStyles.branches__icon} />
              rootchain
            </a>
          </Link>
        </div>
      </Header>

      <div className={landingStyles.cover}>
        <Row className={landingStyles.row}>
          <Col md={12}>
            <LandingIllustration />
          </Col>
          <Col md={12} className={landingStyles.cover__text}>
            <h1 className={landingStyles.title}>rootchain &copy;</h1>
            <h3 className={landingStyles.subtitle}>
              A transparent and secure smart-funding platform for Grassroots
              Political Organizations.
            </h3>
            {signInError && <p>Error sigining in with Google.</p>}
            <Button onClick={signIn} className={landingStyles.oauth__button}>
              <GoogleOutlined />
              Sign in with Google
            </Button>
          </Col>
        </Row>
      </div>
      <div className={landingStyles.features}>
        <Row gutter={32} className={landingStyles.row}>
          <Col md={8} className={landingStyles.feature__item}>
            <h1>Transparency</h1>
            <img
              alt="knowledge-img"
              src="/feature-knowledge.png"
              className={landingStyles.feature__img}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Col>
          <Col md={8} className={landingStyles.feature__item}>
            <h1>Security</h1>
            <img
              alt="security-img"
              src="/feature-security.png"
              className={landingStyles.feature__img}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Col>
          <Col md={8} className={landingStyles.feature__item}>
            <h1>Decentralized</h1>
            <img
              alt="decentralized-img"
              src="/feature-decentralized.png"
              className={landingStyles.feature__img}
            />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Landing;
