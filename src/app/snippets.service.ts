import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SnippetModel} from "./snippet.model";
import {Observable} from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SnippetsService {
  constructor(private http: HttpClient) {
  }

  get(id: string): Observable<SnippetModel> {
    const url = BaseURL + "/" + id
    console.log(url)
    return this.http.get<SnippetModel>(url)
  }

  post(snippet: SnippetModel): Observable<PostResponse> {
    return this.http.post<PostResponse>(BaseURL, snippet)
  }
}

export const BaseURL: string = environment.baseUrl

export interface PostResponse {
  URL: string
}

