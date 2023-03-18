import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Dialog, DialogContent, IconButton, Skeleton, Stack } from '@mui/material';
import UserInvoice from './UserInvoice';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import { useSelector } from 'react-redux';
import { auth } from '../firebase/config';

const Feedback = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [orderID, setOrderID] = useState('')
    const [open, setOpen] = useState(false)

    let baseURL = process.env.REACT_APP_BACK_URL
    let token = localStorage.getItem('userToken')
    const user = useSelector((state) => state.user.value)


    const handleDialogClick = (id) => {
        setOrderID(id)
        setOpen(true)
    }

    const handleDialogClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (token !== null && user.userId !== null) {
            axios({
                url: `${baseURL}/customer/feedback`,
                headers: {
                    "X-Requested-With": "XMLHttpRequest",
                    Authorization: `Bearer ${token}`,
                },
                method: "GET",
            }).then((res) => {
                setLoading(false)
                setData(res.data);
            }).catch((e) => {
                if (e.response.status === 401 && user.userId !== null) {
                    auth.currentUser.getIdToken(true).then((token) => {
                        localStorage.setItem("userToken", token);
                        window.location.reload(false)
                    });
                }
            });
            return () => {
                setData([])
            }
        }
    }, [token, baseURL, user]);

    const LoadingSkeleton = () => (
        <Box sx={{ display: "flex", flexDirection: 'column', gap: "50px", pt: 5 }}>
            {[...Array(3)].map((_, idx) => (
                <Stack key={idx} direction='column'>
                    <Skeleton
                        key={idx}
                        animation="wave"
                        variant="rectangular"
                        height={200}
                        width={"70vw"}
                        sx={{ borderRadius: 2 }}
                    />
                </Stack>
            ))}
        </Box>
    );

    return (
        <Box sx={{ display: "flex", flexDirection: 'column', gap: "50px", minWidth: '70vw', maxWidth: '70vw' }}>

            {loading ? LoadingSkeleton() : (
                <>
                    <Typography variant='h4' color='primary' sx={{ fontWeight: 'bold', cursor: 'default', mb: -2 }}>
                        Customer Feedbacks
                    </Typography>
                    <Stack direction='column' spacing={4} alignSelf="flex-start" justifySelf="flex-start"
                        alignItems="flex-start" flexWrap='wrap'
                    >
                        {data.map((review, idx) =>
                            <Card variant="elevation" key={review.OrderId} elevation={3} sx={{ borderRadius: 2 }}>
                                <CardContent sx={{ p: 3, width: '70vw' }}>
                                    <Stack direction='row' spacing={1}>
                                    <Avatar sx={{bgcolor:`#999999`}}/>
                                    <Typography variant="body1" component="div">
                                        {review.CustomerEmail}
                                    </Typography>
                                    </Stack>
                                    <Typography sx={{ fontSize: 13, ml:6, mt:-2.2 }} color="text.secondary" gutterBottom>
                                        {review.OrderId}:
                                    </Typography>
                                    <Typography component='div' variant="body2" sx={{ mt: 3, fontSize: 15, wordBreak:'break-word'}}>
                                        {review.FeedbackText}
                                    </Typography>
                                </CardContent>
                                <CardActions sx={{ justifyContent: 'flex-end' }}>
                                    <Button variant='outlined' size="small" onClick={() => handleDialogClick(review.OrderId)}>View Order</Button>
                                </CardActions>
                            </Card>
                        )}
                        <Dialog open={open} onClose={() => handleDialogClose()}>
                            <DialogContent>
                                <IconButton onClick={() => handleDialogClose()} sx={{float:'right'}}>
                                    <ClearRoundedIcon color="primary" />
                                </IconButton>
                                <UserInvoice orderid={orderID} />
                            </DialogContent>
                        </Dialog>
                    </Stack>
                </>
            )}
        </Box>
    )
}

export default Feedback