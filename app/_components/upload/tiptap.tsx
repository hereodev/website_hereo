'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FaHeading, FaList, FaStrikethrough } from 'react-icons/fa'
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
import Underline from '@tiptap/extension-underline'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        // history: false,
      }),
      Underline,
      // Paragraph,
      // Text,
      // Heading.configure({
      //   levels: [1, 2, 3],
      // }),
    ],
    content: '<p>You may write text here.</p>',
  })

  if(!editor) return null

  return (
    <div className="textarea textarea-bordered p-0">
      {
        editor &&
          <div>
            <div className="flex flex-row gap-1">
              <button
                onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleBold().run()}}
                className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('bold') && "btn-outline opacity-100"}`}
                title="Bold"
              >
                <FaBold className="h-4 w-4" />
              </button>
              <button
                className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('italic') && "btn-outline opacity-100"}`}
                onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleItalic().run()}}
                title="Italic"
              >
                <FaItalic className="h-4 w-4" />
              </button>
                {/* boutons : souligné, heading, strike, text color, highlighting, center/left/right */}
              <button
                className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('underline') && "btn-outline opacity-100"}`}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                title='Underline'
              >
                <FaUnderline className="h-4 w-4" />
              </button>
              <button
                className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('strike') && "btn-outline opacity-100"}`}
                onClick={() => editor.chain().focus().toggleStrike().run()}
                title='Strikethrough'
              >
                <FaStrikethrough className="h-4 w-4" />
              </button>
              <button
                className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('bulletList') && "btn-outline opacity-100"}`}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title='Bullet List'
              >
                <FaList className="h-4 w-4" />
              </button>
              <button
                className={`btn btn-square btn-sm opacity-80 hover:opacity-90 ${editor.isActive('heading', { level: 1 }) && "btn-outline opacity-100"}`}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                title='Heading 1'
              >
                <FaHeading className="h-4 w-4" />
              </button>
              <div className="dropdown dropdown-bottom">
                <div tabIndex={0} role="button" className="btn m-1">Heading</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><button>Heading 1</button></li>
                  <li><button>Heading 2</button></li>
                  <li><button>Heading 3</button></li>
                </ul>
              </div>

              
            </div>
            <div className="divider my-0"></div> 
          </div>
      }
      <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap