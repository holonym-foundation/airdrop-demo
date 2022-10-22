import './App.css';
import { Step } from './components/Step';
function App() {
  return (
    <div className='bg'>
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
