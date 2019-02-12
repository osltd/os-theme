import {Theme} from "@material-ui/core";
import {useTheme} from "@material-ui/styles";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";
import {unstable_useMediaQuery as useMediaQuery} from "@material-ui/core/useMediaQuery";
import {breakpoints} from "../constants/enum";

interface result {
    isWidthUp: {
        xl: boolean
        lg: boolean
        md: boolean
        sm: boolean
        xs: boolean
    }
    isWidthDown: {
        xl: boolean
        lg: boolean
        md: boolean
        sm: boolean
        xs: boolean
    }
}

export const useThemeWidth = (): result => {

    const theme: Theme = useTheme();
    const isWidthUp = (breakpoint: Breakpoint): boolean => useMediaQuery(theme.breakpoints.up(breakpoint));
    const isWidthDown = (breakpoint: Breakpoint): boolean => useMediaQuery(theme.breakpoints.down(breakpoint));

    const isWidthUpXl = isWidthUp(breakpoints.xl);
    const isWidthUpLg = isWidthUp(breakpoints.lg);
    const isWidthUpMd = isWidthUp(breakpoints.md);
    const isWidthUpSm = isWidthUp(breakpoints.sm);
    const isWidthUpXs = isWidthUp(breakpoints.xs);

    const isWidthDownXl= isWidthDown(breakpoints.xl)
    const isWidthDownLg= isWidthDown(breakpoints.lg)
    const isWidthDownMd= isWidthDown(breakpoints.md)
    const isWidthDownSm= isWidthDown(breakpoints.sm)
    const isWidthDownXs= isWidthDown(breakpoints.xs)

    return {
        isWidthUp: {
            xl: isWidthUpXl,
            lg: isWidthUpLg,
            md: isWidthUpMd,
            sm: isWidthUpSm,
            xs: isWidthUpXs,
        },
        isWidthDown: {
            xl: isWidthDownXl,
            lg: isWidthDownLg,
            md: isWidthDownMd,
            sm: isWidthDownSm,
            xs: isWidthDownXs,
        }
    }
};

