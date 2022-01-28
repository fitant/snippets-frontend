import {EmptySnippet} from "./snippet.model";

export interface EditorOptions {
  theme: string
  language: string
  readOnly: boolean
  fontSize: number
}

export const DefaultEditorOptions = {
  theme: "vs-dark",
  language: EmptySnippet.metadata.language,
  fontSize: 16,
  readOnly: false
}

export enum EditorStates {
  ReadOnly,
  ReadWrite
}
