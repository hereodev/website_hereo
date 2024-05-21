import React, { useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import EditorToolbar from './editor-toolbar';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'

interface TiptapEditorProps {
    initialContent?: string;
    setContent: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ initialContent, setContent }) => {
    // if(!initialContent) initialContent = '<ul><li><p><strong>Hello</strong>, Tiptap!</p></li></ul><h1>And this is great.</h1>';
    if(!initialContent) initialContent = '<p>Start typing...</p>';
    // setContent(initialContent);
    const editorRef = useRef(null);
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextAlign,
            TextStyle,
            Color,
        ],
        content: initialContent,
        // placeholder: 'Start typing...',
        editorProps: {
            attributes: {
                class: 'editor-content prose min-h-[200px] h-full w-full p-4 ',
            },
        },
        onUpdate: ({ editor }) => {
            // console.log(editor.getHTML());
            setContent(editor.getHTML());
            // setContent(JSON.stringify(editor.getJSON(), null, 2))
        },
    });

    if(!editor) return (
        <div className="flex flex-row w-full items-center justify-center">
            {/* <span className="loading loading-dots loading-md"></span> */}
            <span className="loading loading-ring loading-lg"></span>
        </div>
    )

    return (
        <div className="border border-opacity-30 border-base-content rounded-md focus:outline focus:outline-base-content/30 focus:outline-2 focus:outline-offset-2 ">
            <EditorToolbar editor={editor} />
            <div className="editor-content" ref={editorRef}>
                {editor && <EditorContent editor={editor} />}
            </div>
        </div>
    );
};

export default TiptapEditor;