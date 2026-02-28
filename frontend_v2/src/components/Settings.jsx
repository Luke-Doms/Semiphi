import { useState } from 'react';
import Theme from './Theme.jsx';
import Account from './Account.jsx';
import Algorithms from './Algorithms.jsx';

const TABS = ['Theme', 'Account', 'Algorithms'];

function Settings() {
  const [tab, setTab] = useState('Theme');

  return (
    <div className="settings-page">
      <div className="settings-inner">

        <div className="settings-header">
          <span className="settings-title">Settings</span>
          <span className="settings-subtitle">Manage your preferences</span>
        </div>

        <div className="settings-tabs">
          {TABS.map(t => (
            <button
              key={t}
              className={`settings-tab ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Theme'      && <Theme />}
        {tab === 'Account'    && <Account />}
        {tab === 'Algorithms' && <Algorithms />}

      </div>
    </div>
  );
}

export default Settings;
