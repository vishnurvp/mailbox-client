import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import React, { Fragment, useRef, useState } from "react";
import draftToHtml from "draftjs-to-html";

const CreateEmail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const toEmailInp = useRef();
  const emailHeadingInp = useRef();
  // const emailBodyInp = useRef();

  const onEditorStateChange = (currEditorState) => {
    setEditorState(currEditorState);
  };

  const sendMailHandler = () => {
    const emailData = {
      to: toEmailInp.current.value,
      heading: emailHeadingInp.current.value,
      body: draftToHtml(convertToRaw(editorState.getCurrentContent())),
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
    setEditorState(EditorState.createEmpty());
  };
  return (
    <Fragment>
      <label>To: </label>
      <input type={"email"} ref={toEmailInp}></input>
      <br />
      <label>Heading: </label>
      <input ref={emailHeadingInp}></input>
      <div
        style={{
          overflow: "scroll",
          backgroundColor: "#abbedb",
          height: "40vw",
        }}
      >
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={onEditorStateChange}
        />
        {/* <textarea ref={emailBodyInp}></textarea> */}
      </div>
      <button onClick={sendMailHandler}>Send Mail</button>
    </Fragment>
  );
};

export default CreateEmail;
