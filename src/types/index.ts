import { Id } from "../../convex/_generated/dataModel";
import { THEMES } from "@/app/(root)/_constant";
import type * as monaco from "monaco-editor"; 
type ICodeEditorInstance = monaco.editor.IStandaloneCodeEditor; 

export interface Theme {
    id: string,
    label: string,
    color: string
}

export interface Language{
    id: string,
    label: string,
    logoPath: string,
    monacoLanguage: string,
    defaultCode: string,
    pistonRuntime: LanguageRuntime
}

export interface LanguageRuntime {
  language: string;
  version: string;
}

export interface ExecuteCodeResponse {
  compile?: {
    output: string;
  };
  run?: {
    output: string;
    stderr: string;
  };
}

export interface ExecutionResult {
  code: string;
  output: string;
  error: string | null;
}


export interface CodeEditorState {
  language: string;
  output: string;
  isRunning: boolean;
  error: string | null;
  theme: string | undefined;
  fontSize: number | 16;
  editor: ICodeEditorInstance | null;
  executionResult: ExecutionResult | null;

  setEditor: (editor: ICodeEditorInstance) => void;
  getCode: () => string;
  setLanguage: (language: string) => void;
  setTheme: (theme: string) => void;
  setFontSize: (fontSize: number) => void;
  runCode: () => Promise<void>;
}
export interface Snippet {
  _id: Id<"snippets">;
  _creationTime: number;
  userId: string;
  language: string;
  code: string;
  title: string;
  userName: string;
}

export const DEFAULT_EDITOR_CONFIG={
    language: "javascript",
    fontSize: 16,
    theme: THEMES[0].id,
    GET_EDITOR_LANGUAGE: "editor-language",
    GET_EDITOR_THEME: "editor-theme",
    GET_EDITOR_FONT_SIZE: "editor-font-size",

    
}