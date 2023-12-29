// import React from "react";
import { useCallback, useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
// language
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import { RenderTree } from "../TreeView/MultiSelectTreeView";

function CodeEditor({
  selectedNode,
}: {
  selectedNode: RenderTree | undefined;
}) {
  const [value, setValue] = useState<string | undefined>(selectedNode?.content);
  const [language, setLanguage] = useState(javascript);

  useEffect(() => {
    const fileName = selectedNode?.name;
    if (!selectedNode?.isFolder) {
      if (
        fileName?.endsWith(".js") ||
        fileName?.endsWith(".ts") ||
        fileName?.endsWith(".tsx")
      ) {
        setLanguage(javascript({ jsx: true }));
      } else if (fileName?.endsWith(".py")) {
        setLanguage(python);
      }
      // Set default language to python for now
      else {
        setLanguage(python);
      }
    }
  }, [selectedNode]);

  const onChange = useCallback((val: any, viewUpdate: any) => {
    setValue(val);
  }, []);
  return (
    <CodeMirror
      value={selectedNode?.content}
      extensions={[language]}
      onChange={onChange}
      theme={vscodeDark}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        history: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        syntaxHighlighting: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }}
    />
  );
}
export default CodeEditor;
