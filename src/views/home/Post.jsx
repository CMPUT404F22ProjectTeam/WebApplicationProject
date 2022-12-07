import React, { Component } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import HomeNavbar from './../../components/Navbar/HomeNavbar'
import {  Link } from "react-router-dom";
import "./Post.css";
import axios from "axios";

import FormData from 'form-data';

const base_url = process.env.REACT_APP_CURRENT_URL;
const userID = "1111111111";
// Post
const initState = {
  type: "post",
  title: "",
  //  where did you get this post from?
  //  "source":"http://lastplaceigotthisfrom.com/posts/yyyyy",
  //  where is it actually from
  //  "origin":"http://whereitcamefrom.com/posts/zzzzz",
  // source:"auto",
  // origin:"auto",
  // id:`${base_url}/authors/${userID}/posts/` ,
  description: "",
  // comments:"",
  contentType: "text/plain",
  content: "",
  categories: "web",
  // published: false,
  visibility: "PUBLIC",
  unlisted: false,
};
let data = new FormData()

class UploadImage extends React.Component {
  state = {
    file: null,
    base64URL: ""
  };

  getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

  handleFileInput = async e => {
    console.log(e.target.files[0]);
    let { file } = this.state;

    file = e.target.files[0];

    this.getBase64(file)
      .then(result => {
        file["base64"] = result;
        console.log(file);
        this.setState({
          base64URL: result,
          file
        });
        console.log(this.state)
        this.props.handleUpload(this.state.base64URL);
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      file: e.target.files[0]
    });

  };

  render() {
    return (
      <div>
        <input type="file" name="file" onChange={this.handleFileInput} />
      </div>
    );
  }
}

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }
  
  
  save = async (e) => {
    e.preventDefault();
    if (!this.state.title) {
      return this.setState({
        flash: { status: "is-danger", msg: "*Title cannot be blank!" },
      })
    }
    axios
      .post(base_url + '/authors/' + userID + '/posts/', data)
      .then((response)=>{
        console.log(response)
    })
  };

  /*error message handler*/
  handleChange = (e) => {
    data.append([e.target.name], e.target.value)
    this.setState({ [e.target.name]: e.target.value, error: "" });
  }
  handleCheckBox = (e) =>
    this.setState({ [e.target.name]: e.target.checked, error: "" });

  handleUpload = (value) => {
    this.setState((prevState, props) => {
      prevState.content = value;
      console.log(this.state.content)
      return prevState;
    });
  }

  handleContent = () => {
    if (this.state.contentType == "text/markdown" || this.state.contentType == "application/base64" || this.state.contentType == "text/plain") {
      return (
        <div className='label'>
          <label className='hint'>Content：</label>
          <textarea
            placeholder='What&apos;s happening?'
            className='content-input'
            name='content'
            type="textarea"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </div>)
    } else {
      return (
        <div className='label'>
          <label className='hint'>Content：</label>
          <UploadImage
            onChange={this.handleFileUpload}
          />
        </div>
      )
    }
  }

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
          <Link to={`./`} className="back">x</Link>
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
                {this.handleContent()}
                <Box className='label' sx={{ minWidth: 120 }}>
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
                <Box className='checkbox-label' sx={{ minWidth: 120 }}>
                  <FormControlLabel
                    label="Unlisted"
                    control={
                      <Checkbox
                        name="unlisted"
                        checked={unlisted}
                        onChange={this.handleCheckBox}
                      />
                    } />
                </Box>
                {this.state.flash && (
                  <div className='flash'>
                    <div className={`notification ${this.state.flash.status}`}>
                      {this.state.flash.msg}
                    </div>
                  </div>
                )}
                <div className="field is-clearfix">
                  <button className="btn" onClick={this.save}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}



