import { Box, Menu, MenuItem, Typography, Chip, Stack, Divider, Fade, Link}
from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checked} from '../../features/filter';
import {skip} from '../../features/skip'
import { Link as RouterLink } from 'react-router-dom';

import SeedIcon from '../../icons/SeedIcon';
import Seed from '../../icons/Seed';
import Pot from '../../icons/Pot';
import Can from '../../icons/Can';

const PlantCat = ['Flowering', 'Medicinal', 'Cactus & Succulents', 'Bonsai', 'Palm'];
const SeedCat = ['Fruit Seeds', 'Vegetable Seed'];
const PlanterCat = ['Ceramic Pots', 'China Claypots', 'Decorative Planters', 'Hanging Planters'];
const CareCat = ['Manure & Soils', 'Fertilizers', 'Gardening Tools'];

const CatalogueMenu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        if (anchorEl) {
            setAnchorEl(null);
        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const leaveMenu = () => {
        // setTimeout(() => {
        // setAnchorEl(null);
        // }, 300);
    };
    const handleNav = (cat) => {
        navigate(`/store/${cat}`)
        handleClose()
    }
    const handleCatalogue = () => {
        dispatch(checked({
            filters:null,
        }))
        dispatch(skip({
            skip:false
        }))
        handleClose()
        navigate('/store/catalogue') //replace true
    }

    return (
        <Box sx={{flexGrow: 1, display:{xs: 'none', md:'flex'}}}>
                <Typography variant="button" component="div" color="primary" onClick={handleClick} sx={{ display: { xs: 'none', md: 'flex' } }}>
                    Catalogue
                </Typography>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                keepMounted
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                onMouseLeave: leaveMenu
                }}
                sx={{ cursor:'default',display:{xs:'none', md:'block'}}}
                TransitionComponent={Fade}
                transitionDuration={800}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={handleClose} sx={{cursor:'default'}} >
                    <Chip icon={<SeedIcon />} onClick={handleCatalogue} variant="outlined" label="All Products" color="primary" />
                </MenuItem>

                <Divider variant="middle"/>
                <Link color="#fff" component={RouterLink} to={`/store/cat/Plant`} underline='hover'>
                    <MenuItem onClick={handleClose} sx={{cursor:'default'}} >
                        <Chip icon={<SeedIcon />} variant="outlined" label="Plants" color="primary" />
                    </MenuItem>
                </Link>
                    <MenuItem onClose={handleClose} sx={{cursor:'default'}}>
                        <Stack direction="row" spacing={1}>
                            {PlantCat.map((cat)=>(
                                <Chip key={cat} color="primary" onClick={()=>{handleNav(cat)}} label={cat} variant="outlined"/>
                            ))}
                        </Stack>
                    </MenuItem>

                <Divider variant="middle"/>
                <Link color="#fff" component={RouterLink} to={`/store/cat/Seeds`} underline='hover'>
                <MenuItem onClick={handleClose} sx={{cursor:'default'}}>
                    <Chip icon={<Seed />} variant="outlined" label="Seeds" color="seed"/>
                </MenuItem>
                </Link>
                <MenuItem onClose={handleClose} sx={{cursor:'default'}}>
                    <Stack direction="row" spacing={1}>
                        {SeedCat.map((cat)=>(
                            <Chip key={cat} color="seed" onClick={()=>{handleNav(cat)}} label={cat} variant="outlined"/>
                        ))}
                    </Stack>
                </MenuItem>
                <Divider variant="middle"/>
                <Link color="#fff" component={RouterLink} to={`/store/cat/Planters`} underline='hover'>
                <MenuItem onClick={handleClose} sx={{cursor:'default'}}>
                    <Chip icon={<Pot />} variant="outlined" label="Planters" color="pots"/>
                </MenuItem>
                </Link>
                <MenuItem onClose={handleClose} sx={{cursor:'default'}}>
                    <Stack direction="row" spacing={1}>
                        {PlanterCat.map((cat)=>(
                            <Chip key={cat} color="pots" onClick={()=>{handleNav(cat)}} label={cat} variant="outlined"/>
                        ))}
                    </Stack>
                </MenuItem>
                <Divider variant="middle"/>
                <Link color="#fff" component={RouterLink} to={`/store/cat/Care`} underline='hover'>
                <MenuItem onClick={handleClose} sx={{cursor:'default'}}>
                    <Chip icon={<Can />} variant="outlined" label="Care" color="can"/>
                </MenuItem>
                </Link>
                <MenuItem onClose={handleClose} sx={{cursor:'default'}}>
                    <Stack direction="row" spacing={1}>
                        {CareCat.map((cat)=>(
                            <Chip key={cat} color="can" onClick={()=>{handleNav(cat)}} label={cat} variant="outlined"/>
                        ))}
                    </Stack>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default CatalogueMenu;
