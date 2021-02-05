import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hideMenu = true;
  news = true;
  newsResults = [];
  blogsResults = [];
  content = [];

  constructor(
    private homeService: AppService
  ) { }

  ngOnInit(){
    this.getNews();
    this.getBlogs();
  }

  onScroll(){
    if(this.news)
    this.getNews();
    else
    this.getBlogs();
  }

   getNews(){
    this.homeService.getNews()
    .pipe(take(1))
    .subscribe(
      res => {
       // console.log(res);
        for(let i = 0; i<res.length; i++){
          this.newsResults.push(res[i]);
          this.content.push(res[i]);
        }
        this.homeService.startNews += 5;
      }
    )
   }

   getBlogs(){
     this.homeService.getBlogs()
                     .pipe(take(1))
                     .subscribe(
                       res => {
                        for(let i = 0; i<res.length; i++){
                          this.blogsResults.push(res[i]);
                          this.content.push(res[i]);
                        }
                        this.homeService.startBlogs += 5;
                       }
                     )
   }


  setNews(){
    this.news = true;
    this.content = this.newsResults;
  }

setBlogs(){
  this.news = false;
  this.content = this.blogsResults;
}

}
