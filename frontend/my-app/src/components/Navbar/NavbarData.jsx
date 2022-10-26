import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';

export const SidebarData = [
    {
        icon: <HomeIcon />,
        link: "/",
    },
    {
        icon: <PublicIcon />,
        link: "/world",
    },
    {
        icon: <NotificationsIcon />,
        link: "/message",
    },
    {
        icon: <GroupIcon />,
        link: "/friend",
    }
]
