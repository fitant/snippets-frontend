import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {EditorOptions, DefaultEditorOptions} from '../app-editor.model'
import {EmptySnippet, SnippetAction, SnippetMetadataModel, SnippetModel} from "../snippet.model";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.sass']
})
export class MenubarComponent implements OnInit {
  @Input() snippet: SnippetModel = EmptySnippet;
  @Output() editorOptions = new EventEmitter<EditorOptions>();
  @Output() snippetMetadata = new EventEmitter<SnippetMetadataModel>();
  @Output() triggerAction = new EventEmitter<SnippetAction>();

  themes: string[] = [
    'vs',
    'vs-dark',
    'hc-black'
  ]
  selectedTheme: string = DefaultEditorOptions.theme;

  private sort = (a: string, b: string) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  private smallList: string[] = [
    'markdown',
    'plaintext',
    'javascript',
    'python',
    'c++'
  ].sort(this.sort)
  private largeList: string[] = [
    ...this.smallList,
    'typescript',
    'css',
    'less',
    'scss',
    'json',
    'html',
    'xml',
    'php',
    'c#',
    'razor',
    'diff',
    'java',
    'vb',
    'coffeescript',
    'handlebars',
    'pug',
    'f#',
    'lua',
    'powershell',
    'ruby',
    'sass',
    'r'
  ].sort(this.sort)
  languages = this.smallList
  selectedLanguage: string = EmptySnippet.metadata.language;
  private showAll: boolean = false;
  ephemeral: boolean = this.snippet.metadata.ephemeral;
  fontSize: number = DefaultEditorOptions.fontSize
  constructor() {
  }

  onChange() {
    this.editorOptions.emit({
      theme: this.selectedTheme,
      language: this.selectedLanguage,
      fontSize: this.fontSize,
    })
    this.snippetMetadata.emit({
      language: this.selectedLanguage,
      ephemeral: this.ephemeral
    })
  }

  swapList(): void {
    this.showAll = !this.showAll
    if (this.showAll) {
      this.languages = this.largeList
    } else {
      this.languages = this.smallList
    }
  }

  onChangeFont(fontSize: string): void {
    this.fontSize = parseInt(fontSize)
    this.onChange()
  }

  onSave(): void {
    this.triggerAction.emit(
      SnippetAction.save
    )
  }

  onEdit(): void {
    this.triggerAction.emit(
      SnippetAction.edit
    )
  }

  toggleEphemeral(): void {
    this.ephemeral = !this.ephemeral
  }

  ngOnInit(): void {
  }
}
