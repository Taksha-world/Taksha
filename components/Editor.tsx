"use client";

import { useCallback, useState } from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
}

export default function CodeEditor({ code, onChange, language }: CodeEditorProps) {
  const [isReady, setIsReady] = useState(false);

  const handleMount = useCallback(() => {
    setIsReady(true);
  }, []);

  const handleChange = useCallback(
    (value: string | undefined) => {
      if (value !== undefined) {
        onChange(value);
      }
    },
    [onChange]
  );

  return (
    <div className="relative h-full w-full overflow-hidden">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e] z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 rounded-full border-2 border-amber-500/30 border-t-amber-500 animate-spin" />
            <span className="text-sm text-stone-500">Loading editor...</span>
          </div>
        </div>
      )}
      <Editor
        height="100%"
        language={language === "HTML" ? "html" : language === "CSS" ? "css" : "javascript"}
        value={code}
        onChange={handleChange}
        onMount={handleMount}
        theme="vs-dark"
        options={{
          fontSize: 14,
          fontFamily: "'Geist Mono', 'Fira Code', 'JetBrains Mono', monospace",
          fontLigatures: true,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          padding: { top: 16, bottom: 16 },
          lineNumbers: "on",
          renderLineHighlight: "gutter",
          cursorBlinking: "smooth",
          smoothScrolling: true,
          bracketPairColorization: { enabled: true },
          wordWrap: "on",
          tabSize: 2,
          autoIndent: "full",
          formatOnPaste: true,
          suggestOnTriggerCharacters: true,
          overviewRulerBorder: false,
          hideCursorInOverviewRuler: true,
          scrollbar: {
            verticalScrollbarSize: 6,
            horizontalScrollbarSize: 6,
          },
        }}
      />
    </div>
  );
}
