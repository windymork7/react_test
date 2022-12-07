import React, { Component} from 'react';
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import Control from "./components/Control";
// import logo from './logo.svg';
import './App.css';
import CreateContent from './components/CreateContent';
import UpdateContent from "./components/UpdateContent";

class App extends Component{
  constructor(props){
    super(props);
    this.max_content_id = 3;
      this.state = {
        mode:"read",
        selected_content_id: 2,
        subject:{title:'WEB', sub:"World Wide Web!"},
        welcome:{title:"Welcome", desc:"Hello, React!!"},
        contents:[
          {id:1, title:"HTML", desc:"HTML is for information"},
          {id:2, title:"CSS", desc:"CSS is for design"},
          {id:3, title:"Javascript", desc:"JavaScript is for interactive"}
        ]
      }
  }

  getReadContent(){
    console.log("getReadContent")
    var i = 0;
    while(i < this.state.contents.length){
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      i = i + 1;
    }
  }

  getContent(){
    var _title, _desc, _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === "read"){
      var _content = this.getReadContent();  
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode === "create"){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          contents:_contents
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    } else if(this.state.mode === "update"){
      var _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id+1;
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          contents:_contents
        });
        console.log(_title, _desc);
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }

  render(){
    var _title, _desc, _article, _contents = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === "read"){
      // _title = this.state.contents[0].title;
      // _desc = this.state.contents[0].desc;
      var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id){
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === "create"){
      _article = <CreateContent onSubmit={function(_title, _desc){
        this.max_content_id = this.max_content_id + 1;
        // var _contents = this.state.contents.concat(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        // _contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );
        var newContents = Array.from(this.state.contents);
        newContents.push({id:this.max_content_id, title:_title, desc:_desc});
        this.setState({
          contents:newContents
        });
        console.log(_title, _desc);
      }.bind(this)}></CreateContent>
    } 
    return (
      <div className='App'>
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:"welcome"});
          }.bind(this)}
        ></Subject>
        {/* <subject title="react" sub="for ui!"></subject> */}
        {/* <header>
          <h1><a href="/" onClick={function(e){
            console.log(e);
            e.preventDefault();
            this.setState({ mode : "welcome"});
            }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header> */}
        <TOC
          onChangePage={function(id){
            // debugger;
            this.setState({
               mode : "read"
              ,selected_content_id:Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control onChangeMode={function(_mode){
          this.setState({
            mode:_mode
          })
        }.bind(this)}></Control>
        {this.getContent()}
        {/* <ReadContent title={_title} desc={_desc}></ReadContent> */}
      </div>
    );
  }
}


export default App;