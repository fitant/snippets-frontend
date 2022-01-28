export interface SnippetModel {
  metadata: SnippetMetadataModel
  data: {
    snippet: string
  }
}

export enum SnippetAction {
  save,
  edit
}

export interface SnippetMetadataModel {
  id?: string
  language: string
  ephemeral: boolean
  createdOn?: number
  viewCount?: number
}

export const EmptySnippet: SnippetModel = {
  metadata: {
    language: "plaintext",
    ephemeral: true
  },
  data: {
    snippet: ''
  }
}
