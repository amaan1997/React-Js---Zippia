import produce from 'immer';

const intialState = {
	locationRes: [],
	locationList: [],
	jobTitleList: [],
	jobTitleRes: [],
	companyList: [],
	jobsByCompany: []
};

// immer is used for maintaing immutability nature of state object
export default function authReducer(state = { ...intialState }, action) {
	switch (action.type) {
		case 'GET_ALL_LOCATION_SUCCESS':
			return produce(state, (draft) => {
				const locations = action.res;
				let locationList = [];
				if (locations && locations.length > 0) {
					locationList = locations.map((el) => {
						return { label: el['display_name'], value: el['display_name'], type: el['type'] };
					});
				}
				draft.locationList = locationList;
				draft.locationRes = locations;
			});
		case 'GET_ALL_LOCATION_FAILED':
			return produce(state, (draft) => {
				draft.locationList = [];
			});
		case 'GET_ALL_JOB_TITLE_SUCCESS':
			return produce(state, (draft) => {
				const titles = action.res;
				let jobTitleList = [];
				if (titles && titles.length > 0) {
					jobTitleList = titles.map((title) => {
						return { label: title['name'], value: title['name'] };
					});
				}
				draft.jobTitleList = jobTitleList;
				draft.jobTitleRes = action.res;
			});
		case 'GET_ALL_JOB_TITLE_FAILED':
			return produce(state, (draft) => {
				draft.jobTitleList = [];
			});
		case 'GET_JOB_LIST_SUCCESS':
			return produce(state, (draft) => {
				draft.jobList = action.res;
			});
		case 'GET_JOB_LIST_FAILED':
			return produce(state, (draft) => {
				draft.jobList = [];
			});
		case 'GET_COMPANY_LIST_SUCCESS':
			return produce(state, (draft) => {
				const companies = action.res;
				let companyList = [];
				if (companies && companies.length > 0) {
					companyList = companies.map((el) => {
						return { label: el['companyName'], value: el['companyID'] };
					});
				}
				draft.companyList = companyList;
			});
		case 'GET_COMPANY_LIST_FAILED':
			return produce(state, (draft) => {
				draft.companyList = [];
			});
		case 'GET_JOBS_BY_COMPANY_SUCCESS':
			return produce(state, (draft) => {
				draft.jobsByCompany = action.res;
			});
		case 'GET_JOBS_BY_COMPANY_FAILED':
			return produce(state, (draft) => {
				draft.jobsByCompany = [];
			});

		default:
			return state;
	}
}
