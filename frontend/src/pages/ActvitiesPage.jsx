import React, { useState } from 'react';

import {
    Box,
    Typography,
    Stack,
    Chip,
    Paper,
    Grid,
    Button,
    Divider,
} from '@mui/material';

import {
    AutoAwesome,
    FitnessCenter,
    LocalFireDepartment,
    TrendingUp,
    Timeline,
    Add,
    EmojiEvents,
    Bolt,
    ArrowDownward,
} from '@mui/icons-material';

import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';


const ActvitiesPage = () => {

    const [refreshKey, setRefreshKey] = useState(0);
    const [showForm, setShowForm] = useState(false);


    const handleActivityAdded = () => {
        setRefreshKey((prev) => prev + 1);
        setShowForm(false);
    };


    return (
        <Box
            sx={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',

                background:
                    'linear-gradient(135deg, #f8f9ff 0%, #ffffff 45%, #f5f3ff 100%)',

                pb: 8,
            }}
        >

            {/* ================================================= */}
            {/* BACKGROUND DECORATIONS */}
            {/* ================================================= */}

            <Box
                sx={{
                    position: 'absolute',
                    width: 450,
                    height: 450,
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)',
                    top: -180,
                    right: -120,
                    filter: 'blur(10px)',
                    pointerEvents: 'none',

                    animation: 'floatOne 8s ease-in-out infinite',

                    '@keyframes floatOne': {
                        '0%, 100%': {
                            transform: 'translate(0, 0)',
                        },
                        '50%': {
                            transform: 'translate(-20px, 25px)',
                        },
                    },
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    width: 350,
                    height: 350,
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(168,85,247,0.12), transparent 70%)',
                    top: 500,
                    left: -180,
                    filter: 'blur(10px)',
                    pointerEvents: 'none',

                    animation: 'floatTwo 10s ease-in-out infinite',

                    '@keyframes floatTwo': {
                        '0%, 100%': {
                            transform: 'translate(0, 0)',
                        },
                        '50%': {
                            transform: 'translate(25px, -20px)',
                        },
                    },
                }}
            />


            {/* ================================================= */}
            {/* MAIN CONTAINER */}
            {/* ================================================= */}

            <Box
                sx={{
                    maxWidth: 1250,
                    mx: 'auto',
                    px: { xs: 2, sm: 3, md: 4 },
                    pt: { xs: 3, md: 5 },
                    position: 'relative',
                    zIndex: 1,
                }}
            >


                {/* ================================================= */}
                {/* HERO */}
                {/* ================================================= */}

                <Paper
                    elevation={0}
                    sx={{
                        position: 'relative',
                        overflow: 'hidden',

                        borderRadius: 6,

                        p: {
                            xs: 3,
                            sm: 4,
                            md: 5,
                        },

                        mb: 4,

                        color: 'white',

                        background:
                            'linear-gradient(135deg, #312e81 0%, #4f46e5 45%, #7c3aed 100%)',

                        boxShadow:
                            '0 25px 60px rgba(79,70,229,0.25)',

                        animation:
                            'heroAppear 0.7s ease-out',

                        '@keyframes heroAppear': {
                            from: {
                                opacity: 0,
                                transform: 'translateY(-25px) scale(0.98)',
                            },
                            to: {
                                opacity: 1,
                                transform: 'translateY(0) scale(1)',
                            },
                        },
                    }}
                >

                    {/* HERO DECORATION */}
                    <Box
                        sx={{
                            position: 'absolute',
                            width: 300,
                            height: 300,
                            borderRadius: '50%',
                            background:
                                'rgba(255,255,255,0.08)',
                            right: -100,
                            top: -120,
                        }}
                    />

                    <Box
                        sx={{
                            position: 'absolute',
                            width: 180,
                            height: 180,
                            borderRadius: '50%',
                            background:
                                'rgba(255,255,255,0.06)',
                            right: 120,
                            bottom: -100,
                        }}
                    />

                    <Stack
                        direction={{
                            xs: 'column',
                            md: 'row',
                        }}
                        spacing={4}
                        sx={{
                            justifyContent: 'space-between',
                            alignItems: {
                                xs: 'flex-start',
                                md: 'center',
                            },
                        }}
                    >

                        {/* HERO TEXT */}
                        <Box sx={{ maxWidth: 700 }}>

                            <Chip
                                icon={<AutoAwesome />}
                                label="AI POWERED FITNESS"
                                sx={{
                                    mb: 2,
                                    px: 1,
                                    fontWeight: 800,
                                    color: 'white',
                                    background:
                                        'rgba(255,255,255,0.14)',
                                    backdropFilter: 'blur(10px)',
                                    border:
                                        '1px solid rgba(255,255,255,0.18)',
                                }}
                            />

                            <Typography
                                variant="h2"
                                fontWeight={900}
                                sx={{
                                    fontSize: {
                                        xs: '2.2rem',
                                        sm: '3rem',
                                        md: '4rem',
                                    },

                                    lineHeight: 1.05,

                                    letterSpacing: '-2px',
                                }}
                            >
                                Train smarter.
                                <br />
                                <Box
                                    component="span"
                                    sx={{
                                        color: '#c4b5fd',
                                    }}
                                >
                                    Get stronger.
                                </Box>
                            </Typography>


                            <Typography
                                sx={{
                                    mt: 2,
                                    maxWidth: 600,
                                    color: 'rgba(255,255,255,0.78)',
                                    fontSize: {
                                        xs: '0.95rem',
                                        md: '1.05rem',
                                    },
                                    lineHeight: 1.7,
                                }}
                            >
                                Track every workout, understand your performance,
                                and get personalized recommendations powered by AI.
                            </Typography>


                            {/* HERO ACTIONS */}
                            <Stack
                                direction={{
                                    xs: 'column',
                                    sm: 'row',
                                }}
                                spacing={1.5}
                                sx={{ mt: 3 }}
                            >

                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    onClick={() => setShowForm((prev) => !prev)}
                                    sx={{
                                        px: 3,
                                        py: 1.3,
                                        borderRadius: 3,
                                        textTransform: 'none',
                                        fontWeight: 800,

                                        color: '#4338ca',
                                        bgcolor: 'white',

                                        '&:hover': {
                                            bgcolor: '#f5f3ff',
                                            transform: 'translateY(-2px)',
                                        },

                                        transition:
                                            'all 0.25s ease',
                                    }}
                                >
                                    {showForm
                                        ? 'Close Tracker'
                                        : 'Track New Activity'}
                                </Button>



                            </Stack>

                        </Box>


                        {/* HERO ICON */}
                        <Box
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'flex',
                                },

                                width: 180,
                                height: 180,

                                borderRadius: '50%',

                                alignItems: 'center',
                                justifyContent: 'center',

                                background:
                                    'rgba(255,255,255,0.1)',

                                backdropFilter:
                                    'blur(15px)',

                                border:
                                    '1px solid rgba(255,255,255,0.15)',

                                animation:
                                    'heroIcon 4s ease-in-out infinite',

                                '@keyframes heroIcon': {
                                    '0%, 100%': {
                                        transform: 'translateY(0) rotate(0deg)',
                                    },
                                    '50%': {
                                        transform: 'translateY(-12px) rotate(3deg)',
                                    },
                                },
                            }}
                        >

                            <FitnessCenter
                                sx={{
                                    fontSize: 80,
                                    color: 'white',
                                }}
                            />

                        </Box>

                    </Stack>

                </Paper>


                {/* ================================================= */}
                {/* QUICK STATS */}
                {/* ================================================= */}

                <Grid
                    container
                    spacing={2}
                    sx={{
                        mb: 4,
                    }}
                >







                </Grid>


                {/* ================================================= */}
                {/* ACTIVITY FORM */}
                {/* ================================================= */}

                <Box
                    sx={{
                        display: showForm
                            ? 'block'
                            : 'none',

                        mb: 5,

                        animation:
                            'formSlide 0.45s ease-out',

                        '@keyframes formSlide': {
                            from: {
                                opacity: 0,
                                transform: 'translateY(-15px)',
                            },
                            to: {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        },
                    }}
                >

                    <Box
                        sx={{
                            position: 'relative',

                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                inset: -2,
                                borderRadius: 6,
                                background:
                                    'linear-gradient(135deg, #6366f1, #a855f7)',
                                zIndex: -1,
                                opacity: 0.18,
                                filter: 'blur(12px)',
                            },
                        }}
                    >

                        <ActivityForm
                            onActivityAdded={handleActivityAdded}
                        />

                    </Box>

                </Box>




                {/* ================================================= */}
                {/* ACTIVITY LIST */}
                {/* ================================================= */}

                <Box
                    key={refreshKey}
                    sx={{
                        animation:
                            'activitiesAppear 0.6s ease-out',

                        '@keyframes activitiesAppear': {
                            from: {
                                opacity: 0,
                                transform: 'translateY(20px)',
                            },
                            to: {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        },
                    }}
                >

                    <ActivityList />

                </Box>


                {/* ================================================= */}
                {/* BOTTOM MOTIVATION */}
                {/* ================================================= */}

                <Paper
                    elevation={0}
                    sx={{
                        mt: 6,
                        p: {
                            xs: 3,
                            md: 4,
                        },

                        borderRadius: 5,

                        background:
                            'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.08))',

                        border:
                            '1px solid rgba(99,102,241,0.12)',
                    }}
                >
                    <Stack
                        direction={{
                            xs: 'column',
                            md: 'row',
                        }}
                        spacing={4}
                        sx={{
                            justifyContent: 'space-between',
                            alignItems: {
                                xs: 'flex-start',
                                md: 'center',
                            },
                        }}
                    >

                        <Box>

                            <Typography
                                variant="h6"
                                fontWeight={900}
                            >
                                Consistency beats intensity.
                            </Typography>

                            <Typography
                                color="text.secondary"
                                sx={{
                                    mt: 0.5,
                                }}
                            >
                                One workout at a time. Keep building.
                            </Typography>

                        </Box>


                        <ArrowDownward
                            sx={{
                                color: 'primary.main',
                                animation:
                                    'bounce 1.5s ease-in-out infinite',

                                '@keyframes bounce': {
                                    '0%, 100%': {
                                        transform: 'translateY(0)',
                                    },
                                    '50%': {
                                        transform: 'translateY(6px)',
                                    },
                                },
                            }}
                        />

                    </Stack>

                </Paper>

            </Box>

        </Box>
    );
};




export default ActvitiesPage;