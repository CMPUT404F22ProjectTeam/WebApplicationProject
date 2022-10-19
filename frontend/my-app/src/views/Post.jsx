import React, {Component} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { Alert, FormGroup, FormControl } from '@mui/material';
import "./Post.css";

const initState = {
  title: "",
  description: "",
  pub_lic: true,
  pri_vate: false,
};

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  handleClick = () => {
   this.props.toggle();
  };

  render() {
    const {
      title,
      description,
      pub_lic,
      pri_vate,
    } = this.state;
    // To do:
    // public and private only can choose one in checked box
    const handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.checked,
      });
    };
    
    const error = [pub_lic,pri_vate].filter((v) => v).length !== 1;

    return (
      <div className='post_information'>
        <span className="close" onClick={this.handleClick}>
            &times;
          </span>
        <form>
            <div>
            <span className='label'>Title：</span>
                <input
                    placeholder='Enter title here'
                    className='title-input'
                    name='title'
                    value={title}
                    onChange={this.handleChange}
                />
            </div>
            <div>
            {/* To do:
            larger description text box */}
            <span className='label'>Description：</span>
                <input
                    placeholder='What&apos;s happening?'
                    className='description-input'
                    name='description'
                    value={description}
                    onChange={this.handleChange}
                />
            </div>
            <FormControl
            required
            error={error}
            component="fieldset"
            sx={{ m: 2 }}
            variant="standard"
            >
            <FormGroup>
            <div>
            <FormControlLabel
            value="public"   
            control={
              <Checkbox checked={pub_lic} onChange={handleChange} name="public" />
            }
            label="Public"
            labelPlacement="public"
            />
            <FormControlLabel
            value="private"   
            control={
              <Checkbox checked={pri_vate} onChange={handleChange} name="private" />
            }
            label="Private"
            labelPlacement="private"
            />
            </div>
            </FormGroup>
            <FormHelperText>You can display an error</FormHelperText>
            </FormControl>
            <button className="button" type="submit"  onClick={this.save}>
              Submit
            </button>
        </form>
      </div>
    );
 }
}
    

  
  