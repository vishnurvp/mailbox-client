import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleMail from "./SingleMail";

const Inbox = () => {
  const [emails, setEmails] = useState({});
  const [singleMail, setSingleMail] = useState('');
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

  const openEmailClickHandler = (event) => {
    setSingleMail({email: emails[event.currentTarget.id], ID: event.currentTarget.id});
  };

  const emailListJSX = emails ? (
    <ul>
      {Object.keys(emails).map((item) => (
        <li
          id={item}
          onClick={openEmailClickHandler}
          style={{
            border: "2px solid black",
            textAlign: "left",
            listStyle: emails[item].isRead?'none':'',
          }}
          key={item}
        >
          <span style={{ paddingRight: "10px", textAlign: "left" }}>
            From: {emails[item].from}
          </span>
          {/* <hr /> */}
          <span>Heading: {emails[item].heading}</span>
          {/* <hr />
          <p
            dangerouslySetInnerHTML={{ __html: emails[item].body }}
          ></p> */}
        </li>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  const onSingleMailCloseHandler = () => {
    setSingleMail('');
  }

  return (
    <Fragment>
      <h3>This is Inbox</h3>
      {!singleMail && emailListJSX}
      {singleMail && <SingleMail onClose={onSingleMailCloseHandler} data={singleMail} />}
    </Fragment>
  );
};

export default Inbox;
