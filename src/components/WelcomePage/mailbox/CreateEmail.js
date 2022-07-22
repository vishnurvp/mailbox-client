import React, { Fragment, useRef, useState } from "react";
import classes from './CreateEmail.module.css';
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from "draftjs-to-html";
import { useSelector } from "react-redux";

const CreateEmail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const toEmailInp = useRef();
  const emailHeadingInp = useRef();
  // const emailBodyInp = useRef();
  const userEmail = useSelector(state=>state.auth.email);
  const cleanUserEmail = useSelector(state=>state.auth.cleanEmail);

  const onEditorStateChange = (currEditorState) => {
    setEditorState(currEditorState)
  };

  const sendMailHandler = () => {
    const emailData = {
      from: userEmail,
      to: toEmailInp.current.value,
      heading: emailHeadingInp.current.value,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      isRead: false,
    };
    const cleanToEmail = toEmailInp.current.value.replace(/[^a-zA-Z ]/g, "");
    fetch(`https://mailboxclient-default-rtdb.firebaseio.com/${cleanToEmail}/inbox.json`,{
      method: 'POST',
      headers: {
        "Content-type": "application-json",
      },
      body: JSON.stringify(emailData),
    })
    .then((res=>res.json()))
    .then((data)=> {
      // console.log(data);
    })

    fetch(`https://mailboxclient-default-rtdb.firebaseio.com/${cleanUserEmail}/sentemails.json`, {
      method: "POST",
      headers: {
        "Content-type": "application-json",
      },
      body: JSON.stringify(emailData),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });

    // console.log(emailData);
    toEmailInp.current.value = "";
    emailHeadingInp.current.value = "";
    setEditorState(EditorState.createEmpty());
  };
  return (
    <Fragment>
      <input className={classes.to} placeholder="To" type={"email"} ref={toEmailInp}></input>
      <input className={classes.mailHeading} placeholder="Email Heading" ref={emailHeadingInp}></input>
      <div
        className={classes.editorDiv}
      >
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
      </div>
      <button className={classes.sendMailBtn} onClick={sendMailHandler}>Send Mail</button>
    </Fragment>
  );
};

export default CreateEmail;
