import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const factoryInstance = new web3.eth.Contract(
  CampaignFactory.abi,
  '0x269021b7DA1248849dd527f073efA08f26A1B670'
);

export default factoryInstance;
