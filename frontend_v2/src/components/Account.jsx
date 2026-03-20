import { useState } from 'react';

const MOCK_USER = { username: 'cuber42', email: 'cuber42@example.com' };

function Input({ value, onChange, type = "text", placeholder }) {
  return (
    <input
      className="accordian-settings-input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

function AccountRow({ label, isOpen, currentValue, onToggle, onSave, onCancel, children}) {

  return (
    <div className='account-row'>
      <div className='row-preview' onClick={onToggle}>
        <div className='row-label'>
          <span className='account-row-label'>{label}</span>
          { !isOpen && (
            <span className='account-row-value'>{currentValue}</span>
          )}
        </div>
        <span className='account-edit'>{isOpen ? 'cancel' : 'edit'}</span>
      </div>
      { isOpen && (
        <div className='accordian'>
          {children}
          <div className='accordian-buttons'>
            <button className='accordian-cancel' onClick={onToggle}>
            Cancel
            </button>
            <button className='accordian-save'>
            Save
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function FieldLabel({ children }){
  return (
    <span className='accordian-field-label'>
      {children}
    </span>
  )
}

function Account() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw]       = useState('');
  const [saved, setSaved]       = useState({});

  const [openRow, setOpenRow] = useState(null);

  const handleSubmit = async () => {
    try {
      console.log(email);
      const res = await fetch("/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      console.log("API response: ", data);
      if (res.ok) {
        setSaved('email');
      } else {
        console.error("Error: ", data);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }


  function toggle(field) {
    console.log(openRow);
    setOpenRow(prev => prev === field ? null : field);
    console.log(openRow);
  }

  const handleSave = (key) => {
    setSaved(p => ({ ...p, [key]: true }));
    setTimeout(() => setSaved(p => ({ ...p, [key]: false })), 1500);
  };


  return (
    <div className='settings-section'>
      <span className="section-title">Credentials</span>
      <div className='account-menu'>
        <div className='account-settings'>
          <div className='accordian-row-container'>
            <AccountRow 
              label='username'
              isOpen={openRow === 'username'}
              currentValue='beebus'
              onToggle={() => toggle('username')}
              onSave={true}
              onCancel={true}
            >
              <div className='accordian-input'>
                <FieldLabel>New username</FieldLabel>
                <Input value='' onChange={false} placeholder='Enter new username'/>
              </div>
              <div className='accordian-input'>
                <FieldLabel>Current password</FieldLabel>
                <Input value='' onChange={false} placeholder='Enter current password'/>
              </div>
            </AccountRow>
          </div>
          <div className='accordian-row-container'>
            <AccountRow 
              label='email'
              isOpen={openRow === 'email'}
              currentValue='test@beebus.com'
              onToggle={() => toggle('email')}
              onSave={true}
              onCancel={true}
            >
              <div className='accordian-input'>
                <FieldLabel>New email</FieldLabel>
                <Input value='' onChange={false} placeholder='Enter new email'/>
              </div>
              <div className='accordian-input'>
                <FieldLabel>Confirm new email</FieldLabel>
                <Input value='' onChange={false} placeholder='Re-enter new email'/>
              </div>
              <div className='accordian-input'>
                <FieldLabel>Current password</FieldLabel>
                <Input value='' onChange={false} placeholder='Enter current password'/>
              </div>
            </AccountRow>
          </div>
          <div className='accordian-row-container-bottom'>
            <AccountRow 
              label='password'
              isOpen={openRow === 'password'}
              currentValue='•••••••'
              onToggle={() => toggle('password')}
              onSave={true}
              onCancel={true}
            >
              <div className='accordian-input'>
                <FieldLabel>New password</FieldLabel>
                <Input value='' onChange={false} placeholder='Enter new password'/>
              </div>
              <div className='accordian-input'>
                <FieldLabel>Confirm new password</FieldLabel>
                <Input value='' onChange={false} placeholder='Re-enter new password'/>
              </div>
              <div className='accordian-input'>
                <FieldLabel>Current password</FieldLabel>
                <Input value='' onChange={false} placeholder='Enter current password'/>
              </div>
            </AccountRow>
          </div>
        </div>
      </div>
    </div>
  );

  /*
  return (
    <div className="settings-section">
      <span className="section-title">Credentials</span>
      <div className="settings-card account-menu">

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
            <button className="settings-btn" onClick={() => handleSubmit(email)}>
              {saved.email ? 'Saved' : 'Update'}
            </button>
          </div>
        </div>

        <div className="settings-divider" />

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
  */
}

export default Account;
