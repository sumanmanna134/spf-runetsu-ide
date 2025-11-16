import { Editor, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { LANGUAGE_CONFIG } from "../_constant";
interface CodeEditorProps {
    language: string,
    theme: string,
    fontSize: number,
    onEditorChange: (value: string | undefined) => void
    onMountEditor: (editor: editor.IStandaloneCodeEditor) => void;
    defineMonacoThemes: (monaco: Monaco) => void;
    isPro: boolean
}

const CodeEditor: React.FC<CodeEditorProps> = ({ language, theme, fontSize, onEditorChange, onMountEditor, defineMonacoThemes, isPro }) => {
    return (
        <Editor
            height="700px"
            loading
            language={LANGUAGE_CONFIG[language].monacoLanguage}
            onChange={onEditorChange}
            theme={theme}
            beforeMount={defineMonacoThemes}
            onMount={(editor: editor.IStandaloneCodeEditor) => onMountEditor(editor)}
            options={{
                minimap: { enabled: isPro ? true : false },
                fontSize,
                quickSuggestions: isPro,
                suggestOnTriggerCharacters: isPro,
                wordBasedSuggestions: isPro?"allDocuments":"off",
                snippetSuggestions: isPro ? "inline" : "none",
                suggest: isPro
                    ? {}
                    : {
                        showWords: false,
                        showSnippets: false,
                        showMethods: false,
                        showFunctions: false,
                        showConstructors: false,
                        showFields: false,
                        showVariables: false,
                        showClasses: false,
                        showStructs: false,
                        showInterfaces: false,
                        showEvents: false,
                        showOperators: false,
                        showUnits: false,
                        showValues: false,
                        showConstants: false,
                        showEnums: false,
                        showEnumMembers: false,
                        showKeywords: false,
                        showModules: false,
                        showProperties: false,
                        showTypeParameters: false,
                        showIssues: false,
                    },
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                tabCompletion: "on",
                parameterHints: { enabled: isPro ? true : false },
                acceptSuggestionOnEnter: "smart",
                formatOnPaste: isPro ? true : false,
                formatOnType: isPro ? true : false,
                autoIndent: isPro ? "advanced" : "none",
                detectIndentation: true,
                hideCursorInOverviewRuler: true,
                folding: true,
                showFoldingControls: "mouseover",
                foldingStrategy: "auto",
                codeLens: isPro ? true : false,
                domReadOnly: true,
                accessibilitySupport: "auto",
                dragAndDrop: isPro ? true : false,
                suggestSelection: "recentlyUsedByPrefix",
                roundedSelection: true,
                scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                },
            }}
        />
    )
}

export default CodeEditor;

