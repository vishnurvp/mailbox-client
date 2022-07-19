import React, { Fragment, useEffect, useState } from "react";

const Outbox = (props) => {
  const [emails, setEmails] = useState({});
  useEffect(() => {
    fetch("https://mailboxclient-default-rtdb.firebaseio.com/emails.json")
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
      });
  }, []);

  return (
    <Fragment>
      <div>This is outbox</div>
      {Object.keys(emails).map(item=><p style={{border: '2px solid black'}} key={item}>
        <label>To: {emails[item].to}</label><br/>
        <label>Heading: {emails[item].heading}</label><br/>
        <label>{emails[item].body}</label>
      </p>)}
    </Fragment>
  );
};

export default Outbox;
