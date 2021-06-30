import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Normal or default theme
const theme = createMuiTheme({
	overrides: {
		MuiCard: {
			root: {
                width:'30%',
				color: 'black',
				border: '1px solid #b4b4b4',
                marginTop:20,
                marginRight:20,
                marginBottom:20,
                '@media (max-width: 480px)' : {
                    width: '100%'
                  }
			},
		},
		MuiButton: {
			outlinedSecondary: {
				color: '#ff4d4f',
				'&:hover': {
					backgroundColor: '#ff4d4f !important',
					color: '#FFFFFF !important'
				}
			},
			root: {
                width:180,
                height:50,
				'&:hover': {
					backgroundColor: '#1890ff !important',
					color: '#FFFFFF !important',
				}
			}
		},
		MuiTypography: {
			root: {
				fontFamily: 'Open Sans',
				color: 'white',
			}
		},
		MuiChip: {
			colorPrimary: {
				border: '1px solid transparent'
			}
		},
		MuiListItem: {
			button: {
				'&:hover': {
					color: '#556cd6'
				}
			}
		}
	},
	palette: {
		primary: {
			main: '#1890ff'
		},
		secondary: {
			main: '#ff4d4f'
		},
		default: {
			color: '#000000'
		},
		error: {
			main: red.A400
		},
		background: {
			default: '#f5f5f5'
		},
		titleBar: {
			main: '#eeeeee',
			contrastText: '#222222'
		}
	}
});

export default theme;
