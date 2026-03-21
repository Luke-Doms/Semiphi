import { useState } from 'react';

const MOCK_USER = { username: 'cuber42', email: 'cuber42@example.com' };

//on focus options to add
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
            <button className='accordian-cancel' onClick={onCancel}>
            Cancel
            </button>
            <button className='accordian-save' onClick={onSave}>
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
  const [saved, setSaved] = useState("");
    // Username state
  const [newUsername, setNewUsername] = useState("");
  const [userCurrentPw, setUserCurrentPw] = useState("");
 
  // Email state
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailCurrentPw, setEmailCurrentPw] = useState("");
 
  // Password state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [openRow, setOpenRow] = useState(null);

  const handleUsernameSubmit = async () => {
    try {
      const res = await fetch("/reset-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newUsername, userCurrentPw})
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

  const handleEmailSubmit = async () => {
    try {
      console.log(newEmail, confirmEmail, emailCurrentPw);
      if (newEmail !== confirmEmail) {
        setSaved('email-mismatch'); // or a separate error state
        return;
      }

      const res = await fetch("/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail, emailCurrentPw })
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

  const handlePasswordSubmit = async () => {
    try {
      console.log(currentPw, newPw, confirmPw);
      if (newPw !== confirmPw) {
        setSaved('password-mismatch'); // or a separate error state
        return;
      }

      const res = await fetch("/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPw, newPw })
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

  const handleCancel = () => {
    setOpenRow(null);
    setNewUsername(""); setUserCurrentPw("");
    setNewEmail(""); setConfirmEmail(""); setEmailCurrentPw("");
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
  };


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
              onSave={handleUsernameSubmit}
              onCancel={handleCancel}
            >
              <div className='accordian-input'>
                <FieldLabel>New username</FieldLabel>
                <Input value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder='Enter new username'/>
              </div>
              <div className='accordian-input'>
                <FieldLabel>Current password</FieldLabel>
                <Input type="password" value={userCurrentPw} onChange={e => setUserCurrentPw(e.target.value)} placeholder='Enter current password'/>
              </div>
            </AccountRow>
          </div>
          <div className='accordian-row-container'>
            <AccountRow 
              label='email'
              isOpen={openRow === 'email'}
              currentValue='test@beebus.com'
              onToggle={() => toggle('email')}
              onSave={handleEmailSubmit}
              onCancel={handleCancel}
            >
              <div className='accordian-input'>
                <FieldLabel>New email</FieldLabel>
                <Input value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder='Enter new email'/>
              </div>
              <div className='accordian-input'>
                <FieldLabel>Confirm new email</FieldLabel>
                <Input value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)} placeholder='Re-enter new email'/>
              </div>
              <div className='accordian-input'>
                <FieldLabel>Current password</FieldLabel>
                <Input type="password" value={emailCurrentPw} onChange={e => setEmailCurrentPw(e.target.value)} placeholder='Enter current password'/>
              </div>
            </AccountRow>
          </div>
          <div className='accordian-row-container-bottom'>
            <AccountRow 
              label='password'
              isOpen={openRow === 'password'}
              currentValue='•••••••'
              onToggle={() => toggle('password')}
              onSave={handlePasswordSubmit}
              onCancel={handleCancel}
            >
              <div className='accordian-input'>
                <FieldLabel>New password</FieldLabel>
                <Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder='Enter new password'/>
              </div>
              <div className='accordian-input'>
                <FieldLabel>Confirm new password</FieldLabel>
                <Input type="password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} placeholder='Re-enter new password'/>
              </div>
              <div className='accordian-input'>
                <FieldLabel>Current password</FieldLabel>
                <Input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} placeholder='Enter current password'/>
              </div>
            </AccountRow>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
