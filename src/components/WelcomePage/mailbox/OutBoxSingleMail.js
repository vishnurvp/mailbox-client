import React from "react";
import { useSelector } from "react-redux";
import classes from './OutBoxSingleMail.module.css';

const OutBoxSingleMail = (props) => {
  const cleanUserEmail = useSelector((state) => state.auth.cleanEmail);
  const endpoint = props.data.ID;
 
  const deleteClickHandler = () => {
    fetch(
      `https://mailboxclient-default-rtdb.firebaseio.com/${cleanUserEmail}/sentemails/${endpoint}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        fetch(
          `https://mailboxclient-default-rtdb.firebaseio.com/${cleanUserEmail}/sentemails.json`
        )
          .then((res) => res.json())
          .then((data) => {
            props.onDelete(data);
          });
      }
    });
  };

  return (
    <div className={classes.sigleMailDiv}>
      <button onClick={props.onClose}>Close</button>
      <h3>{props.data.email.to}</h3>
      <h3>{props.data.email.heading}</h3>
      <div dangerouslySetInnerHTML={{ __html: props.data.email.body }} />
      <button onClick={deleteClickHandler}>Delete This Email!</button>
    </div>
  );
};

export default OutBoxSingleMail;
