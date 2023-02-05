import PropTypes from 'prop-types'
import {CssBaseline} from '@mui/material'
import {createTheme, StyledEngineProvider, ThemeProvider} from '@mui/material/styles'
import React, {useMemo} from 'react'
import ComponentsOverride from './overrides'
import Palette from './Palette'
import CustomShadows from './Shadows'
import Typography from './Typography'

const ThemeCustomization = ({children}: { children: React.ReactNode }) => {
    const theme = Palette('light')
    const themeTypography = Typography('Public Sans, sans-serif')
    const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme])
    const themeOptions = useMemo(
        () => ({
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 768,
                    md: 1024,
                    lg: 1266,
                    xl: 1536
                }
            },
            mixins: {
                toolbar: {
                    minHeight: 60,
                    paddingTop: 8,
                    paddingBottom: 8
                }
            },
            palette: theme.palette,
            customShadows: themeCustomShadows,
            typography: themeTypography,
            zIndex: {drawer: 100}
        }),
        [theme, themeTypography, themeCustomShadows]
    )

    const themes = createTheme(themeOptions)
    themes.components = ComponentsOverride(theme)

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    )
}

ThemeCustomization.propTypes = {
    children: PropTypes.node
}

export default ThemeCustomization
