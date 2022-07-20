import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../../context/mailReducer";
import OutBoxSingleMail from "./OutBoxSingleMail";

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
    <ul>
      {Object.keys(emails).map((item) => (
        <li
          id={item}
          onClick={openEmailClickHandler}
          style={{
            border: "2px solid black",
            textAlign: "left",
            listStyle: "none",
          }}
          key={item}
        >
          <span style={{ paddingRight: "10px", textAlign: "left" }}>
            To: {emails[item].to}{" "}
          </span>
          <span>Heading: {emails[item].heading}</span>
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
      <h4>This is outbox</h4>
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
