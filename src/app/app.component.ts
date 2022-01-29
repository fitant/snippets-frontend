import {Component, Injectable, OnInit} from '@angular/core';
import {DefaultEditorOptions, EditorOptions} from "./app-editor.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
@Injectable()
export class AppComponent implements OnInit {
  title = 'xBin';
  snippetData: string = ''
  showReadOnlyEditor: boolean = false

  editorOptions: EditorOptions = DefaultEditorOptions;
  readOnlyEditorOptions: EditorOptions = {
    ...DefaultEditorOptions,
    readOnly: true
  };
  readWriteEditorOptions: EditorOptions = {
    ...DefaultEditorOptions,
    readOnly: false
  };

  constructor() {
  }

  onUpdateEditorOptions($event: EditorOptions) {
    // Update editor options then update read only
    // And rw editor options
    this.editorOptions = $event
    this.readWriteEditorOptions = {
      ...this.editorOptions,
      readOnly: false
    }
    this.readOnlyEditorOptions = {
      ...this.editorOptions,
      readOnly: true
    }
  }

  ngOnInit() {
  }
}
