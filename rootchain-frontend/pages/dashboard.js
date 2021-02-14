import React, { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../contexts/FirebaseContext';
import { UserContext } from './_app';
import dashboardStyles from '../styles/pages/dashboard.module.css';
import Layout from '../components/Layout';
import { Card } from 'antd';
import firebase from 'firebase';
import 'firebase/firestore';
import PastCampaigns from '../components/PastCampaigns';
import PendingApprovals from '../components/PendingApprovals';
import ActiveCampaigns from '../components/ActiveCampaigns';

const db = firebase.firestore();

const userPorfileTabList = [
  {
    key: 'active',
    tab: 'Active Campaigns',
  },
  {
    key: 'past',
    tab: 'Past Contributions',
  },
  {
    key: 'pending',
    tab: 'Pending Approvals',
  },
];




const contributionData = [
  {CampaignName:"Project 1", AmountContributed:"$1000", AmountColected:"$10000"},
  {CampaignName:"Project 2", AmountContributed:"$2000", AmountColected:"$20000"},
  {CampaignName:"Project 3", AmountContributed:"$3000", AmountColected:"$30000"},
  {CampaignName:"Project 4", AmountContributed:"$4000", AmountColected:"$40000"}
]
const Dashboard = () => {
  const [campaignsDetail, setCampaignsDetail] = useState(null);
  const [dashboardTab, setDashboardTab] = useState('active');
  
  useEffect(() => {
    db.collection('campaigns').onSnapshot((snapshot) =>
      setCampaignsDetail(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const firebase = useContext(FirebaseContext);
  const {
    isAuthenticated,
    setIsAuthenticated,
    displayName,
    setDisplayName,
    photoURL,
    setPhotoURL,
  } = useContext(UserContext);
  const [didMount, setDidMount] = useState(false);
  const [logOutSuccess, setLogOutSuccess] = useState(false);

  useEffect(() => {
    if (didMount && !isAuthenticated) {
      window.location.href = '/';
    } else {
      setDidMount(true);
    }
  }, [didMount]);

  const logOut = async () => {
    const loggedOut = await firebase.logOut();
    if (loggedOut) {
      removeUserStateWrapper();
    }
  };
  

  const removeUserStateWrapper = () => {
    setDisplayName('');
    setPhotoURL('');
    setIsAuthenticated(false);
    localStorage.removeItem('displayName');
    localStorage.removeItem('photoURL');
    window.location.href = '/';
  };

  const contentListNoTitle = {
    active: (
      <ActiveCampaigns campaignsDetail={campaignsDetail} />
    ),
    past: (
      <PastCampaigns contributionData={contributionData} />
    ),
    pending: (
      <PendingApprovals contributionData={contributionData} />
    )
  };

  return (
    <Layout>
      <div className={dashboardStyles.root}>
        <div className={dashboardStyles.accountInfo}>
          <img
            src={photoURL}
            className={dashboardStyles.profile__picture}
            alt="profile-pic"
          />
          <div className={dashboardStyles.details}>
            <p>Name: {displayName}</p>
            <p>Email: email@gmail.com</p>
            <p>Ethereum Smart Contact Addres: 0xasjdasjdnaisd</p>

          </div>
            {/* <button onClick={logOut}>Logout</button> */}
          </div>
          <div className={dashboardStyles.dashboardConsole}>
            <h1 style={{"margin-left":"22px"}}>Dashboard</h1>
              <Card
                style={{ margin: 'auto', width: '100%' }}
                tabList={userPorfileTabList}
                activeTabKey={dashboardTab}
                onTabChange={(key) => {
                  setDashboardTab(key);
                }}
              >
                {contentListNoTitle[dashboardTab]}
              </Card>
          </div>
         <div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
{/* <Layout>
              {campaignID && (
                <ContributeForm
                  campaignAddress={campaignAddress}
                  campaignID={campaignID}
                />
              )}
              <Card
                style={{ margin: 'auto', width: '100%' }}
                tabList={userPorfileTabList}
                activeTabKey={campaignTab}
                onTabChange={(key) => {
                  setCampaignTab(key);
                }}
              >
                {contentListNoTitle[campaignTab]}
              </Card>
        </Layout> */}


          {/* <div className={dashboardStyles.dashboardConsole}> 
            <button className={dashboardStyles.button}>Active Campaigns</button>
            <button id ={dashboardStyles.second }className={dashboardStyles.button}>Past Contributions</button>
            <button id ={dashboardStyles.second }className={dashboardStyles.button}>Pending Approvals</button>
          </div> */}
          {/* <div className={dashboardStyles.dashboardTable}>
            <PastCampaigns contributionData={contributionData} />
          </div> */}