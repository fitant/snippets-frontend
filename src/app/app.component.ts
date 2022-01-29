import {Component, Injectable, OnInit} from '@angular/core';
import {DefaultEditorOptions, EditorOptions, EditorStates} from "./app-editor.model";

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

  handleEditorSwitch($event: EditorStates) {
    switch ($event) {
      case EditorStates.ReadOnly:
        this.showReadOnlyEditor = true
        break
      case  EditorStates.ReadWrite:
        this.showReadOnlyEditor = false
        break
    }
  }

  onUpdateEditorOptions($event: EditorOptions) {
    // Update editor options then update read only
    // And rw editor options
    this.editorOptions = $event
    this.showReadOnlyEditor = this.editorOptions.readOnly
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
