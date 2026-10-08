// import { Card, CardContent, Grid, Typography } from '@mui/material'
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router';
// import { getActivities } from '../services/api';

// const ActivityList = () => {
//   const [activities, setActivities] = useState([]);
//   const navigate = useNavigate();

//   const fetchActivities = async () => {
//     try {
//       const response = await getActivities();
//       setActivities(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchActivities();
//   }, []);
//   return (
//     <Grid container spacing={2}>
//       {activities.map((activity) => (
//         <Grid key={activity.id}   container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//             <Card sx={{cursor: 'pointer'}}
//             onClick= {() => navigate(`/activites/${activity.id}`)}>
//                 <CardContent>
//                   <Typography variant='h6'>{activity.type}</Typography>
//                   <Typography>Duration: {activity.duration}</Typography>
//                   <Typography>Calories: {activity.caloriesBurned}</Typography>
//                 </CardContent>
//             </Card>
//         </Grid>
//       ))}
//   </Grid>
//   )
// }

// export default ActivityList





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router';

// import {
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   Stack,
//   Chip,
//   CircularProgress,
// } from '@mui/material';

// import {
//   DirectionsRun,
//   DirectionsWalk,
//   DirectionsBike,
//   Timer,
//   LocalFireDepartment,
//   ArrowForward,
// } from '@mui/icons-material';

// import { getActivities } from '../services/api';


// const ActivityList = () => {

//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();


//   const fetchActivities = async () => {
//     try {
//       setLoading(true);

//       const response = await getActivities();

//       setActivities(response.data);

//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchActivities();
//   }, []);


//   const getActivityIcon = (type) => {
//     switch (type) {
//       case 'WALKING':
//         return <DirectionsWalk />;

//       case 'CYCLING':
//         return <DirectionsBike />;

//       default:
//         return <DirectionsRun />;
//     }
//   };


//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: 300,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }


//   if (activities.length === 0) {
//     return (
//       <Box
//         sx={{
//           textAlign: 'center',
//           py: 8,
//         }}
//       >
//         <Typography
//           variant="h6"
//           fontWeight={700}
//         >
//           No activities yet
//         </Typography>

//         <Typography
//           color="text.secondary"
//           sx={{ mt: 1 }}
//         >
//           Add your first workout to start tracking your progress.
//         </Typography>
//       </Box>
//     );
//   }


//   return (
//     <Box sx={{ width: '100%' }}>

//       {/* HEADER */}
//       <Box sx={{ mb: 3 }}>
//         <Typography
//           variant="h5"
//           fontWeight={800}
//         >
//           Your Activities
//         </Typography>

//         <Typography
//           variant="body2"
//           color="text.secondary"
//           sx={{ mt: 0.5 }}
//         >
//           Track your workouts and view AI-powered insights.
//         </Typography>
//       </Box>


//       {/* ACTIVITY CARDS */}
//       <Grid container spacing={2.5}>

//         {activities.map((activity) => (

//           <Grid
//             key={activity.id}
//             size={{ xs: 12, sm: 6, md: 4 }}
//           >

//             <Card
//               onClick={() =>
//                 navigate(`/activites/${activity.id}`)
//               }
//               elevation={0}
//               sx={{
//                 height: '100%',
//                 cursor: 'pointer',
//                 borderRadius: 4,
//                 border: '1px solid',
//                 borderColor: 'divider',
//                 overflow: 'hidden',

//                 transition:
//                   'transform 0.25s ease, box-shadow 0.25s ease',

//                 '&:hover': {
//                   transform: 'translateY(-6px)',
//                   boxShadow:
//                     '0 16px 35px rgba(0,0,0,0.10)',

//                   '& .activity-arrow': {
//                     transform: 'translateX(5px)',
//                   },
//                 },
//               }}
//             >

//               {/* TOP SECTION */}
//               <Box
//                 sx={{
//                   p: 2.5,
//                   background:
//                     'linear-gradient(135deg, rgba(99,102,241,0.13), rgba(168,85,247,0.05))',
//                 }}
//               >

//                 <Stack
//                   direction="row"
//                   justifyContent="space-between"
//                   alignItems="center"
//                 >

