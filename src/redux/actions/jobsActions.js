import * as actionTypes from '../actionTypes';
import axios from 'axios';

// Function for  getting list of all the locations  based on user search
export const getAllLocations = (searchString) => {
	return async (dispatch) => {
		return axios.get(`${actionTypes.API_URL}/autocomplete/location/?searchString=${searchString}&extended=true`).then((result) => {
				dispatch(getAllLocationsSuccess(result.data));
		})
        .catch(() => {
            dispatch(getAllLocationsFailed());
        })
	};
};

export const getAllLocationsSuccess = (res) => {
	return { type: actionTypes.GET_ALL_LOCATION_SUCCESS, res };
};
export const getAllLocationsFailed = (res) => {
	return { type: actionTypes.GET_ALL_LOCATION_FAILED, res };
};
// Function for  getting list of all the jobs  based on user search
export const getAllJobTitle = (searchString) => {
	return async (dispatch) => {
		return axios.get(`${actionTypes.API_URL}/autocomplete/source/?searchString=${searchString}`).then((result) => {
				dispatch(getJobListSuccess(result.data));
		})
        .catch(() => {
            dispatch(getAllJobTitleFailed());
        })
	};
};

export const getAllJobTitleSuccess = (res) => {
	return { type: actionTypes.GET_ALL_JOB_TITLE_SUCCESS, res };
};
export const getAllJobTitleFailed = () => {
	return { type: actionTypes.GET_ALL_JOB_TITLE_FAILED };
};
// Function for  getting list of jobs based on location and jobTitle
export const getJobList = (data) => {
	return async (dispatch) => {
		return axios.post(`${actionTypes.API_URL}/api/jobs/`,data).then((result) => {
				dispatch(getJobListSuccess(result.data));
		})
        .catch(() => {
            dispatch(getJobListFailed());
        })
	};
};

export const getJobListSuccess = (res) => {
	return { type: actionTypes.GET_JOB_LIST_SUCCESS, res };
};
export const getJobListFailed = (res) => {
	return { type: actionTypes.GET_JOB_LIST_FAILED, res };
};

// Function for  getting list of all the companies based on user search
export const getCompanyList = (searchString) => {
	return async (dispatch) => {
		return axios.get(`${actionTypes.API_URL}/autocomplete/company/?searchString=${searchString}&indexableOnly=true`).then((result) => {
				dispatch(getCompanyListSuccess(result.data));
		})
        .catch(() => {
            dispatch(getCompanyListFailed());
        })
	};
};

export const getCompanyListSuccess = (res) => {
	return { type: actionTypes.GET_COMPANY_LIST_SUCCESS, res };
};
export const getCompanyListFailed = () => {
	return { type: actionTypes.GET_COMPANY_LIST_FAILED };
};
// Function for  getting list of jobs based on company Id
export const getJobsByCompany = (data) => {
	return async (dispatch) => {
		return axios.post(`${actionTypes.API_URL}/api/getCompanyJobs`,data).then((result) => {
				dispatch(getJobsByCompanySuccess(result.data));
		})
        .catch(() => {
            dispatch(getJobsByCompanyFailed());
        })
	};
};

export const getJobsByCompanySuccess = (res) => {
	return { type: actionTypes.GET_JOBS_BY_COMPANY_SUCCESS, res };
};
export const getJobsByCompanyFailed = () => {
	return { type: actionTypes.GET_JOBS_BY_COMPANY_FAILED };
};



