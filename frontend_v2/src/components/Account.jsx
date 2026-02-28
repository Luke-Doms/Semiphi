import { useState } from 'react';

const MOCK_USER = { username: 'cuber42', email: 'cuber42@example.com' };

function Account() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw]       = useState('');
  const [saved, setSaved]       = useState({});

  const handleSave = (key) => {
    setSaved(p => ({ ...p, [key]: true }));
    setTimeout(() => setSaved(p => ({ ...p, [key]: false })), 1500);
  };

  return (
    <div className="settings-section">
      <span className="section-title">Account</span>
      <div className="settings-card account-menu">

        {/* Username */}
        <div className="field-row">
          <span className="field-row-label">Username</span>
          <div className="account-field-inputs">
            <input
              className="settings-input"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder={MOCK_USER.username}
            />
            <button className="settings-btn" onClick={() => handleSave('username')}>
              {saved.username ? 'Saved' : 'Update'}
            </button>
          </div>
        </div>

        <div className="settings-divider" />

        {/* Email */}
        <div className="field-row">
          <span className="field-row-label">Email</span>
          <div className="account-field-inputs">
            <input
              className="settings-input"
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={MOCK_USER.email}
            />
            <button className="settings-btn" onClick={() => handleSave('email')}>
              {saved.email ? 'Saved' : 'Update'}
            </button>
          </div>
        </div>

        <div className="settings-divider" />

        {/* Password */}
        <div className="account-field-group">
          <span className="account-field-group-label">Password</span>
          <div className="account-field-inputs">
            <input
              className="settings-input"
              type="password"
              value={currentPw}
              onChange={e => setCurrentPw(e.target.value)}
              placeholder="Current password"
            />
            <input
              className="settings-input"
              type="password"
              value={newPw}
              onChange={e => setNewPw(e.target.value)}
              placeholder="New password"
            />
            <button className="settings-btn" onClick={() => handleSave('pw')}>
              {saved.pw ? 'Saved' : 'Update'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Account;
