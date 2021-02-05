import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs";

@Injectable({
    'providedIn': 'root'
})
export class AppService{
    private NewsUrl = 'https://test.spaceflightnewsapi.net/api/v2/articles?_limit=5&_start=';
    private BlogsUrl = 'https://test.spaceflightnewsapi.net/api/v2/blogs?_limit=5&_start=';
    startNews = 0;
    startBlogs = 0;

    constructor(
        private http: HttpClient
    ){}
 
    getNews(): Observable<any>{
        return this.http.get(`${this.NewsUrl}${this.startNews}`);
    }

    getBlogs(): Observable<any>{
        return this.http.get(this.BlogsUrl + this.startBlogs);
    }
}