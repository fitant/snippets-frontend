import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmptySnippet, SnippetModel} from "./snippet.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SnippetsService {
  private baseURL: string = "http://127.0.0.1:8080/snippets"

  constructor(private http: HttpClient) {
  }

  get(id: string): Observable<SnippetModel> {
    // if (id === undefined) {
    //   return new Observable(subscriber => {
    //     subscriber.next(EmptySnippet)
    //   })
    // }
    const url = this.baseURL + "/" + id
    console.log(url)
    return this.http.get<SnippetModel>(url)
  }

  post(snippet: SnippetModel): Observable<PostResponse> {
    return this.http.post<PostResponse>(this.baseURL, snippet)
  }
}

export interface PostResponse {
  URL: string
}

