import React, {Component} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import "./Post.css";

// Post
const initState = {
  title: "",
  description: "",
};

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  save = async (e) => {
    e.preventDefault();
    const {
      title,
      description,
    } = this.state;
    // make sure every Post has a title
    if (!title) {
      this.setState({
        flash: { status: "is-danger", msg: "*Title cannot be blank!"},
      });
    }else{
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
      this.props.toggle();
    }
  };
  
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
      description,
      privacy,
    } = this.state;
    return (
      <form className='post_information' onSubmit={this.save}>
        <span className="close" onClick={this.handleClick}>&times;</span>
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
            <div>
            <Box className='label' sx={{ minWidth: 120 }}>
            <FormControl Halfwidth>
            <NativeSelect
              defaultValue='everyone'
              label="Privacy"
              value = {privacy}
            >
            <option value='everyone'>Public</option>
            <option value='friends'>Friends</option>
            <option value='only_me'>Only Me</option>
            </NativeSelect>
            </FormControl>
            </Box>
            </div>
            {this.state.flash && (
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
            </div>
            
            </div>
            
            </form>
    );
 }
}
    

  
  