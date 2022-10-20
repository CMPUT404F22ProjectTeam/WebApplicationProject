import React, {Component} from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import "./Post.css";

const initState = {
  title: "",
  description: "",
  status:[],
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

    if (!title) {
      this.setState({
        flash: { status: "is-danger", msg: "Title cannot be blank!"},
      });
    }else{
      this.props.toggle();
    }
  };
  
  /*error message handler*/
  handleChange = (e) =>
    this.setState({ [e.target.name]: e.target.value, error: "" });

  handleClick = () => {
   this.props.toggle();
  };

  render() {
    const {
      title,
      description,
    } = this.state;
    return (
      <form className='post_information' onSubmit={this.save}>
        <span className="close" onClick={this.handleClick}>
            &times;
          </span>
            <div className='label'>Title：
                <input
                    placeholder='Enter title here'
                    className='title-input'
                    name='title'
                    type="text"
                    value={title}
                    onChange={this.handleChange}
                />
            </div>
            <div className='label'>Description：
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
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Privacy"
            >
            <option value='everyone'>Public</option>
            <option value='friends'>Friends</option>
            <option value='only_me'>Only Me</option>
            </NativeSelect>
            </FormControl>
            </Box>
            {/* keep this version
            use button to select privacy
            <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="public"
              name="radio-buttons-group"
             >
            <FormControlLabel value="public" control={<Radio />} label="Public" />
            <FormControlLabel value="private" control={<Radio />} label="Private" />
            </RadioGroup>
            </FormControl> */}
            </div>
            {this.state.flash && (
            <div className={`notification ${this.state.flash.status}`}>
              {this.state.flash.msg}
            </div>
             )}
            <div className="field is-clearfix">
              <button className="button" type="submit" onClick={this.save}>
                Submit
              </button>
            </div>
            </form>
    );
 }
}
    

  
  