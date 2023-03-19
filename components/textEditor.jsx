import { useEffect, useState } from "react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import appendComment from "./comment/appendComment";
import { getData } from "../lib/dataStore";
import { postAPI } from "../lib/callAPI";
import Alert from "./alert";

let editor;

const TextEditor = (props) => {
  const { data } = props;

  const [alert, setalert] = useState({ show: false, status: null, statusText: '', type: '' })

  useEffect(() => {
    startEditor()
  }, []);

  const startEditor = () => {
    ClassicEditor.create(document.querySelector('#postText'), {
      removePlugins: ['CKFinderUploadAdapter', 'CKFinder', 'EasyImage', 'Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload'],
    }).then((newEditor) => {
      editor = newEditor;
    }).catch((error) => {
      console.error( error );
    });
  }

  const sendText = async (e) => {
    e.preventDefault()
    console.log(editor.getData())

    if (editor && editor.getData().trim() !== '') {
      const body = {
        content: editor.getData(),
        img_url: props.path == 'posts' && '',
        user_id: await getData('user_id', 0),
        post_id: props.path == 'comments' && data.id
      }
      const res = await postAPI({ path: props.path, body })

      if (res.data) {
        const data = res.data
        editor.setData('')
        props.path == 'comments' && appendComment(data) 
        setalert({ show: true, status: 'Success.', statusText: 'successfully added!', type: 'success' })
        setTimeout(() => {
          setalert({ show: false, status: null, statusText: '', type: '' })
        }, 5000);
      } else {
        setalert({ show: true, status: res.status, statusText: res.message, type: 'danger' })
        setTimeout(() => {
          setalert({ show: false, status: null, statusText: '', type: '' })
        }, 5000);
      }
    }
  }

  return (<>
    {alert.show && <Alert data={alert} />}
    <div className="row my-3 bg-dark">
      <div className="col-8">
        <textarea className="form-control" placeholder="Just write" id="postText" />
      </div>
      <div className="col-4">
        <button className="form-control btn btn-success" onClick={(e) => sendText(e)}>Send</button>
      </div>
    </div>
  </>);
}

export default TextEditor;