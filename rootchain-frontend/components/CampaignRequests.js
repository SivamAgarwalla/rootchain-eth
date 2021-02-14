import React, { useState, useEffect } from 'react';
import { PageHeader } from 'antd';
import { List } from 'antd';
import { Link } from '../routes';
import CampaignRequestRow from './CampaignRequestRow';

import firebase from 'firebase';
import 'firebase/firestore';
const db = firebase.firestore();

const CampaignRequests = ({
  campaignID,
  campaignAddress,
  contractRequests,
  requestCount,
  campaignContributorsCount,
}) => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    db.collection('campaigns')
      .doc(campaignID)
      .collection('spendingRequests')
      .onSnapshot((snapshot) =>
        setRequests(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().description,
            description: doc.data().description,
            recipientAddress: doc.data().recipientAddress,
            spendingAmount: doc.data().spendingAmount,
            requestCreator: doc.data().requestCreator,
            firebaseToContractMap: doc.data().firebaseToContractMap,
            approvalCount:
              contractRequests[doc.data().firebaseToContractMap] &&
              contractRequests[doc.data().firebaseToContractMap].approvalCount,
            approvalStatus:
              contractRequests[doc.data().firebaseToContractMap] &&
              contractRequests[doc.data().firebaseToContractMap].complete,
          }))
        )
      );
  }, []);

  return (
    <div>
      <PageHeader
        className='requests-page-header'
        title='Spending Requests'
        subTitle='Find out how the campaign is spending its funds!'
        extra={[
          <Link route={`/campaign/request/new/${campaignAddress}`}>
            <a>Create Request</a>
          </Link>,
        ]}
      />
      <List
        dataSource={requests}
        renderItem={(request) => (
          <CampaignRequestRow
            request={request}
            campaignAddress={campaignAddress}
            requestCount={requestCount}
            campaignContributorsCount={campaignContributorsCount}
          />
        )}
      ></List>
    </div>
  );
};

export default CampaignRequests;
