import {Component, Injectable} from '@angular/core';
import {DefaultEditorOptions, EditorOptions} from "./app-editor.model";
import {EmptySnippet, SnippetAction, SnippetMetadataModel, SnippetModel} from './snippet.model'
import {SnippetsService} from "./snippets.service";
import {AfterViewChecked} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
@Injectable()
export class AppComponent implements AfterViewChecked {
  title = 'xBin';
  snippet: SnippetModel = EmptySnippet

  editorOptions: EditorOptions = DefaultEditorOptions;
  readOnlyEditorOptions: EditorOptions = {
    ...DefaultEditorOptions,
    readOnly: true
  };
  readWriteEditorOptions: EditorOptions = {
    ...DefaultEditorOptions,
    readOnly: false
  };

  constructor(private service: SnippetsService, private route: ActivatedRoute) {
  }

  handleAction(action: SnippetAction): void {
    console.log("Calling API", this.snippet)
    if (action === SnippetAction.save) {
      this.service.post(this.snippet).subscribe(data => {
        console.log(data.URL)
      })
    }
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

  ngAfterViewChecked() {
    console.log(this.route.url)
  }

  onUpdateSnippetMetadata($event: SnippetMetadataModel) {
    this.snippet.metadata = $event
  }
}