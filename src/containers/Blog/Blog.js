import React, { Component } from "react";
import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from '../../axios';

class Blog extends Component {

  state = {
    posts: [],
    selectedId:null,
    isError:false
  };

  componentDidMount() {
    axios.get("/posts").then((res) => {
      const posts = res.data.slice(0, 4);
      const updatedPosts = posts.map((p) => {
        return {
          ...p,
          author: "Max",
        };
      });
      this.setState({ posts: updatedPosts });
    })
    .catch(error => {
        console.log(error);
        this.setState({isError:true})
    })
  }

  postSelectedHandler = (id) => {
    this.setState({selectedId:id});
  }

  render() {

    let posts = <p>something went wrong!!</p>

    if(!this.state.isError){
        posts = this.state.posts.map((post) => {
            return (
              <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postSelectedHandler(post.id)}
              />
            );
          });
    }
    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedId}/>
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
