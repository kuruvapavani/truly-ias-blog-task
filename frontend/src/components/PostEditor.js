'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

export default function PostEditor({ content, setContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[300px]',
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
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={buttonStyle(editor.isActive('bold'))}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={buttonStyle(editor.isActive('italic'))}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={buttonStyle(editor.isActive('underline'))}>
          Underline
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={buttonStyle(editor.isActive('bulletList'))}>
          • List
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={buttonStyle(editor.isActive('orderedList'))}>
          1. List
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={buttonStyle(editor.isActive('heading', { level: 1 }))}>
          H1
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={buttonStyle(editor.isActive('heading', { level: 2 }))}>
          H2
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={buttonStyle(editor.isActive('heading', { level: 3 }))}>
          H3
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={buttonStyle(editor.isActive('codeBlock'))}>
          {'</>'} Code
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()} className={buttonStyle(false)}>
          ― HR
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={buttonStyle(editor.isActive({ textAlign: 'left' }))}>
          Left
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={buttonStyle(editor.isActive({ textAlign: 'center' }))}>
          Center
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={buttonStyle(editor.isActive({ textAlign: 'right' }))}>
          Right
        </button>
        <button onClick={() => editor.chain().focus().undo().run()} className={buttonStyle(false)}>
          Undo
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} className={buttonStyle(false)}>
          Redo
        </button>
        <button
          onClick={() => {
            const url = prompt('Enter a URL');
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          className={buttonStyle(editor.isActive('link'))}
        >
          🔗 Link
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          className={buttonStyle(false)}
        >
          ❌ Unlink
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
        <div className="prose dark:prose-invert max-w-none">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
