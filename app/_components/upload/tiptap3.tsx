import React, { useRef } from 'react';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorToolbar from './editor-toolbar';

interface TiptapEditorProps {
    content?: string;
    setContent: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, setContent }) => {
    const editorRef = useRef(null);
    const editor = useEditor({
        extensions: [StarterKit],
        content: '<p>Hello, Tiptap!</p>',
        // placeholder: 'Start typing...',
        editorProps: {
            attributes: {
                class: 'editor-content min-h-[200px] h-full w-full p-4 border border-opacity-30 border-base-content rounded-md focus:outline focus:outline-base-content/30 focus:outline-2 focus:outline-offset-2 ',
            },
        },
        onUpdate: ({ editor }) => {
            // console.log(editor.getHTML());
            setContent(editor.getHTML());
        },
    });

    if(!editor) return (

        <div className="flex flex-row w-full items-center justify-center">
            <span className="loading loading-dots loading-md"></span>
        </div>
    )

    return (
        <div>
            <div>
                <EditorToolbar editor={editor} />
            </div>
            {/* <div className="editor-toolbar">
                {editor && (
                    <>
                        <button onClick={() => editor.chain().focus().toggleBold().run()}>
                            Bold
                        </button>
                        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                            Italic
                        </button>
                        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
                            Underline
                        </button>
                    </>
                )}
            </div> */}
            <div className="editor-content" ref={editorRef}>
                {editor && <EditorContent editor={editor} />}
            </div>
        </div>
    );
};

export default TiptapEditor;