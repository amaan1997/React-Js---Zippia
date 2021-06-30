import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Breadcrumbs, Typography, Link, Box, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import { get } from 'lodash';
import JobCard from '../../components/JobCard';
import {  getJobList,getJobsByCompany } from '../../redux/actions/jobsActions';

const useStyles = makeStyles(() => ({
	container: {
		width: '70%',
		margin: '20px auto'
	}
}));
const Jobs = (props) => {
	const classes = useStyles();
    const dispatch=useDispatch();

	const state = get(props.location, 'state', '');
	const jobTitle = get(state, 'jobTitle', '');
	const location = get(state, 'location', '');
	const searchCategory = get(state, 'searchCategory', '');
	const company = get(state, 'company', '');

	const jobList = useSelector((state) => state.jobs.jobList);
	const jobsByCompany = useSelector((state) => state.jobs.jobsByCompany);

	const [ totalPages, setTotalPages ] = useState(1);
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ jobs, setJobs ] = useState([]);
    const [selectedDateRange,setSelectedDate]=useState('')

    const setJobDetails=()=>{
        let response = [];
		if (searchCategory === 'location') {
			response = get(jobList, 'jobs', []);
		} else {
			response = get(jobsByCompany, 'jobs', []);
		}

		if (response.length > 0) {
			setTotalPages(response.length / 10);
			setJobs(response.slice(0, 10));
		} else {
			setTotalPages(1);
			setJobs([]);
		}
    }
	useEffect(() => {
		setJobDetails()
	}, [jobList,jobsByCompany]);

	const onPageChange = (event, page) => {
		let response = [];
		if (searchCategory === 'location') {
			response = get(jobList, 'jobs', []);
		} else {
			response = get(jobsByCompany, 'jobs', []);
		}

		const startCount = page * 10 - 10;
		const endCount = page * 10;
		setCurrentPage(page);
		setJobs(response.slice(startCount, endCount));
	};
    const handleDateChange=async(event)=>{
        const value= event.target.value
        const requestData = get(state, 'requestData', {});

        console.log("value>>",value)
        setSelectedDate(value)
        setCurrentPage(1)

        if(requestData && Object.keys(requestData).length > 0){
            const data={
                ...requestData,
                postingDateRange:value
            }
            if(searchCategory === 'location'){
                await dispatch(getJobList(data));
            }
            else{
                await dispatch((getJobsByCompany(data)))
            }
        }
    }

	return (
		<React.Fragment>
			<Box className={classes.container}>
				<Breadcrumbs aria-label="breadcrumb" separator="›">
					<Link color="inherit" href="/">
						ZIPPIA CAREERS
					</Link>
					<Typography color="textPrimary">
						{searchCategory === 'location' ? `${jobTitle}  ${location}  Jobs` : `${company.label}  Jobs`}
					</Typography>
				</Breadcrumbs>
				<Box display="flex" flexDirection="row">
					<Box fontSize={28} mt={4} mb={4}>
						{searchCategory === 'location' ? `${jobTitle}  ${location}  Jobs` : `${company.label}  Jobs`}
					</Box>
				</Box>
				<Box display="flex" flexDirection="row">
                <Box mt={3} mr={2}>Filter By : </Box>
					<FormControl>
						<InputLabel> Date Posted</InputLabel>
						<Select
							style={{ width: 200 }}
							id="date-posted"
							value={selectedDateRange}
							onChange={handleDateChange}
						>
							<MenuItem value="1d">Past Day</MenuItem>
							<MenuItem value="3d">Past 3 Days</MenuItem>
							<MenuItem value="7d">Past Week</MenuItem>
							<MenuItem value="30d">Past Month</MenuItem>
						</Select>
					</FormControl>
				</Box>
				<Box display="flex" flexDirection="row" flexWrap="wrap">
					{jobs.map((job) => (
						<JobCard
							jobTitle={job.jobTitle}
							companyName={job.companyName}
							estimatedSalary={job.estimatedSalary}
							postedDate={job.postedDate}
							skillsets={job.skillsets.length > 0 ? job.skillsets.toString() : '-'}
							companyLogo={job.companyLogo}
							jobLocation={job.OBJjobTags.includes('Remote') ? 'Remote' : job.location}
						/>
					))}
				</Box>
				<Box display="flex" flexDirection="row" justifyContent="center">
					<Pagination count={totalPages} color="primary" onChange={onPageChange} page={currentPage} />
				</Box>
			</Box>
		</React.Fragment>
	);
};

export default Jobs;
