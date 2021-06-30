import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	textBorder: {
		borderBottom: '1px solid #b4b4b4',
        height:60,
        color:"rgba(51,51,51,.8)",
        '@media (max-width: 480px)' : {
            height:'auto'
          },
	}
}));
const JobCard = ({ companyLogo, jobTitle, companyName, estimatedSalary, postedDate, skillsets,jobLocation }) => {
	const classes = useStyles();
	return (
			<Card>
				<CardContent>
					<img src={companyLogo} alt=""  height="100" width="100" />
					<Box fontWeight="fontWeightBold" fontSize={14}>{companyName}</Box>
                    <Box  fontSize={12}>{jobLocation}</Box>
					<Box fontSize={18} fontWeight="fontWeightBold" mt={2} pb={2} className={classes.textBorder}>
						{jobTitle}
					</Box>
					<Box pt={2} pb={4} className={classes.textBorder}>
						Skills : {skillsets.length > 80 ? `${skillsets.slice(0,80)}...` : skillsets }
					</Box>
					<Box display="flex" flexDirection="row" justifyContent="space-between" pt={2}>
						<Typography color="primary">{postedDate}</Typography>
						<Typography color="primary">{estimatedSalary}</Typography>
					</Box>
				</CardContent>
			</Card>
	);
};
export default JobCard;
