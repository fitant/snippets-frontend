import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DefaultEditorOptions, EditorOptions} from '../app-editor.model'
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
  @Input() readOnlyEditor: boolean = false;
  @Output() readOnlyEditorChange = new EventEmitter<boolean>();

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

  loading: boolean = false

  // Snippet
  snippet: SnippetModel = EmptySnippet

  constructor(private service: SnippetsService, private router: Router) {
  }

  isThemeSelected = (theme: string): boolean => {
    return theme === this.selectedTheme
  }

  onChange = () => {
    this.editorOptions.emit({
      theme: this.selectedTheme,
      language: this.snippet.metadata.language,
      fontSize: this.fontSize,
    })
  }

  swapList = (): void => {
    this.showAll = !this.showAll
    this.languages = this.showAll ? this.largeList : this.smallList
  }

  onChangeFont = (fontSize: string): void => {
    localStorage.setItem("fontSize", fontSize)
    this.fontSize = parseInt(fontSize)
    this.onChange()
  }

  onChangeTheme = (theme: string) => {
    localStorage.setItem("theme", theme)
    this.selectedTheme = theme
    this.onChange()
  }

  onSave = (): void => {
    this.snippet.data.snippet = this.snippetData
    if (this.snippet.data.snippet == "") {
      return
    }
    this.loading = true
    this.service.post(this.snippet).subscribe(data => {
      const urlParts = data.URL.split('/')
      const id = urlParts[urlParts.length - 1]
      this.snippet.metadata.id = id
      this.router.navigate(['/' + id]).then(() => {
          this.toggleEditor(true)
        }
      );
      this.loading = false
    })
  }

  onEdit = (): void => {
    this.router.navigate(['/']).then(() => {
      this.toggleEditor(false)
      this.snippet.metadata.id = ""
    });
  }

  loadSnippet = () => {
    const paths = window.location.pathname.split('/')
    const id = paths[paths.length - 1]
    if (id != "") {
      this.service.get(id).subscribe(snippet => {
          this.snippet = snippet
          this.snippetDataChange.emit(snippet.data.snippet)
          // Trigger Editor Options update
          // Updates Language and readOnly state
          this.onChange()
          this.toggleEditor(true)
        }, error => {
          switch (error.status) {
            case 404:
              this.snippetDataChange.emit("Error 404: Not Found")
              break
            case 500:
              this.snippetDataChange.emit("An Internal Server Error Occurred while loading data")
          }
        }
      )
    }
  }

  goHome = () => {
    const location = window.location.href.toString().split('/')
    window.location.href = location[0] + "//" + location[2]
  }

  toggleEditor = (readOnly: boolean) => {
    readOnly ? this.readOnlyEditorChange.emit(true) : this.readOnlyEditorChange.emit(false)
  }

  ngOnInit(): void {
    const theme = localStorage.getItem("theme")
    if (theme !== null) {
      this.selectedTheme = theme
    }

    const fontSize = localStorage.getItem("fontSize")
    if (fontSize !== null) {
      this.fontSize = parseInt(fontSize)
    }

    this.onChange()
    this.loadSnippet()
  }
}
