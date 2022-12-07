import React, {Component} from "react";

class ReadContent extends Component{
    render(){
      // this.props.title = "hi";

      console.log("ReadContent render");
      return(
        <article>
            <h2>{this.props.title}</h2>        
            {this.props.desc}
        </article>
      );
    }
  }

export default ReadContent;