import React from 'react';
import { useState } from "react";
import { storage } from '../../firebace';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
 
function AddFiles() {

    const [file, setFile] = useState("");
 
    const [percent, setPercent] = useState(0);
 
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
 
        const storageRef = ref(storage, `/files/${file.name}`);

        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };
 
    return (
        <div>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUpload}>Upload to Firebase</button>
            <p>{percent} "% done"</p>
        </div>
    );
}
 
export default AddFiles;

// import React from 'react';
// import { useState } from 'react';
// import { storage } from '../../firebace';
// import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

// export default function AddFiles() {
//     const [imgUrl, setImgUrl] = useState(null);
//     const [progresspercent, setProgresspercent] = useState(0);
  
//     const handleSubmit = (e) => {
//       e.preventDefault()
//       const file = e.target[0]?.files[0]
//       if (!file) return;
//       const storageRef = ref(storage, `files/${file.name}`);
//       const uploadTask = uploadBytesResumable(storageRef, file);
  
//       uploadTask.on("state_changed",
//         (snapshot) => {
//           const progress =
//             Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//           setProgresspercent(progress);
//         },
//         (error) => {
//           alert(error);
//         },
//         () => {
//           getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             setImgUrl(downloadURL)
//           });
//         }
//       );
//     }
  
//     return (
//       <div className="App">
//         <form onSubmit={handleSubmit} className='form'>
//           <input type='file' />
//           <button type='submit'>Upload</button>
//         </form>
//         {
//           !imgUrl &&
//           <div className='outerbar'>
//             <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
//           </div>
//         }
//         {
//           imgUrl &&
//           <img src={imgUrl} alt='uploaded file' height={200} />
//         }
//       </div>
//     );
//   }

