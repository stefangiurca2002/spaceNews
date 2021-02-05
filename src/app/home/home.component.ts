import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  hideMenu = true;
  news = true;
  content = [];

  constructor(
    private homeService: AppService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){
    // if(this.news)
    // this.getNews();
    // else
    // this.getBlogs();
    this.route.url
    .pipe(take(1))
    .subscribe(res =>{ 
      this.news = res[0].path == "news";
      if(this.news && this.homeService.newsResults.length == 0)
      this.getNews();
      else if(this.homeService.blogsResults.length == 0)
      this.getBlogs();
      this.content = this.news ? this.homeService.newsResults : this.homeService.blogsResults;
    })
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
        console.log(res);
        for(let i = 0; i<res.length; i++){
          this.homeService.newsResults.push(res[i]);
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
                         console.log(res);
                        for(let i = 0; i<res.length; i++){
                          this.homeService.blogsResults.push(res[i]);
                          this.content.push(res[i]);
                        }
                        this.homeService.startBlogs += 5;
                       }
                     )
   }


  setNews(){
    this.news = true;
    this.content = this.homeService.newsResults;
  }

setBlogs(){
  if(this.homeService.blogsResults.length == 0)
  this.getBlogs();
  this.news = false;
  this.content = this.homeService.blogsResults;
}

}
