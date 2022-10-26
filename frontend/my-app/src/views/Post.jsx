import React, {Component} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem, InputLabel,Checkbox, FormControlLabel } from '@mui/material';
import HomeNavbar from './../components/Navbar/HomeNavbar'
import "./Post.css";
const base_url = process.env.REACT_APP_BASE_URL;
// Post
const initState = {
  type:"post",
  title:"",
  //  where did you get this post from?
  //  "source":"http://lastplaceigotthisfrom.com/posts/yyyyy",
  //  where is it actually from
  //  "origin":"http://whereitcamefrom.com/posts/zzzzz",
  source:"auto",
  origin:"auto",
  // id:`${base_url}/author/${userID}/posts/` ,
  description:"" ,
  comments:"",
  contentType:"text/plain",
  content:"",
  categories:[] ,
  published: false,
  visibility:"PUBLIC",
  unlisted: false,
};

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {initState}
    console.log(this.props)
  }

  // save = async (e) => {
  //   e.preventDefault();
  //   const {
  //     title,
  //     description,
  //   } = this.state;
  //   // make sure every Post has a title
  //   if (!title) {
  //     this.setState({
  //       flash: { status: "is-danger", msg: "*Title cannot be blank!"},
  //     });
  //   }else{
      // ----------TO DO---------
      // NEED MORE WORK ON STATE
      // save the Post
      // this.props.context.Post(
      //   {
      //     title,
      //     description,
      //   },
      //   () => this.setState(initState)
      // );
  //     this.props.toggle();
  //   }
  // };
  
  /*error message handler*/
  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  // handle close
  handleClick = () => {
   this.props.toggle();
  };

  render() {
    const {
      title,
      source,
      origin,
      description,
      contentType,
      content,
      categories,
      published,
      visibility,
      unlisted,
    } = this.state;
    return (
    <div>
      <div className='bar'>
        <HomeNavbar />
      </div>
      <div className='split Home'>
        <span className="back" onClick={this.handleClick}>&times;</span>
        <div className='container'>
          {/* <form className='post_information' onSubmit={this.save}> */}
            <div className='user_input'>
              
              <div className='label'>
                <label className='hint'>Title：</label>
                  <input
                    placeholder='Enter title here'
                    className='title-input'
                    name='title'
                    type="text"
                    value={title}
                    onChange={this.handleChange}
                />
              </div>
              <div className='label'>
                <label className='hint'>Description：</label>
                  <textarea
                    placeholder='What&apos;s happening?'
                    className='description-input'
                    name='description'
                    type="textarea"
                    value={description}
                    onChange={this.handleChange}
                  />
              </div>
              <Box className='label' sx={{ minWidth: 120}}>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="simple-select-label">Content Type</InputLabel>
                  <Select
                    name="contentType"
                    value={contentType}
                    onChange={this.handleForm}
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
                  onChange={this.handleForm}
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
                  // onChange={handleCheckBox} 
                  />
                }/>
              </Box>
            {/* {this.state.flash && (
            <div className='flash'>
            <div className={`notification ${this.state.flash.status}`}>
              {this.state.flash.msg}
            </div>
            </div>
             )}
            <div className="field is-clearfix">
              <button class="btn" type="submit" onClick={this.save}>
                Submit
              </button>
            </div> */}
            </div>
            </div>
            </div>
            </div>
    );
 }
}
    

  
  