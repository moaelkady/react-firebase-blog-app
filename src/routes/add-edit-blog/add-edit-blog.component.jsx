import { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../utils/firebase/firebase.utils";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

import "./add-edit-blog.styles.scss";

const defaultPostFields = {
  title: "",
  metaDescription: "",
  tags: [],
  trending: "no",
  category: "",
  post: "",
};

const categoryOptions = [
  "Frontend Development",
  "Performance Optimization",
  "UI/UX Design",
  "Freelancing Tips",
  "Upwork Freelancing",
  "Latest Web Technologies",
  "Other",
];

const AddEditBlog = ({ user }) => {
  const [postFields, setPostFields] = useState(defaultPostFields);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  const { title, metaDescription, tags, category, trending, post } = postFields;

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, imageFile.name);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setUploadProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setPostFields((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    imageFile && uploadFile();
  }, [imageFile]);

  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setPostFields({ ...snapshot.data() });
    }
  };

  const resetPostFields = () => {
    setPostFields(defaultPostFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostFields({ ...postFields, [name]: value });
  };

  const handleTagChange = (tags) => {
    setPostFields({ ...postFields, tags });
  };

  const handleTrending = (e) => {
    setPostFields({ ...postFields, trending: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setPostFields({ ...postFields, category: e.target.value });
  };

  const handleImgUpload = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (category && tags && title && post && trending) {
      if (!id) {
        try {
          await addDoc(collection(db, "posts"), {
            ...postFields,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "posts", id), {
            ...postFields,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Blog updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }

    resetPostFields();
    navigate("/");
  };

  return (
    <div className="add-blog-view-container">
      <div className="heading-container">
        <h1>Add New Post</h1>
      </div>
      <div className="add-blog-form-container">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="form-group title-block">
            <FormInput
              type="text"
              label="Title"
              name="title"
              required
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group meta-block">
            <FormInput
              type="text"
              label="Meta Description"
              name="metaDescription"
              required
              value={metaDescription}
              onChange={handleChange}
            />
          </div>
          <div className="form-group tags-block">
            <ReactTagInput
              tags={tags}
              placeholder="Tags"
              onChange={handleTagChange}
            />
          </div>
          <div className="form-group trending-block">
            <p className="trending">Add to trending ?</p>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                value="yes"
                name="radioOption"
                checked={trending === "yes"}
                onChange={handleTrending}
              />
              <label htmlFor="radioOption" className="form-check-label">
                Yes
              </label>
              <input
                type="radio"
                className="form-check-input"
                value="no"
                name="radioOption"
                checked={trending === "no"}
                onChange={handleTrending}
              />
              <label htmlFor="radioOption" className="form-check-label">
                No
              </label>
            </div>
          </div>
          <div className="form-group category-select-box-block">
            <select
              value={category}
              className="cat-dropdown"
              onChange={handleCategoryChange}
            >
              <option>Please select category</option>
              {categoryOptions.map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group post-area-block">
            <textarea
              className="description-box"
              placeholder="Write Your Post"
              value={post}
              required
              name="post"
              onChange={handleChange}
            />
          </div>
          <div className="form-group image-file-block">
            <span>Upload Image</span>
            <input
              type="file"
              className="img-input"
              onChange={handleImgUpload}
            />
          </div>
          <div className="form-group btn-submit">
            <Button
              btnName="Add Post"
              type="submit"
              disabled={uploadProgress !== null && uploadProgress < 100}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlog;
