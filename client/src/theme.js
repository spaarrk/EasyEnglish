import { createTheme } from '@mui/material';
export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          fontSize: '22px',
          borderRadius: '11px',
          height: '50px',
          [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
          },
          ...(ownerState.variant === 'contained' && {
            width: '100%',
            backgroundColor: '#005995',
            color: 'white ',
            transition: '0.5s',
            ':hover': {
              border: '1px solid #005995',
              backgroundColor: 'white',
              color: '#005995',
            },
            [theme.breakpoints.down('md')]: {
              fontSize: '14px',
              lineHeight: '21px',
            },
          }),
          ...(ownerState.variant === 'outlined' && {
            width: '100%',
            border: '1px solid #005995',
            backgroundColor: 'white',
            color: '#005995',
            transition: '0.5s',
            ':hover': {
              backgroundColor: '#005995',
              color: 'white',
            },
            [theme.breakpoints.down('md')]: {
              fontSize: '14px',
              lineHeight: '21px',
            },
          }),
        }),
      },
    },
    MuiSelect: {
      // styleOverrides: {
      //   root: ({ ownerState, theme }) => ({
      //     maxWidth: '272px',
      //     width: '100%',
      //     borderRadius: '11px',
      //     backgroundColor: '#F7F7F7',
      //     '.MuiSelect-select': { display: 'flex', alignItems: 'center' },
      //     '.MuiOutlinedInput-input': {
      //       padding: '0px 24px !important',
      //       height: '100% !important',
      //       fontSize: '16px',
      //       lineHeight: '24px',
      //     },
      //     '.MuiOutlinedInput-notchedOutline': {
      //       border: '1px solid #405F6A',
      //       borderRadius: '11px',
      //     },
      //     '.MuiSelect-icon': {
      //       right: 'unset',
      //       left: '26.35px',
      //     },
      //     [theme.breakpoints.down('sm')]: {
      //       maxWidth: '227px',
      //       '.MuiOutlinedInput-input': {
      //         fontSize: '14px',
      //         lineHeight: '21px',
      //         padding: '0px 16px !important',
      //       },
      //     },
      //   }),
      // },
      // defaultProps: {
      //   IconComponent: ({ className }) => {
      //     return <img className={className} src={ArrowSelect} alt="arrow"></img>;
      //   },
      // },
    },

    MuiTextField: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          fontSize: '14px',
          '.MuiOutlinedInput-root': {
            cursor: 'pointer',
            position: 'relative',
            height: '100%',
            backgroundColor: '#F6F7FF',
            borderRadius: '10px',
          },
          fieldset: {
            border: '1px solid #E1E4F1',
            borderRadius: '10px',
          },
          '.MuiOutlinedInput-root:hover fieldset': {
            borderColor: '#0F23FB',
          },
          '& input::placeholder': {
            fontSize: '14px',
          },
          [theme.breakpoints.down('sm')]: {
            '.MuiFormHelperText-root': {
              fontSize: '10px',
            },
          },
        }),
      },
    },
    MuiAutocomplete: {
      // styleOverrides: {
      //   root: ({ ownerState, theme }) => ({
      //     '.MuiOutlinedInput-root .MuiAutocomplete-input': {
      //       padding: '0px !important',
      //       backgroundColor: 'unset !important',
      //     },
      //     '.MuiFormHelperText-root': {
      //       fontSize: '12px',
      //     },
      //     '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
      //       padding: '0px 24px',
      //       backgroundColor: '#F7F7F7',
      //       borderRadius: '11px',
      //     },
      //     [theme.breakpoints.down('sm')]: {
      //       '&.MuiTextField-root .MuiOutlinedInput-input': {
      //         padding: '0px',
      //       },
      //       '&.MuiAutocomplete-root .MuiOutlinedInput-root': {
      //         padding: '0px 16px',
      //       },
      //       // '.MuiOutlinedInput-root': {
      //       //   padding: '0px',
      //       // },
      //       // '.MuiOutlinedInput-input': {
      //       //   padding: '0px 4px 0px 6px',
      //       // },
      //       '.MuiFormHelperText-root': {
      //         fontSize: '10px',
      //       },
      //     },
      //   }),
      // },
    },
    MuiFormHelperText: {
      // styleOverrides: {
      //   root: ({ ownerState, theme }) => ({
      //     'Mui-error': {
      //       fontSize: '12px',
      //     },
      //     '.MuiFormHelperText-root': {
      //       fontSize: '12px !important',
      //     },
      //   }),
      // },
    },
    MuiDrawer: {
      // styleOverrides: {
      //   root: ({ ownerState, theme }) => ({
      //     '&.MuiDrawer-root': {
      //       top: '60px',
      //     },
      //     '.MuiBackdrop-root': {
      //       top: '60px',
      //     },
      //     '.MuiDrawer-paper': {
      //       top: '60px',
      //       width: '100%',
      //       maxWidth: '344px',
      //       height: 'calc(100vh - 60px)',
      //     },
      //   }),
      // },
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    color: 'black',
  },
});