//                   {/* ICON */}
//                   <Box
//                     sx={{
//                       width: 52,
//                       height: 52,
//                       borderRadius: 3,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       bgcolor: 'primary.main',
//                       color: 'white',
//                       boxShadow:
//                         '0 8px 18px rgba(99,102,241,0.25)',
//                     }}
//                   >
//                     {getActivityIcon(activity.type)}
//                   </Box>


//                   {/* TYPE */}
//                   <Chip
//                     label={activity.type}
//                     size="small"
//                     sx={{
//                       fontWeight: 700,
//                       borderRadius: 2,
//                     }}
//                   />

//                 </Stack>

//               </Box>


//               {/* CONTENT */}
//               <CardContent sx={{ p: 2.5 }}>

//                 <Typography
//                   variant="h6"
//                   fontWeight={800}
//                   sx={{ mb: 2 }}
//                 >
//                   {activity.type}
//                 </Typography>


//                 {/* STATS */}
//                 <Stack spacing={1.5}>

//                   {/* DURATION */}
//                   <Stack
//                     direction="row"
//                     alignItems="center"
//                     spacing={1.5}
//                   >

//                     <Box
//                       sx={{
//                         width: 34,
//                         height: 34,
//                         borderRadius: 2,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         bgcolor: 'action.hover',
//                       }}
//                     >
//                       <Timer fontSize="small" />
//                     </Box>

//                     <Box>
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                       >
//                         Duration
//                       </Typography>

//                       <Typography
//                         fontWeight={700}
//                       >
//                         {activity.duration} minutes
//                       </Typography>
//                     </Box>

//                   </Stack>


//                   {/* CALORIES */}
//                   <Stack
//                     direction="row"
//                     alignItems="center"
//                     spacing={1.5}
//                   >

//                     <Box
//                       sx={{
//                         width: 34,
//                         height: 34,
//                         borderRadius: 2,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         bgcolor: 'action.hover',
//                       }}
//                     >
//                       <LocalFireDepartment fontSize="small" />
//                     </Box>

//                     <Box>
//                       <Typography
//                         variant="caption"
//                         color="text.secondary"
//                       >
//                         Calories Burned
//                       </Typography>

//                       <Typography
//                         fontWeight={700}
//                       >
//                         {activity.caloriesBurner ??
//                           activity.caloriesBurned}{' '}
//                         kcal
//                       </Typography>
//                     </Box>

//                   </Stack>

//                 </Stack>


//                 {/* FOOTER */}
//                 <Stack
//                   direction="row"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   sx={{
//                     mt: 2.5,
//                     pt: 2,
//                     borderTop: '1px solid',
//                     borderColor: 'divider',
//                   }}
//                 >

//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                   >
//                     View details
//                   </Typography>

//                   <ArrowForward
//                     className="activity-arrow"
//                     fontSize="small"
//                     sx={{
//                       transition:
//                         'transform 0.25s ease',
//                     }}
//                   />

//                 </Stack>

//               </CardContent>

//             </Card>

//           </Grid>

//         ))}

//       </Grid>

//     </Box>
//   );
// };


// export default ActivityList;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Stack,
  Chip,
  CircularProgress,
} from '@mui/material';

import {
  DirectionsRun,
  DirectionsWalk,
  DirectionsBike,
  Timer,
  LocalFireDepartment,
  ArrowForward,
} from '@mui/icons-material';

import { getActivities } from '../services/api';


