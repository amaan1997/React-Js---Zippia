import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import Autocomplete from '../../components/AutoComplete';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import { getAllJobTitle, getAllLocations, getCompanyList, getJobList,getJobsByCompany } from '../../redux/actions/jobsActions';

const HomePage = ({ history }) => {
	const dispatch = useDispatch();

	const [ jobTitle, setJobTitle ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ company, setCompany ] = useState('');

	const jobs = useSelector((state) => state.jobs);
	const { locationList, jobTitleList, companyList } = jobs;

	const onLocationChange = async (value) => {
		await dispatch(getAllLocations(value));
	};
	const onJobTitleChange = async (value) => {
		await dispatch(getAllJobTitle(value));
	};
	const onCompanyChange = async (value) => {
		await dispatch(getCompanyList(value));
	};
	const getJobListHandler = async () => {
		if (company) {
			const requestData = {
				companyId: company.value,
				locationSort: true,
				numJobs: 20
			};
            await dispatch((getJobsByCompany(requestData)))
            history.push({
				pathname: '/jobs',
				state: {
                    searchCategory:'company',
					company,
                    requestData:requestData
				}
			});
		} else {
			let requestData = {
				title: jobTitle,
				fetchJobDesc: true
			};
			if (location.type === 'state') {
				requestData = {
					...requestData,
					locations: [ { state: location.value } ]
				};
			} else {
				const locationArray = location.value.split(',');
				const city = locationArray[0] ? locationArray[0].trim() : null;
				const state = locationArray[1] ? locationArray[1] : null;

				requestData = {
					...requestData,
					locations: [ { state: state.trim(), city: city } ],
				};
			}
			await dispatch(getJobList(requestData));
			history.push({
				pathname: '/jobs',
				state: {
                    searchCategory:'location',
					jobTitle,
					location: location.type === 'state' ? location.value : location.value.split(',')[0],
                    requestData:requestData
				}
			});
		}
	};
	return (
		<React.Fragment>
			<Box display="flex" flexDirection="row" justifyContent="center" mt={6}>
				<Box>
					<Box>
						<Autocomplete
							heading={'Enter State or City'}
							data={locationList && locationList.length > 0 ? locationList : []}
							handleChange={onLocationChange}
							handleSelect={(location) => {
								setLocation(location);
							}}
						/>
					</Box>
					<Box mt={3} mb={2}>
						<Autocomplete
							heading={'Enter Job Title'}
							data={jobTitleList && jobTitleList.length > 0 ? jobTitleList : []}
							handleChange={onJobTitleChange}
							handleSelect={(job) => {
								setJobTitle(job.value);
							}}
						/>
					</Box>
					------------------------ OR ----------------------------
					<Box mt={3}>
						<Autocomplete
							heading={'Enter Company'}
							data={companyList && companyList.length > 0 ? companyList : []}
							handleChange={onCompanyChange}
							handleSelect={(company) => {
								setCompany(company);
							}}
						/>
					</Box>
					<Box display="flex" flexDirection="row" justifyContent="center" mt={4}>
						<Button variant="contained" color="primary" size="large" onClick={getJobListHandler}>
							Search Jobs <DoubleArrowIcon />
						</Button>
					</Box>
				</Box>
			</Box>
		</React.Fragment>
	);
};
export default HomePage;
