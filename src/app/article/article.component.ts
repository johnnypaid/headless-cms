import { Component, OnInit } from '@angular/core';
import { ContentService } from '../service/content.service';



@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  contents = [];
  articleContent = [];

  constructor(private mainContent: ContentService) { }

  ngOnInit(): void {
    this.contents = this.mainContent.getPageContent();
    const contLength = this.contents.length;

    for (let i = 0; i < contLength; i++) {
      if (this.contents[i].name === 'Article') {
        this.articleContent.push(this.contents[i].contents);
      }
    }
    this.articleContent = this.articleContent[0];
  }
}
