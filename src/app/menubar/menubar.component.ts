import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DefaultEditorOptions, EditorOptions, EditorStates} from '../app-editor.model'
import {EmptySnippet, SnippetModel} from "../snippet.model";
import {list, smallList} from "./menubar-consts.component";
import {SnippetsService} from "../snippets.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.sass']
})
export class MenubarComponent implements OnInit {
  @Input() snippetData: string = ''
  @Output() snippetDataChange: EventEmitter<string> = new EventEmitter<string>()
  @Output() editorOptions = new EventEmitter<EditorOptions>();
  @Output() editorSelection = new EventEmitter<EditorStates>();

  // Editor Related
  themes: string[] = [
    'vs',
    'vs-dark',
    'hc-black'
  ]
  selectedTheme: string = DefaultEditorOptions.theme;
  fontSize: number = DefaultEditorOptions.fontSize

  // Menubar Related
  private smallList = smallList
  private largeList = list
  languages = this.smallList
  private showAll: boolean = false;

  // Snippet
  snippet: SnippetModel = EmptySnippet

  constructor(private service: SnippetsService, private router: Router) {
  }

  private isEditorReadOnly = (): boolean => {
    return this.snippet.metadata.id === ''
  }

  onChange = () => {
    this.editorOptions.emit({
      theme: this.selectedTheme,
      language: this.snippet.metadata.language,
      fontSize: this.fontSize,
      readOnly: this.isEditorReadOnly()
    })
  }

  swapList = (): void => {
    this.showAll = !this.showAll
    if (this.showAll
    ) {
      this.languages = this.largeList
    } else {
      this.languages = this.smallList
    }
  }

  onChangeFont = (fontSize: string): void => {
    this.fontSize = parseInt(fontSize)
    this.onChange()
  }

  onSave = (): void => {
    this.snippet.data.snippet = this.snippetData
    this.service.post(this.snippet).subscribe(data => {
      const urlParts = data.URL.split('/')
      const id = urlParts[urlParts.length - 1]
      this.snippet.metadata.id = id
      this.router.navigate(['/' + id]).then(() => {
          this.toggleEditor(true)
        }
      );
    })
  }

  onEdit = (): void => {
    this.router.navigate(['/']).then(() => {
      this.toggleEditor(false)
      this.snippet.metadata.id = ""
    });
    // Edit
  }

  toggleEphemeral = (): void => {
    this.snippet.metadata.ephemeral = !this.snippet.metadata.ephemeral
  }

  toggleEditor = (readOnly: boolean) => {
    readOnly ? this.editorSelection.emit(EditorStates.ReadOnly) : this.editorSelection.emit(EditorStates.ReadWrite)
  }

  ngOnInit(): void {
    const paths = window.location.pathname.split('/')
    const id = paths[paths.length - 1]
    if (id != "") {
      this.service.get(id).subscribe(snippet => {
          this.snippet = snippet
          this.snippetDataChange.emit(snippet.data.snippet)
          console.log(this.snippet)
          // Make Editor ReadOnly
          this.toggleEditor(true)
        }
      )
    }
  }
}
