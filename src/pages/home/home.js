import React from "react";
import { Link } from "react-router-dom";
import { map, Observable } from "rxjs";
import { NewsPost } from "../../shared/header/news-post/news-post";
import "./home.css";

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lodestoneDataRXJS: [],
      isPageLoaded: false,
    };
  }

  createObservable() {
    const data = new Observable((observer) => {
      fetch("https://lodestonenews.com/news/topics")
        .then((response) => response.json()) // or text() or blob() etc.
        .then((json) => {
          observer.next(json);
          observer.complete();
        })
        .catch((err) => observer.error(err));
    });
    return data;
  }

  componentDidMount() {
    this.createObservable()
      .pipe(
        map((e) => {
          e = e.splice(0, 9);
          e.forEach((el) => {
            const localTime = new Date(el.time).toLocaleString();
            el.time = localTime;
          });
          return e;
        })
      )
      .subscribe((data) => {
        console.log(data);
        this.setState({
          lodestoneDataRXJS: data,
          isPageLoaded: true,
        });
      });
  }

  generateNewsPosts() {
    return this.state.lodestoneDataRXJS.map((e) => (
      <NewsPost lodestoneDataRXJSn={e} />
    ));
  }

  render() {
    if (this.state.isPageLoaded === true) {
      return (
        <div className="home">
          <div className="news-flex-container">{this.generateNewsPosts()}</div>
          <Link to="/testPage">
            <button>To Test Page</button>
          </Link>
        </div>
      );
    }
  }
}

// https://stackoverflow.com/questions/44877062/how-to-convert-a-fetch-api-response-to-rxjs-observable
