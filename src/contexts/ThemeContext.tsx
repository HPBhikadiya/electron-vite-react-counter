import { useState, useMemo } from 'react';
import type { ReactNode } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeContext } from './ThemeContext';

interface ThemeContextProviderProps {
  children: ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: '#F29F67',
            light: '#F5B589',
            dark: '#D87A42',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: '#3B8FF3',
            light: '#6BA8F6',
            dark: '#2A6FD0',
            contrastText: '#FFFFFF',
          },
          background: {
            default: mode === 'light' ? '#F5F5F5' : '#1E1E2C',
            paper: mode === 'light' ? '#FFFFFF' : '#2A2A3A',
          },
          text: {
            primary: mode === 'light' ? '#1E1E2C' : '#FFFFFF',
            secondary: mode === 'light' ? '#666666' : '#B0B0C0',
          },
          divider: mode === 'light' ? '#E0E0E0' : '#3A3A4A',
          action: {
            active: '#F29F67',
            hover: mode === 'light' ? 'rgba(242, 159, 103, 0.08)' : 'rgba(242, 159, 103, 0.12)',
            selected: mode === 'light' ? 'rgba(242, 159, 103, 0.12)' : 'rgba(242, 159, 103, 0.16)',
            disabled: mode === 'light' ? 'rgba(30, 30, 44, 0.26)' : 'rgba(255, 255, 255, 0.3)',
          },
          success: {
            main: '#34B1AA',
            light: '#5EC4BD',
            dark: '#248780',
          },
          warning: {
            main: '#E0B50F',
            light: '#E8C63A',
            dark: '#B8920C',
          },
          error: {
            main: '#F44336',
            light: '#F77066',
            dark: '#C62828',
          },
          info: {
            main: '#3B8FF3',
            light: '#6BA8F6',
            dark: '#2A6FD0',
          },
        },
        components: {
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E1E2C',
                color: mode === 'light' ? '#1E1E2C' : '#FFFFFF',
                boxShadow:
                  mode === 'light' ? '0 1px 3px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.3)',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#2A2A3A',
                boxShadow:
                  mode === 'light' ? '0 2px 4px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.4)',
                borderRadius: '8px',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E1E2C',
                borderRight: mode === 'light' ? '1px solid #E0E0E0' : '1px solid #3A3A4A',
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              contained: {
                boxShadow: '0 2px 4px rgba(242, 159, 103, 0.2)',
                '&:hover': {
                  boxShadow: '0 4px 8px rgba(242, 159, 103, 0.3)',
                },
              },
              outlined: {
                borderColor: mode === 'light' ? '#1E1E2C' : '#FFFFFF',
                color: mode === 'light' ? '#1E1E2C' : '#FFFFFF',
                '&:hover': {
                  borderColor: '#F29F67',
                  backgroundColor:
                    mode === 'light' ? 'rgba(242, 159, 103, 0.08)' : 'rgba(242, 159, 103, 0.12)',
                },
              },
            },
          },
          MuiListItemButton: {
            styleOverrides: {
              root: {
                '&.Mui-selected': {
                  backgroundColor:
                    mode === 'light' ? 'rgba(242, 159, 103, 0.12)' : 'rgba(242, 159, 103, 0.2)',
                  color: mode === 'light' ? '#1E1E2C' : '#FFFFFF',
                  '&:hover': {
                    backgroundColor:
                      mode === 'light' ? 'rgba(242, 159, 103, 0.16)' : 'rgba(242, 159, 103, 0.28)',
                  },
                  '& .MuiListItemIcon-root': {
                    color: '#F29F67',
                  },
                  '& .MuiListItemText-primary': {
                    color: mode === 'light' ? '#1E1E2C' : '#FFFFFF',
                    fontWeight: 600,
                  },
                },
                '&:hover': {
                  backgroundColor:
                    mode === 'light' ? 'rgba(242, 159, 103, 0.08)' : 'rgba(242, 159, 103, 0.12)',
                },
                color: mode === 'light' ? '#1E1E2C' : '#FFFFFF',
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                '&.MuiChip-colorSuccess': {
                  backgroundColor: '#34B1AA',
                  color: '#FFFFFF',
                },
                '&.MuiChip-colorInfo': {
                  backgroundColor: '#3B8FF3',
                  color: '#FFFFFF',
                },
              },
            },
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h4: {
            fontWeight: 600,
            color: mode === 'light' ? '#1E1E2C' : '#FFFFFF',
          },
          h6: {
            fontWeight: 600,
            color: mode === 'light' ? '#1E1E2C' : '#FFFFFF',
          },
          body1: {
            color: mode === 'light' ? '#1E1E2C' : '#FFFFFF',
          },
        },
      }),
    [mode],
  );

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
