// app/admin/articles/LexicalEditor.tsx
'use client'
import { FC, useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { ListNode, ListItemNode } from '@lexical/list';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { LinkNode } from '@lexical/link';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { EditorState } from 'lexical';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Loader2 } from 'lucide-react';
import { Article, ArticleFormData } from '@/types';

interface LexicalEditorProps {
  article?: Article;
  onSave: (data: ArticleFormData) => Promise<void>;
  onCancel: () => void;
}

const editorConfig = {
  namespace: 'health-blog-editor',
  onError: (error: Error) => console.error(error),
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    LinkNode
  ]
};

const LexicalEditor: FC<LexicalEditorProps> = ({ article, onSave, onCancel }) => {
  const [title, setTitle] = useState<string>(article?.title || '');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [editor] = useLexicalComposerContext();

  const handleSave = async (editorState: EditorState) => {
    setIsSaving(true);
    try {
      await onSave({
        title,
        content: editorState.toJSON(),
        status: article?.status || 'draft'
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title"
            className="text-xl font-bold"
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <LexicalComposer initialConfig={editorConfig}>
          <div className="relative min-h-[500px] w-full border rounded-lg">
            <ToolbarPlugin />
            <div className="bg-white">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="min-h-[500px] px-4 py-2 outline-none" />
                }
                placeholder={
                  <div className="absolute top-[72px] left-4 text-gray-400">
                    Start writing your article...
                  </div>
                }
                ErrorBoundary={({ children }) => (
                  <div className="p-4 text-red-500">
                    <p>Something went wrong:</p>
                    {children}
                  </div>
                )}
              />
              <HistoryPlugin />
              <AutoFocusPlugin />
              <MarkdownShortcutPlugin />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              onClick={() => {
                
                const editorState = editor.getEditorState();
                handleSave(editorState);
              }}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Article'
              )}
            </Button>
          </div>
        </LexicalComposer>
      </CardContent>
    </Card>
  );
};

export default LexicalEditor;