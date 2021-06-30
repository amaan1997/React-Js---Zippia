import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';

const useStyles = makeStyles((theme) => ({
	root: {
		height: 60,
		background: '#2c2c2c'
	},
	container: {
		width: '70%',
		margin: 'auto'
	},
	icon: {
		color: 'white',
		margin: theme.spacing(1)
	},
	content: {
		fontSize: 9,
		paddingLeft: theme.spacing(5)
	}
}));

const Header = () => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Box className={classes.root}>
				<Box className={classes.container}>
					<Box display="flex" flexDirection="row">
						<WorkIcon className={classes.icon} />
						<Typography variant="h4">ZIPPIA</Typography>
					</Box>

					<Typography variant="caption" className={classes.content}>
						THE CAREER EXPERT
					</Typography>
				</Box>
			</Box>
		</React.Fragment>
	);
};
export default Header;
