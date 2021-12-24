import { Dispatch, SetStateAction } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';

interface IFooter {
	tab: number;
	setTab: Dispatch<SetStateAction<number>>;
}

const Footer = ({ tab, setTab }: IFooter) => {
	return (
		<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
			<BottomNavigation
				showLabels
				value={tab}
				onChange={(event, newValue) => {
					setTab(newValue);
				}}>
				<BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
				<BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
				<BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
			</BottomNavigation>
		</Paper>
	);
};

export default Footer;
