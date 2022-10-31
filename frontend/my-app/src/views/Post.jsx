import React, {Component} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem, InputLabel,Checkbox, FormControlLabel } from '@mui/material';
import HomeNavbar from './../components/Navbar/HomeNavbar'
import { Link } from "react-router-dom";
import "./Post.css";
import axios from "axios";

import FormData from 'form-data';

const base_url = "http://127.0.0.1:8000";
const userID = "1111111111";
// const userID = localStorage.getItem('userID');
// localStorage.getItem(userID);
// Post
const initState = {
  type:"post",
  title:"",
  //  where did you get this post from?
  //  "source":"http://lastplaceigotthisfrom.com/posts/yyyyy",
  //  where is it actually from
  //  "origin":"http://whereitcamefrom.com/posts/zzzzz",
  // source:"auto",
  // origin:"auto",
  // id:`${base_url}/authors/${userID}/posts/` ,
  description:"" ,
  // comments:"",
  contentType:"text/plain",
  content:"",
  categories:"web" ,
  // published: false,
  visibility:"PUBLIC",
  unlisted: false,
};
let data = new FormData()

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = async (e) => {
    e.preventDefault();
    // if(this.state.title){
    //   data.append('title', this.state.title)
    // }
    // make sure every Post has a title
    if (!this.state.title) {
      return this.setState({
        flash: { status: "is-danger", msg: "*Title cannot be blank!"},
      })}
      axios
        .post(base_url+'/authors/'+userID+'/posts/' , data)
      this.props.toggle();
    };
  
  /*error message handler*/
  handleChange = (e) =>{
    data.append([e.target.name], e.target.value)
    this.setState({ [e.target.name]: e.target.value, error: "" });
  }
  handleCheckBox = (e) =>
    this.setState({ [e.target.name]: e.target.checked, error: "" });

  // handle close
  handleClick = () => {
   this.props.toggle();
  };


  render() {
    const {
      title,
      // source,
      // origin,
      description,
      contentType,
      content,
      categories,
      // published,
      visibility,
      unlisted,
    } = this.state;
    return (
    <div>
      <div className='bar'>
        <HomeNavbar />
      </div>
      <div className='split Home'>
        <Link to={`./../`} className="back">x</Link>
        <div className='container'>
          <form className='post_information' onSubmit={this.save}>
            <div className='user_input'>
              
              <div className='label'>
                <label className='hint'>Title：</label>
                  <input
                    placeholder='Enter title here'
                    className='title-input'
                    name='title'
                    type="text"
                    defaultValue={title}
                    onChange={this.handleChange}
                />
              </div>
              <div className='label'>
                <label className='hint'>Description：</label>
                  <textarea
                    placeholder='Give a brief description'
                    className='description-input'
                    name='description'
                    type="textarea"
                    value={description}
                    onChange={this.handleChange}
                  />
              </div>
              <div className='label'>
                <label className='hint'>Content：</label>
                  <textarea
                    placeholder='What&apos;s happening?'
                    className='content-input'
                    name='content'
                    type="textarea"
                    value={content}
                    onChange={this.handleChange}
                  />
              </div>
              <Box className='label' sx={{ minWidth: 120}}>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="simple-select-label">Content Type</InputLabel>
                  <Select
                    name="contentType"
                    value={contentType}
                    onChange={this.handleChange}
                  >
                  <MenuItem value={"text/plain"}>Plain</MenuItem>
                  <MenuItem value={"text/markdown"}>Markdown</MenuItem>
                  <MenuItem value={"application/base64"}>Application</MenuItem>
                  <MenuItem value={"image/png;base64"}>PNG</MenuItem>
                  <MenuItem value={"image/jpeg;base64"}>JPEG</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box className='label' sx={{ minWidth: 120 }}>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                <InputLabel id="simple-select-label">Visibility</InputLabel>
                <Select
                  name="visibility"
                  value={visibility}
                  onChange={this.handleChange}
                >
                <MenuItem value={"PUBLIC"}>Public</MenuItem>
                <MenuItem value={"FRIENDS"}>Friend Only</MenuItem>
                </Select>
                </FormControl>
              </Box>
              <Box className='checkbox-label' sx={{ minWidth: 120}}>
                <FormControlLabel
                  label="Unlisted"
                  control={
                  <Checkbox 
                  name = "unlisted" 
                  checked = {unlisted} 
                  onChange={this.handleCheckBox} 
                  />
                }/>
              </Box>
            {this.state.flash && (
            <div className='flash'>
            <div className={`notification ${this.state.flash.status}`}>
              {this.state.flash.msg}
            </div>
            </div>
             )}
            <div className="field is-clearfix">
              <Link to={`./../`} class="btn" onClick={this.save}>
                Submit
              </Link>
            </div>
            </div>
            </form>
            </div>
            </div>
            </div>
    );
 }
}
    

  
  