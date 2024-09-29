
import React, { useState } from 'react';
import { InputTextarea } from "primereact/inputtextarea";

function EmailLink() {
  const [email, setEmail] = useState('nomiste9@gmail.com');
  const [subject, setSubject] = useState('');
  const [value, setValue] = useState('');

  const sendEmail = () => {
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  };

  return (
    <div style={{textAlign:"center", alignItems:"center", margin:"auto"}}>
    


    <InputTextarea style={{marginTop:"20px"}}value={value} onChange={(e) => setValue(e.target.value)} rows={5} cols={30} />


        
    <a href="javascript:void(0)" onClick={sendEmail} style={{marginTop:'50%',color:'red'}}>
      {email}
    </a></div>
  );
}

export default EmailLink;
