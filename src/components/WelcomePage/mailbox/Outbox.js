import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../../context/mailReducer";
import OutBoxSingleMail from "./OutBoxSingleMail";
import classes from './Outbox.module.css';

const Outbox = (props) => {
  const dispatch = useDispatch();
  const [outSingleMail, setSingleMail] = useState("");
  const emails = useSelector((state) => state.mail.sentmail);
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);

  useEffect(() => {
    fetch(
      `https://mailboxclient-default-rtdb.firebaseio.com/${cleanUserEmail}/sentemails.json`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch(mailActions.setSentMail(data));
      });
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
          key={item}
        >
          <span >
            {emails[item].to}:
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
    dispatch(mailActions.setSentMail(data));
    setSingleMail("");
  };

  return (
    <Fragment>
      <h4 className={classes.inboxHeading}>This is outbox</h4>
      {!outSingleMail && emailListJSX}
      {outSingleMail && <OutBoxSingleMail
        onDelete={onSingleMailDeleteHandler}
        onClose={onSingleMailCloseHandler}
        data={outSingleMail}
      /> } 
    </Fragment>
  );
};

export default Outbox;
