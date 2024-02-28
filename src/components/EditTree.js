// 1: Uncontrolled Tree
import { useRef, useState,useEffect} from "react";
import { Tree,useSimpleTree} from "react-arborist";

import Node from "./Node";

import { TbFolderPlus } from "react-icons/tb";
import { AiOutlineFileAdd } from "react-icons/ai";

const initialData=[
  {
    id: "1",
    name: "public",
    children: [{ id: "c1-1", name: "index.html" }]
  },
  {
    id: "2",
    name: "src",
    children: [
      { id: "c2-1", name: "App.js" },
      { id: "c2-2", name: "index.js" },
      { id: "c2-3", name: "styles.css" }
    ]
  },
  { id: "3", name: "package.json" },
  { id: "4", name: "README.md" }
];
const EditTree = () => {
  const [term, setTerm] = useState("");
  const treeRef = useRef(null);
  const [ data, controller ] = useSimpleTree( initialData );
  useEffect( () => {
    console.log( data );
  }, [ data ]);

  const createFileFolder = (
    <>
      <button
        onClick={() => treeRef.current.createInternal()}
        title="New Folder..."
      >
        <TbFolderPlus />
      </button>
      <button onClick={() => treeRef.current.createLeaf()} title="New File...">
        <AiOutlineFileAdd />
      </button>
    </>
  );




  return (
    <div>
      <div className="folderFileActions">{createFileFolder}</div>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <Tree
        ref={treeRef}
        data={data}
        width={260}
        height={1000}
        indent={24}
        rowHeight={32}
        // openByDefault={false}
        searchTerm={term}
        searchMatch={(node, term) =>
          node.data.name.toLowerCase().includes(term.toLowerCase())
        }
        { ...controller }

      >
        {Node}
      </Tree>
    </div>
  );
};

export default EditTree;
