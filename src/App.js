import { useEffect, useState } from 'react';
import './App.css';
import { Step } from './components/Step';
// Switch to the right network:
window.ethereum.request({
  method: "wallet_addEthereumChain",
  params: [
    {
      chainId: "0x1a4",
      rpcUrls: ["https://goerli.optimism.io/"],
      chainName: "Optimism Goerli Testnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      blockExplorerUrls: ["https://goerli-optimism.etherscan.io"],
    },
  ],
});

/* ACTION_ID is a unique identifier for the action that should be sybil resistant, e.g. airdrop claiming. 
 * This should be a unique value for this particular airdrop, not unique per user.
 * This should be a random number less than 21888242871839275222246405745257275088548364400416034343698204186575808495617
 * It can be generated once by BigInt('0x' + crypto.randomBytes(31).toString('hex')).toString()
 * Technically, this method will give a result less than 2^(31*8), but that's fine and easier to write.
*/
const ACTION_ID = '347604633508571055920698422800901142976661405457677528516203995392204277282';
const THIS_URL = 'http://localhost:3001';

// See whether address has proven uniquness for this action yet:
async function isUnique(address) {
  const resp = await fetch(`https://api.holonym.io/sybil-resistance?user=${address}&action-id=${ACTION_ID}`);
  const { result: isUnique } = await resp.json();
  return isUnique;
}

function App() {
  const [address, setAddress] = useState(null);
  const [unique, setUnique] = useState(null);
  useEffect(()=>{
    async function f() {
      const address = (await window.ethereum.request({ method: "eth_requestAccounts" }))[0]
      setAddress(address);
    }
    f();
  }, [address]);

  useEffect(()=>{
    async function f() {
      if(!address)return;
      setUnique(await isUnique(address));
    }
    f();
  }, [address]);
    
  return (
    <div className='bg'>
      <h1>Collect your airdrop{address ? `,   ${address.slice(0,6)}...${address.slice(-2)}` : null}</h1>
      <br />
      <br />
      <Step title='Step 1: Download the Holonym Extension' complete={true}>
      <a target='_blank' className='step button' href='https://chrome.google.com/webstore/detail/holonym/obhgknpelgngeabaclepndihajndjjnb'>Download</a>
      </Step>
      <Step title='Step 2: Mint a Holo' complete={false}>
        <a target='_blank' className='step button' href='https://holonym.id/verify'>Mint</a>
      </Step>
      <Step title='Step 3: Prove uniquness' complete={false}>
      <a className='step button' href={`https://holonym.io/prove/uniqueness/${ACTION_ID}/${encodeURIComponent(THIS_URL)}`}>prove</a>
      </Step>
      
      <br />
      <br />
      <br />
      <br />

      <a className={'action button ' + (unique ? null : 'disabled')}
        onClick={()=>alert('airdrop!')
      }>
        🪂
      </a>
      
      
    </div>
  );
}

export default App;
