import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleMail from "./SingleMail";
import { mailActions } from "../../../context/mailReducer";
import classes from './Inbox.module.css';

const Inbox = (props) => {
  const dispatch = useDispatch();
  const [singleMail, setSingleMail] = useState("");
  const emails = useSelector((state) => state.mail.inbox);
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);
  if (emails) {
    props.setUnread(Object.keys(emails).reduce((p,key)=>{
      if(!emails[key].isRead) return p+1;
      return p;
    },0))
  }
  
  // if(emails) props.setUnread()
  useEffect(() => {
    fetch(
      `https://mailboxclient-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox.json`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(mailActions.setInbox(data));
      });
  }, [cleanUserEmail, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(
        `https://mailboxclient-default-rtdb.firebaseio.com/${cleanUserEmail}/inbox.json`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(mailActions.setInbox(data));
        });
    }, 4000);
    return () => clearInterval(interval);
  }, [cleanUserEmail, dispatch]);

  const openEmailClickHandler = (event) => {
    setSingleMail({
      email: emails[event.currentTarget.id],
      ID: event.currentTarget.id,
    });
  };

  const emailListJSX = emails ? (
    <ul className={classes.emailsList}>
      {Object.keys(emails).reverse().map((item) => (
        <li
          id={item}
          onClick={openEmailClickHandler}
          style={{
            backgroundColor: emails[item].isRead ?'white':'#ffab44',
          }}
          key={item}
        >
          {!emails[item].isRead && <div style={{width: '10px', height:'10px', borderRadius: '50%', backgroundColor: 'red'}}/>}
          <span>
            {emails[item].from}:
          </span>
          <span>{emails[item].heading}</span>
        </li>
      ))}
    </ul>
  ) : (
    <p>No Emails Found</p>
  );

  const onSingleMailCloseHandler = () => {
    setSingleMail("");
  };

  const onSingleMailDeleteHandler = (data) => {
    dispatch(mailActions.setInbox(data));
    setSingleMail("");
  };

  return (
    <Fragment>
      <h3 className={classes.inboxHeading}>This is Inbox</h3>
      {!singleMail && emailListJSX}
      {singleMail && (
        <SingleMail
          onDelete={onSingleMailDeleteHandler}
          onClose={onSingleMailCloseHandler}
          data={singleMail}
        />
      )}
    </Fragment>
  );
};

export default Inbox;
