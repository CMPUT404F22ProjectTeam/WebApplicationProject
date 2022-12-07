import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import './homePage.css'
import { Octokit } from "@octokit/core";
import {
    CardActions,
    Card,
    Grid,
    Avatar,
  } from "@material-ui/core";

import axios from "axios";

const base_url = process.env.REACT_APP_CURRENT_URL;

export default function Profile() {
    const AUTHOR_ID = "1111111111";
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [profile, setProfile] = useState('');
    const [github, setGithub] = useState('');
    const [githubAcivities, setGithubactivities] = useState('');
    const handleEdit = () => {
        navigate("/editProfile")
    }

    // const handleGithubActivities = async (github) => {
        
    //   };

    useEffect(() => {
        axios
            .get(`${base_url}/authors/${AUTHOR_ID}/`)
            
            .then((data) => {
                setName(data.data.displayName)
                setProfile(data.data.profileImage)
                setGithub(data.data.github)
            })
            .catch((e) => console.log(e));
    }, [name, profile, github])
    useEffect(() => {
        const octokit = new Octokit();
        let doc = null;
        if (github) {
          doc = octokit.request(
            "GET /users/" + github.split("/")[3] + "/events/public/"
          );
        }
        
        setGithubactivities({ githubAcivities: doc?.data ?? [] });
    }, [githubAcivities])

    return (
        <div className="home">
            <div className='container'>
            <button className="btn" disabled={window.location.pathname === '/Post'} onClick={handleEdit}>Edit</button>
            <div className="profileImgDiv">
                <img class='profileimg' src={require("./../../public/profile.jpg")} alt="profile" width="100px" height="100px" />
            </div>
            <p className='name'>Hello</p>
            <p className='name'>{name}</p>
            <p className='name'>Github:</p>
            <a href={github}>{github}</a>
            <Grid item xs={12}>
                {githubAcivities?.length >= 1 ? (
                  githubAcivities.map((activity) => (
                    <Card
                      style={{
                        marginTop: "2%",
                        width: "80%",
                        marginLeft: "10%",
                      }}
                    >
                      <CardActions
                        onClick={() => (window.location = activity.repo.url)}
                      >
                        <Avatar src={activity.actor.avatar_url} />
                        <p>Time: {activity.created_at.split("T")[0]}</p>
                        <p>Activity: {activity.type}</p>
                      </CardActions>
                    </Card>
                  ))
                ) : (
                  <h7>
                    Cannot verify your account!
                  </h7>
                )}
              </Grid>

            </div>
        </div>
    );
}