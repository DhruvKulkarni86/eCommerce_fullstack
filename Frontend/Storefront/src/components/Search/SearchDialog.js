import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Stack, Alert, CircularProgress, Typography, IconButton } from '@mui/material'
import React, {useState} from 'react'
import { useGetSearchQuery } from '../../services/Prod';
import SearchIcon from '@mui/icons-material/Search';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DialogCard from './DialogCard';
import { Helmet } from 'react-helmet-async';


const SearchDialog = () => {
    const [open, setOpen] = useState(false)
    const [skip, setSkip] = useState(true)
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    // console.log("FILTERED", filteredData);
    // console.log("WORD", wordEntered);
    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };
    const handleClickOpen = () => {
        setOpen(true);
        setSkip(false);
    };
    
    const handleClose = () => {
        clearInput();
        setOpen(false);
        setSkip(true);
    };

    const {data, error, isLoading, isSuccess} = useGetSearchQuery({id:''}, {skip});

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
        return value.Name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if(searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    

    return (
        <>
        <Button onClick={handleClickOpen} sx={{marginY:'16px', display:{xs:'none', md:'block'}}}>
            Search
        </Button>
        <IconButton onClick={handleClickOpen} aria-label='search' sx={{display:{xs:'block', md:'none'}, marginTop:0.8}}>
            <SearchIcon color='primary' fontSize='12px'/>
        </IconButton>
        <Dialog open={open} fullWidth maxWidth='sm' onClose={handleClose}>
            <Helmet>
                <title>Search : {wordEntered}</title>
            </Helmet>
            <DialogTitle sx={{color:'primary.main'}}>Find your favourite product</DialogTitle>
            <DialogContent>
            {isLoading && 
                <Stack direction='row' justifyContent='center' sx={{width:'100%'}}>
                    <CircularProgress color='success'/>
                </Stack>
            }
            {error && 
                <Stack direction='row' justifyContent='center' sx={{width:'100%'}}>
                    <Alert severity='error'>Error Occured, please try again!</Alert>
                </Stack>
            }
            {isSuccess===true && 
                <DialogContent>
                {/* <Box component='form' noValidate></Box> */}
                    <TextField
                    disabled={data.length===0}
                    autoFocus
                    margin="dense"
                    id="search"
                    label="Search..."
                    type="text"
                    fullWidth
                    variant='outlined'
                    value={wordEntered}
                    onChange={handleFilter}
                    />
                    <Box sx={{height:'200px', width:'100%'}}>
                        {filteredData.length !== 0 && (
                            <Stack direction='column' spacing={1.5} sx={{paddingY:2}}>
                                {filteredData.slice(0, 15).map((value, key) => {
                                    return (
                                        <DialogCard id={value._id} key={value._id} name={value.Name} price={value.Price} sub={value.SubCategory} img={value.BrowseImg} handleClose={handleClose}/>
                                    // </a>
                                    );
                                })}
                            </Stack>
                        )}
                        {(filteredData.length===0 && wordEntered!=="") && (
                            <Stack direction='column' spacing={1} alignItems='center' sx={{paddingY:5}}>
                                <CancelOutlinedIcon color='primary' sx={{fontSize:50}}/>
                                <Typography color='primary' textAlign='center' sx={{typography:{xs:'body1', sm:'h6'}}}>
                                    Your search matched no results.
                                </Typography>
                            </Stack>
                        )}
                    </Box>
                </DialogContent>
            }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

export default SearchDialog