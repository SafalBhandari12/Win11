// src/components/useFileSystem.js
import { useState } from "react";

const useFileSystem = () => {
  const [fileSystem, setFileSystem] = useState([
    {
      id: 1,
      name: "Root",
      type: "folder",
      children: [
        {
          id: 2,
          name: "Documents",
          type: "folder",
          children: [
            {
              id: 3,
              name: "notes.txt",
              type: "file",
              content: "This is a text file.",
            },
            {
              id: 4,
              name: "klk.pdf",
              type: "file",
              uri: "https://yunlongjiao.github.io/resume/resume.pdf", // Updated PDF file URL
            },
          ],
        },
        {
          id: 6,
          name: "Images",
          type: "folder",
          children: [
            {
              id: 7,
              name: "photo.png",
              type: "file",
              uri: "https://example.com/photo.png", // External image file example
            },
          ],
        },
      ],
    },
  ]);

  const addFileOrFolder = (parentId, newItem) => {
    const updateFileSystem = (nodes) => {
      return nodes.map((node) => {
        if (node.id === parentId && node.type === "folder") {
          return { ...node, children: [...(node.children || []), newItem] };
        }
        if (node.children) {
          return { ...node, children: updateFileSystem(node.children) };
        }
        return node;
      });
    };
    setFileSystem(updateFileSystem(fileSystem));
  };

  return { fileSystem, addFileOrFolder };
};

export default useFileSystem;
