import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Inbox = () => {
    const [emails, setEmails] = useState({});
    const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mailboxclient-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox.json`
    )
      .then((res) => res.json())
      .then((data) => {
        setEmails(data);
      });
  }, [cleanUserEmail]);

  const emailListJSX = emails ? (
    <ul>
      {Object.keys(emails).map((item) => (
        <li style={{ border: "2px solid black", textAlign: 'left' }} key={item}>
          <label style={{textAlign: 'left'}}>To: {emails[item].to}</label>
          <hr />
          <label>Heading: {emails[item].heading}</label>
          <hr />
          <p
            dangerouslySetInnerHTML={{ __html: emails[item].body }}
          ></p>
        </li>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  return (
    <Fragment>
      <h3>This is Inbox</h3>
      {emailListJSX}
    </Fragment>
  );
};

export default Inbox;
