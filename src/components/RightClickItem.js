// // src/components/RightClickItem.js
// import React from "react";

// const RightClickItem = ({ visible, x, y, handleOpen, handleRename, handleDelete }) => {
//   if (!visible) return null;
//   return (
//     <div
//       style={{ top: y, left: x }}
//       className="absolute bg-white shadow-md rounded py-1 text-sm z-50"
//     >
//       <div
//         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//         onClick={handleOpen}
//       >
//         Open
//       </div>
//       <div
//         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//         onClick={handleRename}
//       >
//         Rename
//       </div>
//       <div
//         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//         onClick={handleDelete}
//       >
//         Delete
//       </div>
//     </div>
//   );
// };

// export default RightClickItem;

// src/components/RightClickItem.js
import React from "react";

const RightClickItem = ({ visible, x, y, handleOpen, handleRename, handleDelete }) => {
  if (!visible) return null;
  return (
    <div
      style={{ top: y, left: x }}
      className="absolute bg-white rounded-md shadow-lg py-1 text-sm z-50 border border-gray-200"
    >
      <div
        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
        onClick={handleOpen}
      >
        Open
      </div>
      <div
        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
        onClick={handleRename}
      >
        Rename
      </div>
      <div
        className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
        onClick={handleDelete}
      >
        Delete
      </div>
    </div>
  );
};

export default RightClickItem;
