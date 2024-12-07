import React, { createContext, useState } from 'react';

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [imageFiles, setImageFiles] = useState({
    main: [],
    sub: [],
    album: [],
    review: [],
    pricing: [],
  });

  const updateImageFiles = (type, files) => {
    setImageFiles((prev) => ({ ...prev, [type]: files }));
  };

  return (
    <ImageContext.Provider value={{ imageFiles, updateImageFiles }}>
      {children}
    </ImageContext.Provider>
  );
};
