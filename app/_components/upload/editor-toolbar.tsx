
import { FaHeading, FaList, FaStrikethrough } from 'react-icons/fa'
import { FaBold, FaItalic, FaUnderline } from 'react-icons/fa'
import { type Editor } from "@tiptap/react";
import { RiFormatClear, RiH2, RiAlignCenter, RiAlignLeft, RiAlignRight, RiBold, RiItalic, RiUnderline, RiH1, RiListCheck, RiStrikethrough, RiH3, RiMoonClearFill, RiAlignJustify, RiListOrdered } from "react-icons/ri";

type Props = {
  editor: Editor | null;
};

export default function EditorToolbar({ editor } : Props) {

    if(!editor) return null

	// const formatActive = (format: string) => editor && editor.isActive(format);
    const btnIconCss = "h-5 md:h-6 w-5 md:w-6";
    const btnCss = "btn btn-square btn-sm opacity-80 hover:opacity-90"
    const selectedStyleCss = "btn-outline opacity-100"

    const divider = <div className="divider divider-horizontal mx-0"></div>

    return (
        <div className="flex flex-row items-center flex-wrap gap-2 border-b border-b-neutral-content border-b-opacity-30 py-2">
            {/* Don't remove this line. Necessary useless invisible first button to prevent it from being activated on double click??! */}
                <button type="button" className="w-0 h-0" onClick={(e) => {e?.preventDefault(); editor.chain().focus()}}></button>
                <button
                    onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleBold().run()}}
                    className={`${btnCss} ${editor.isActive('bold') && selectedStyleCss}`}
                    title="Bold"
                >
                    <RiBold className={btnIconCss} />
                </button>
                <button
                    className={`${btnCss} ${editor.isActive('italic') && selectedStyleCss}`}
                    onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleItalic().run()}}
                    title="Italic"
                >
                    <RiItalic className={btnIconCss} />
                </button>
                <button
                    className={`${btnCss} ${editor.isActive('underline') && selectedStyleCss}`}
                    onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleUnderline().run()}}
                    title='Underline'
                >
                    <RiUnderline className={btnIconCss} />
                </button>
                <button
                    className={`${btnCss} ${editor.isActive('strike') && selectedStyleCss}`}
                    onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleStrike().run()}}
                    title='Strikethrough'
                >
                    <RiStrikethrough className={btnIconCss} />
                </button>
                <input
                    type="color"
                    onInput={(event) => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
                    value={editor.getAttributes('textStyle').color}
                    data-testid="setColor"
                    title="Text Color"
                />
                {divider}
                <div className="flex flex-row items-center">
                    <button
                        className={`${btnCss} ${editor.isActive({ textAlign: 'left' }) ? selectedStyleCss : ""}`}
                        onClick={(e) => {e?.preventDefault(); editor.chain().focus().setTextAlign('left').run()}}
                        title='Align Left'
                    >
                        <RiAlignLeft className={btnIconCss} />
                    </button>
                    <button
                        className={`${btnCss} ${editor.isActive({ textAlign: 'center' }) ? selectedStyleCss : ""}`}
                        onClick={(e) => {e?.preventDefault(); editor.chain().focus().setTextAlign('center').run()}}
                        title='Align Center'
                    >
                        <RiAlignCenter className={btnIconCss} />
                    </button>
                    <button
                        className={`${btnCss} ${editor.isActive({ textAlign: 'right' }) ? selectedStyleCss : ""}`}
                        onClick={(e) => {e?.preventDefault(); editor.chain().focus().setTextAlign('right').run()}}
                        title='Align Right'
                    >
                        <RiAlignRight className={btnIconCss} />
                    </button>
                    <button
                        className={`${btnCss} ${editor.isActive({ textAlign: 'justify' }) ? selectedStyleCss : ""}`}
                        onClick={(e) => {e?.preventDefault(); editor.chain().focus().setTextAlign('justify').run()}}
                        title='Justify'
                    >
                        <RiAlignJustify className={btnIconCss} />
                    </button>
                </div>
                {divider}
                <button
                    className={`${btnCss} ${editor.isActive('bulletList') && selectedStyleCss}`}
                    onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleBulletList().run()}}
                    title='Bullet List'
                >
                    <RiListCheck className={btnIconCss} />
                </button>
                <button
                    className={`${btnCss} ${editor.isActive('orderedList') && selectedStyleCss}`}
                    onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleOrderedList().run()}}
                    title='Ordered List'
                >
                    <RiListOrdered className={btnIconCss} />
                </button>
                {divider}
                <button
                    className={`${btnCss} ${editor.isActive('heading', { level: 1 }) && selectedStyleCss}`}
                    onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleHeading({ level: 1 }).run()}}
                    title='Heading 1'
                >
                    <RiH1 className={btnIconCss} />
                </button>
                <button
                    className={`${btnCss} ${editor.isActive('heading', { level: 2 }) && selectedStyleCss}`}
                    onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleHeading({ level: 2 }).run()}}
                    title='Heading 2'
                >
                    <RiH2 className={btnIconCss} />
                </button>
                <button
                    className={`${btnCss} ${editor.isActive('heading', { level: 3 }) && selectedStyleCss}`}
                    onClick={(e) => {e?.preventDefault(); editor.chain().focus().toggleHeading({ level: 3 }).run()}}
                    title='Heading 3'
                >
                    <RiH3 className={btnIconCss} />
                </button>
                {divider}
                <button
                    className={`${btnCss}`}
                    onClick={(e) => {e?.preventDefault(); editor.chain().focus().clearNodes().run()}}
                    title='Clear Formatting'
                >
                    <RiFormatClear className={btnIconCss} />
                </button>

        </div>
    )

}