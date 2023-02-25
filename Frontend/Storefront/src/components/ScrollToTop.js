import { Zoom, useScrollTrigger, Box } from "@mui/material";

function ScrollToTop(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor',
        );
        if (anchor) {
        anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    }
    };

    return (
        <Zoom in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: 'fixed', bottom: 16, right: 13 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

export default ScrollToTop

