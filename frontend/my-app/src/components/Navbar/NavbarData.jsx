import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';

export const SidebarData = [
    {
        title: "Home",
        icon: <HomeIcon />,
        link: "/",
    },
    {
        title: "World",
        icon: <PublicIcon />,
        link: "/world",
    },
    {
        title: "Message",
        icon: <NotificationsIcon />,
        link: "/message",
    },
    {
        title: "Friend",
        icon: <GroupIcon />,
        link: "/friend",
    }
]
