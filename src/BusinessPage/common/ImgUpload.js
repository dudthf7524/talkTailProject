import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ImageContext } from "../../Contexts/ImageContext";

function ImgUpload() {
  const { imageFiles, updateImageFiles } = useContext(ImageContext);
  const navigate = useNavigate();
  const { imageType } = useParams();
  const { pathName } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);

  useEffect(() => {
    setSelectedFiles(imageFiles[imageType] || []);
  }, [imageFiles, imageType]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleUploadBoxClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleDelete = (indexToDelete) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToDelete)
    );
  };

  const handleSave = () => {
    updateImageFiles(imageType, selectedFiles);
    if (pathName === "register") {
      navigate("/business/register/information");
    }
    if (pathName === "edit") {
      navigate("/business/edit/information");
    }
  };

  return (
    <div className="mid" lang="ko">
      <div className="navigation">
        <button onClick={() => navigate(-1)}>
          <img
            src={`${process.env.PUBLIC_URL}/BusinessPageImage/button/arrow_left.svg`}
            alt=""
          />
        </button>
        엘범 올리기
        <button onClick={handleSave}>
          <img
            src={`${process.env.PUBLIC_URL}/BusinessPageImage/icon/keyboard_return_black.svg`}
            alt=""
          />
        </button>
      </div>
      <div className="main-mid">
        <div className="img-upload-container">
          <div className="img-upload-box" onClick={handleUploadBoxClick}>
            <h1>파일 선택</h1>
            <p>클릭</p>
          </div>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            multiple
            onChange={handleFileChange}
          />
          <div>
            <p>1:1 비율 정사각형 사진을 올려주세요.</p>
            <p>가로, 세로 500*500px를 권장드립니다.</p>
          </div>
        </div>
        <div className="img-preview-container">
          {selectedFiles.map((file, index) => (
            <div
              key={index}
              style={{ position: "relative", display: "inline-block" }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={`preview ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  margin: "10px",
                }}
              />
              <button
                onClick={() => handleDelete(index)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImgUpload;
