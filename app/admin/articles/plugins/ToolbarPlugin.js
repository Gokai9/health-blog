// app/admin/articles/plugins/ToolbarPlugin.js
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  FORMAT_TEXT_COMMAND, 
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND
} from 'lexical';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Undo,
  Redo
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();

  const toolbarItems = [
    {
      icon: Bold,
      command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold'),
      label: 'Bold'
    },
    {
      icon: Italic,
      command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic'),
      label: 'Italic'
    },
    {
      icon: Underline,
      command: () => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline'),
      label: 'Underline'
    },
    null, // separator
    {
      icon: Heading1,
      command: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'h1'),
      label: 'Heading 1'
    },
    {
      icon: Heading2,
      command: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'h2'),
      label: 'Heading 2'
    },
    null, // separator
    {
      icon: List,
      command: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'bullet'),
      label: 'Bullet List'
    },
    {
      icon: ListOrdered,
      command: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'number'),
      label: 'Numbered List'
    },
    null, // separator
    {
      icon: AlignLeft,
      command: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left'),
      label: 'Align Left'
    },
    {
      icon: AlignCenter,
      command: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center'),
      label: 'Align Center'
    },
    {
      icon: AlignRight,
      command: () => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right'),
      label: 'Align Right'
    },
    null, // separator
    {
      icon: Undo,
      command: () => editor.dispatchCommand(UNDO_COMMAND),
      label: 'Undo'
    },
    {
      icon: Redo,
      command: () => editor.dispatchCommand(REDO_COMMAND),
      label: 'Redo'
    }
  ];

  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b bg-white p-2">
      {toolbarItems.map((item, index) => 
        item ? (
          <Button
            key={index}
            variant="ghost"
            size="icon"
            onClick={item.command}
            title={item.label}
          >
            <item.icon className="h-4 w-4" />
          </Button>
        ) : (
          <div key={index} className="h-6 w-px bg-gray-200" />
        )
      )}
    </div>
  );
}