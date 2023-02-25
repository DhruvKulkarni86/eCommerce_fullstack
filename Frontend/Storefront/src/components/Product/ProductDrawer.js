import React from 'react'
import { Toolbar, Divider, Drawer, Button, Stack } from '@mui/material';
import { Category} from '@mui/icons-material';
import FilterLeft from './Filter/FilterLeft';
import ProductSort from './ProductSort';
const drawerWidth = 248;
//! add sort inside the drawer from <md

const ProductDrawer = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <FilterLeft/>
            <Divider />
            <ProductSort/>
            {/* Categories */}
        </div>
    );
    const container = window !== undefined ? () => window().document.body : undefined;
    return (
        <>
            {/* Resp Drawer */}
            <Stack direction='row' justifyContent='flex-start' sx={{width:'100%', paddingTop:2, paddingX:2}}>
                <Button
                        id="back-to-top-anchor"
                        variant='outlined'
                        aria-label="open drawer"
                        startIcon={<Category/>}
                        color="primary"
                        onClick={handleDrawerToggle}
                        sx={{display:{xs:'flex', md:'none'}}}
                    >
                        Filters & Sort
                </Button>
            </Stack>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
                {drawer}
            </Drawer>
        </>
    )
}

export default ProductDrawer