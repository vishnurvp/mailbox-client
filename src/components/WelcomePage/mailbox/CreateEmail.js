// import { convertToRaw, EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import React, {Fragment, useRef} from "react";

const CreateEmail = () => {
    // const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const toEmailInp = useRef();
    const emailHeadingInp = useRef();
    const emailBodyInp = useRef();

    // const onEditorStateChange = (currEditorState) => {
    //     setEditorState(currEditorState);
    // }

    const sendMailClickHandler = () => {
        // console.log(convertToRaw(editorState.getCurrentContent()))
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
    return (
        <Fragment>
        <label>To: </label>
        <input ref={toEmailInp}></input>
        <br />
        <label>Heading: </label>
        <input ref={emailHeadingInp}></input>
        <div style={{ backgroundColor: "#abbedb", height: "25vw" }}>
          {/* <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
            /> */}
          <textarea ref={emailBodyInp}></textarea>
        </div>
        <button onClick={sendMailClickHandler}>Send Mail</button>
      </Fragment>
    )
}

export default CreateEmail;