'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';

export default function PostEditor({ content, setContent }) {
  const editor = useEditor({
  extensions: [StarterKit, Underline],
  content,
  onUpdate: ({ editor }) => {
    setContent(editor.getHTML());
  },
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert focus:outline-none min-h-[300px]',
    },
  },
  editable: true,
  autofocus: false,
});


  if (!editor) return null;

  const buttonStyle = (active) =>
    `px-3 py-1 rounded text-sm font-medium border ${
      active
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
    } hover:scale-105 transition`;

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-800 p-3 rounded-md border border-gray-300 dark:border-gray-700">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonStyle(editor.isActive('bold'))}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonStyle(editor.isActive('italic'))}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={buttonStyle(editor.isActive('underline'))}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonStyle(editor.isActive('bulletList'))}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonStyle(editor.isActive('orderedList'))}
        >
          1. List
        </button>
        <button
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className="px-3 py-1 rounded text-sm font-medium bg-red-100 dark:bg-red-700 text-red-700 dark:text-red-100 border border-red-300 dark:border-red-600 hover:scale-105 transition"
        >
          Clear
        </button>
      </div>

      {/* Editor Area */}
      <div className="border border-gray-300 dark:border-gray-600 rounded-md p-4 min-h-[250px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-base leading-relaxed">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
