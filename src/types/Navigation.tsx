import HomeIcon from '@mui/icons-material/Home';
import DvrIcon from '@mui/icons-material/Dvr';

import type { Navigation } from '@toolpad/core/AppProvider';

import HomePage from '../pages/Home/HomePage';
import ServerPage from '../pages/Server/ServerPage';

export const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: 'home',
        title: 'Home',
        icon: <HomeIcon />,
        action: <HomePage />,
    },
    {
        segment: 'server',
        title: 'Server',
        icon: <DvrIcon />,
        action: <ServerPage />,
    },
];