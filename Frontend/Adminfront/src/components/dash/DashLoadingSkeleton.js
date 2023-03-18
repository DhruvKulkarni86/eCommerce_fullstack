import { Box, Skeleton, Stack } from "@mui/material";
import React from "react";

const DashLoadingSkeleton = () => {
    return (
        <>
            <Box sx={{ display: "flex", gap: "45px", height: 150, width: 245, pt: 8 }}>
                {[...Array(4)].map((_, idx) => (
                    <Stack key={idx} direction="row">
                        <Skeleton
                            key={idx}
                            animation="wave"
                            variant="rectangular"
                            height={150}
                            width={245}
                            sx={{ borderRadius: 3 }}
                        />
                    </Stack>
                ))}
            </Box>
            <Box sx={{ display: "flex", gap: "30px", pt: 8 }}>
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={300}
                    width={"74vw"}
                    sx={{ borderRadius: 3 }}
                />
            </Box>
            <Box sx={{ display: "flex", gap: "30px" }}>
                <Box>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={460}
                        width={400}
                        sx={{ borderRadius: 3 }}
                    />
                </Box>
                <Box>
                    <Skeleton
                        animation="wave"
                        variant="rectangular"
                        height={465}
                        width={690}
                        sx={{ borderRadius: 3 }}
                    />
                </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "30px", width: "73vw" }}>
                <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={450}
                    width={"73vw"}
                    sx={{ borderRadius: 3 }}
                />
            </Box>
        </>
    );
};

export default React.memo(DashLoadingSkeleton);
