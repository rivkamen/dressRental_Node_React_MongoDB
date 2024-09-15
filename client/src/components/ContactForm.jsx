
import React, { useState } from 'react';

function EmailLink() {
  const [email, setEmail] = useState('nomiste9@gmail.com');
  const [subject, setSubject] = useState('');

  const sendEmail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <a href="javascript:void(0)" onClick={sendEmail} style={{marginTop:'50%',color:'red'}}>
      {email}
    </a>
  );
}

export default EmailLink;
