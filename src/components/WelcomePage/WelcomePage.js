import React, { Fragment,useRef, useState } from "react";
// import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Outbox from "./mailbox/Outbox";
import classes from "./WelcomePage.module.css";

const WelcomePage = () => {
  const [createMailOpen, setCreateMailOpen] = useState(false);
  const [inboxOpen, setInboxOpen] = useState(true);
  const [outboxOpen, setOutboxOpen] = useState(false);


  const toEmailInp = useRef();
  const emailHeadingInp = useRef();
  const emailBodyInp = useRef();

  const sendMailClickHandler = () => {
    const emailData = {
      to: toEmailInp.current.value,
      heading: emailHeadingInp.current.value,
      body: emailBodyInp.current.value,
    };

    fetch("https://mailboxclient-default-rtdb.firebaseio.com/emails.json", {
      method: "POST",
      headers: {
        "Content-type": "application-json",
      },
      body: JSON.stringify(emailData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    // console.log(emailData);
    toEmailInp.current.value = "";
    emailHeadingInp.current.value = "";
    emailBodyInp.current.value = "";
  };

  const createMailClickHandler = () => {
    setInboxOpen(false);
    setOutboxOpen(false);
    setCreateMailOpen(true);
  };
  const inboxClickHandler = () => {
    setOutboxOpen(false);
    setCreateMailOpen(false);
    setInboxOpen(true);
  };


  const outboxClickHandler = () => {
    setCreateMailOpen(false);
    setInboxOpen(false);
    setOutboxOpen(true);
    
  };

  return (
    <div>
      <h1>Welcome To your Mail Box</h1>
      <div className={classes.sideNav}>
        <button onClick={createMailClickHandler}>Create Email</button>
        <br />
        <button onClick={inboxClickHandler}>In Box</button>
        <br />
        <button onClick={outboxClickHandler}>Out Box</button>
      </div>

      <div className={classes.mailBox}>
        {createMailOpen && (
          <Fragment>
            <label>To: </label>
            <input ref={toEmailInp}></input>
            <br />
            <label>Heading: </label>
            <input ref={emailHeadingInp}></input>
            <div style={{ backgroundColor: "#abbedb", height: "25vw" }}>
              {/* <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                /> */}
              <textarea ref={emailBodyInp}></textarea>
            </div>
            <button onClick={sendMailClickHandler}>Send Mail</button>
          </Fragment>
        )}
        {inboxOpen && <div>This is Inbox</div>}
        {outboxOpen && <Outbox />}
      </div>
    </div>
  );
};

export default WelcomePage;
