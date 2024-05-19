
import { FaHeading, FaList, FaStrikethrough } from 'react-icons/fa'
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa'
import { type Editor } from "@tiptap/react";
import { RiFormatClear, RiH2, RiAlignCenter, RiAlignLeft, RiAlignRight, RiBold, RiItalic, RiUnderline } from "react-icons/ri";

type Props = {
  editor: Editor | null;
//   content: string;
};
export default function EditorToolbar({ editor } : Props) {

    if(!editor) return null

    // return(
    //               <div>
    //                 <form className="flex flex-row gap-1">
    //                   <button
    //                     onClick={editor.chain().focus().toggleBold().run}
    //                     // onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleBold().run()}}
    //                     className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('bold') && "btn-outline opacity-100"}`}
    //                     title="Bold"
    //                   >
    //                     <FaBold className="h-4 w-4" />
    //                   </button>
    //                   {/* <button
    //                     className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('italic') && "btn-outline opacity-100"}`}
    //                     onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleItalic().run()}}
    //                     title="Italic"
    //                   >
    //                     <FaItalic className="h-4 w-4" />
    //                   </button>
    //                   <button
    //                     className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('underline') && "btn-outline opacity-100"}`}
    //                     onClick={() => editor.chain().focus().toggleUnderline().run()}
    //                     title='Underline'
    //                   >
    //                     <FaUnderline className="h-4 w-4" />
    //                   </button>
    //                   <button
    //                     className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('strike') && "btn-outline opacity-100"}`}
    //                     onClick={() => editor.chain().focus().toggleStrike().run()}
    //                     title='Strikethrough'
    //                   >
    //                     <FaStrikethrough className="h-4 w-4" />
    //                   </button>
    //                   <button
    //                     className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('bulletList') && "btn-outline opacity-100"}`}
    //                     onClick={() => editor.chain().focus().toggleBulletList().run()}
    //                     title='Bullet List'
    //                   >
    //                     <FaList className="h-4 w-4" />
    //                   </button>
    //                   <button
    //                     className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('heading', { level: 1 }) && "btn-outline opacity-100"}`}
    //                     onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
    //                     title='Heading 1'
    //                   >
    //                     <FaHeading className="h-4 w-4" />
    //                   </button> */}
    //                   <div className="dropdown dropdown-bottom">
    //                     <div tabIndex={0} role="button" className="btn m-1">Heading</div>
    //                     <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
    //                       <li><button>Heading 1</button></li>
    //                       <li><button>Heading 2</button></li>
    //                       <li><button>Heading 3</button></li>
    //                     </ul>
    //                   </div>
            
    //                 </form>
    //                 <div className="divider my-0"></div>
    //                 </div>
    // )
	const formatActive = (format: string) => editor && editor.isActive(format);

    return (
        <div className="flex flex-row gap-2 mb-4">
            <button type="button" onClick={(e) => {e?.preventDefault(); editor.chain().focus()}}></button>
            <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`${editor.isActive('bold') && "bg-primary"}`}><RiBold /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`${editor.isActive('italic') && "bg-primary"}`}><RiItalic /></button>
            <button type="button" onClick={() => editor.chain().focus().toggleHeading({level:2}).run()} className={`${editor.isActive('heading') && "bg-primary"}`}><RiH2 /></button>
            {/* <button type="button" onClick={() => editor.chain().focus().toggleHeading({level:2}).run()} className={`${editor.isActive('heading') && "bg-primary"}`}><RiFormatClear /></button> */}
        </div>
    )

}