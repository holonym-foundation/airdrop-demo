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

function App() {
  const [address, setAddress] = useState(null);
  useEffect(()=>{
    async function f() {
      const address = (await window.ethereum.request({ method: "eth_requestAccounts" }))[0]
      setAddress(address);
      console.log(address);
    }
    f();
  })
    
  return (
    <div className='bg'>
      <code>address: {address}</code>
      <h1>Collect your fair airdrop</h1>
      <Step title='Step 1: Download Holonym Extension' complete={true}>
      <a target='_blank' className='step button' href='https://chrome.google.com/webstore/detail/holonym/obhgknpelgngeabaclepndihajndjjnb'>Download</a>
      </Step>
      <Step title='Step 2: Mint a Holo' complete={false}>
        <a target='_blank' className='step button' href='https://holonym.id/verify'>Get started</a>
      </Step>
      <Step title='Step 3: Prove uniquness' complete={false}>
      <a className='step button'>prove</a>
      </Step>
      
      <br />
      <br />
      <br />
      <br />

      <a className='action button disabled'>🪂</a>
      
      
    </div>
  );
}

export default App;