const ActivityList = () => {

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  const fetchActivities = async () => {
    try {
      setLoading(true);

      const response = await getActivities();

      setActivities(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchActivities();
  }, []);


  const getActivityIcon = (type) => {
    switch (type) {
      case 'WALKING':
        return <DirectionsWalk />;

      case 'CYCLING':
        return <DirectionsBike />;

      default:
        return <DirectionsRun />;
    }
  };


  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }


  if (activities.length === 0) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          No activities yet
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Add your first workout to start tracking your progress.
        </Typography>
      </Box>
    );
  }


  return (
    <Box
      sx={{
        width: '100%',

        // Form aur list ke beech gap
        mt: 7,

        // Whole list entrance animation
        animation: 'fadeUp 0.6s ease-out',

        '@keyframes fadeUp': {
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

      {/* HEADER */}
      <Box
        sx={{
          mb: 3,

          animation: 'fadeIn 0.7s ease-out',

          '@keyframes fadeIn': {
            from: {
              opacity: 0,
            },
            to: {
              opacity: 1,
            },
          },
        }}
      >

        <Typography
          variant="h5"
          fontWeight={800}
        >
          Your Activities
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Track your workouts and view AI-powered insights.
        </Typography>

      </Box>


      {/* ACTIVITY CARDS */}
      <Grid container spacing={2.5}>

        {activities.map((activity, index) => (

          <Grid
            key={activity.id}
            size={{ xs: 12, sm: 6, md: 4 }}
          >

            <Card
              onClick={() =>
                navigate(`/activites/${activity.id}`)
              }

              elevation={0}

              sx={{
                height: '100%',
                cursor: 'pointer',

                borderRadius: 4,
                border: '1px solid',
                borderColor: 'divider',

                overflow: 'hidden',

                // Card starting state
                opacity: 0,

                // One by one animation
                animation:
                  'cardAppear 0.5s ease-out forwards',

                animationDelay: `${index * 0.08}s`,

                transition:
                  'transform 0.3s ease, box-shadow 0.3s ease',

                '@keyframes cardAppear': {
                  from: {
                    opacity: 0,
                    transform:
                      'translateY(25px) scale(0.97)',
                  },

                  to: {
                    opacity: 1,
                    transform:
                      'translateY(0) scale(1)',
                  },
                },

                '&:hover': {
                  transform:
                    'translateY(-7px)',

                  boxShadow:
                    '0 18px 40px rgba(0,0,0,0.12)',

                  '& .activity-arrow': {
                    transform:
                      'translateX(6px)',
                  },

                  '& .activity-icon': {
                    transform:
                      'scale(1.08) rotate(-3deg)',
                  },
                },
              }}
            >

              {/* TOP SECTION */}
              <Box
                sx={{
                  p: 2.5,

                  background:
                    'linear-gradient(135deg, rgba(99,102,241,0.13), rgba(168,85,247,0.05))',
                }}
              >

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >

                  {/* ICON */}
                  <Box
                    className="activity-icon"

                    sx={{
                      width: 52,
                      height: 52,

                      borderRadius: 3,

                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',

                      bgcolor: 'primary.main',
                      color: 'white',

                      boxShadow:
                        '0 8px 18px rgba(99,102,241,0.25)',

                      transition:
                        'transform 0.3s ease',
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </Box>


                  {/* TYPE */}
                  <Chip
                    label={activity.type}
                    size="small"

                    sx={{
                      fontWeight: 700,
                      borderRadius: 2,
                    }}
                  />

                </Stack>

              </Box>


              {/* CONTENT */}
              <CardContent
                sx={{
                  p: 2.5,
                }}
              >

                <Typography
                  variant="h6"
                  fontWeight={800}
                  sx={{
                    mb: 2,
                  }}
                >
                  {activity.type}
                </Typography>


                {/* STATS */}
                <Stack spacing={1.5}>

                  {/* DURATION */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                  >

                    <Box
                      sx={{
                        width: 34,
                        height: 34,

                        borderRadius: 2,

                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                        bgcolor: 'action.hover',
                      }}
                    >
                      <Timer fontSize="small" />
                    </Box>


                    <Box>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Duration
                      </Typography>

                      <Typography
                        fontWeight={700}
                      >
                        {activity.duration} minutes
                      </Typography>

                    </Box>

                  </Stack>


                  {/* CALORIES */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1.5}
                  >

                    <Box
                      sx={{
                        width: 34,
                        height: 34,

                        borderRadius: 2,

                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                        bgcolor: 'action.hover',
                      }}
                    >
                      <LocalFireDepartment
                        fontSize="small"
                      />
                    </Box>


                    <Box>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Calories Burned
                      </Typography>

                      <Typography
                        fontWeight={700}
                      >
                        {activity.caloriesBurner ??
                          activity.caloriesBurned}{' '}
                        kcal
                      </Typography>

                    </Box>

                  </Stack>

                </Stack>


                {/* FOOTER */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"

                  sx={{
                    mt: 2.5,
                    pt: 2,

                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    View details
                  </Typography>


                  <ArrowForward
                    className="activity-arrow"

                    fontSize="small"

                    sx={{
                      transition:
                        'transform 0.25s ease',
                    }}
                  />

                </Stack>

              </CardContent>

            </Card>

          </Grid>

        ))}

      </Grid>

    </Box>
  );
};


export default ActivityList;