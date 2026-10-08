// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router'
// import { getActivityDetail } from '../services/api';
// import { Box, Card, CardContent, Divider, Typography } from '@mui/material';

// const ActivityDetail = () => {
//   const { id } = useParams();
//   const [activity, setActivity] = useState(null);
//   const [recommendation, setRecommendation] = useState(null);

//   useEffect(() => {
//     const fetchActivityDetail = async () => {
//       try {
//         const response = await getActivityDetail(id);
//         setActivity(response.data);
//         setRecommendation(response.data.recommendation);
//       } catch (error) {
//         console.error(error);
//       }
//     }

//     fetchActivityDetail();
//   }, [id]);

//   if (!activity) {
//     return <Typography>Loading...</Typography>
//   }
//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
//       <Card sx={{ mb: 2 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom>Activity Details</Typography>
//           <Typography>Type: {activity.type}</Typography>
//           <Typography>Duration: {activity.duration} minutes</Typography>
//           <Typography>Calories Burned: {activity.caloriesBurned}</Typography>
//           <Typography>Date: {new Date(activity.createdAt).toLocaleString()}</Typography>
//         </CardContent>
//       </Card>

//       {recommendation && (
//         <Card>
//           <CardContent>
//             <Typography variant="h5" gutterBottom>AI Recommendation</Typography>
//             <Typography variant="h6">Analysis</Typography>
//             <Typography component="p">{activity.recommendation}</Typography>

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="h6">Improvements</Typography>
//             {activity?.improvement?.map((improvement, index) => (
//                 <Typography key={index} component="p">• {activity.improvement}</Typography>
//               ))}

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="h6">Suggestions</Typography>
//             {activity?.suggestion?.map((suggestion, index) => (
//               <Typography key={index} component="p">• {suggestion}</Typography>
//             ))}

//             <Divider sx={{ my: 2 }} />

//             <Typography variant="h6">Safety Guidelines</Typography>
//             {activity?.safety?.map((safety, index) => (
//               <Typography key={index} component="p">• {safety}</Typography>
//             ))}
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   )
// }

// export default ActivityDetail





import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getActivityDetail } from '../services/api';

import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  CircularProgress,
  Paper,
} from '@mui/material';

import {
  DirectionsRun,
  Timer,
  LocalFireDepartment,
  CalendarMonth,
  AutoAwesome,
  TrendingUp,
  FitnessCenter,
  Security,
} from '@mui/icons-material';

const ActivityDetail = () => {
  const { id } = useParams();

  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityDetail(id);

        setActivity(response.data);
        setRecommendation(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchActivityDetail();
  }, [id]);

  if (!activity) {
    return (
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography color="text.secondary">
          Loading activity...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1100,
        mx: 'auto',
        px: { xs: 2, md: 3 },
        py: { xs: 3, md: 5 },
      }}
    >

      {/* HEADER */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          gap={2}
        >
          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{
                letterSpacing: '-0.5px',
              }}
            >
              Activity Details
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Track your performance and get AI-powered insights.
            </Typography>
          </Box>

          <Chip
            icon={<DirectionsRun />}
            label={activity.type}
            sx={{
              fontWeight: 700,
              px: 1,
              borderRadius: 2,
            }}
          />
        </Stack>
      </Box>


      {/* ACTIVITY STATS */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>

        {/* TYPE */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              background:
                'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(99,102,241,0.02))',
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                  }}
                >
                  <FitnessCenter />
                </Paper>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Activity
                  </Typography>

                  <Typography fontWeight={800}>
                    {activity.type}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>


        {/* DURATION */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              background:
                'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(14,165,233,0.02))',
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                  }}
                >
                  <Timer />
                </Paper>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Duration
                  </Typography>

                  <Typography fontWeight={800}>
                    {activity.duration} min
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>


        {/* CALORIES */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              background:
                'linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.02))',
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                  }}
                >
                  <LocalFireDepartment />
                </Paper>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Calories
                  </Typography>

                  <Typography fontWeight={800}>
                    {activity.caloriesBurner ?? activity.caloriesBurned} kcal
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>


        {/* DATE */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            elevation={0}
            sx={{
              height: '100%',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
              background:
                'linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.02))',
            }}
          >
            <CardContent>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    display: 'flex',
                  }}
                >
                  <CalendarMonth />
                </Paper>

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Date
                  </Typography>

                  <Typography fontWeight={700}>
                    {new Date(activity.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

      </Grid>


      {/* AI SECTION */}
      {recommendation && (
        <Card
          elevation={0}
          sx={{
            borderRadius: 5,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >

          {/* AI HEADER */}
          <Box
            sx={{
              px: { xs: 2.5, md: 4 },
              py: 3,
              background:
                'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08))',
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">

              <Paper
                elevation={0}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AutoAwesome />
              </Paper>

              <Box>
                <Typography variant="h5" fontWeight={800}>
                  AI Fitness Insights
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Personalized analysis generated from your activity.
                </Typography>
              </Box>

            </Stack>
          </Box>


          <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>

            {/* ANALYSIS */}
            <Section
              icon={<TrendingUp />}
              title="Performance Analysis"
            >
              <Typography
                component="p"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                }}
              >
                {recommendation.recommendation ||
                  'No detailed analysis available.'}
              </Typography>
            </Section>


            <Divider sx={{ my: 3 }} />


            {/* IMPROVEMENTS */}
            <Section
              icon={<TrendingUp />}
              title="Areas for Improvement"
            >
              {recommendation?.improvement?.length ? (
                <Stack spacing={1.5}>
                  {recommendation.improvement.map(
                    (improvement, index) => (
                      <InsightItem
                        key={index}
                        text={improvement}
                      />
                    )
                  )}
                </Stack>
              ) : (
                <Typography color="text.secondary">
                  No specific improvements provided.
                </Typography>
              )}
            </Section>


            <Divider sx={{ my: 3 }} />


            {/* SUGGESTIONS */}
            <Section
              icon={<FitnessCenter />}
              title="Recommended Workouts"
            >
              {recommendation?.suggestion?.length ? (
                <Stack spacing={1.5}>
                  {recommendation.suggestion.map(
                    (suggestion, index) => (
                      <InsightItem
                        key={index}
                        text={suggestion}
                      />
                    )
                  )}
                </Stack>
              ) : (
                <Typography color="text.secondary">
                  No specific suggestions provided.
                </Typography>
              )}
            </Section>


            <Divider sx={{ my: 3 }} />


            {/* SAFETY */}
            <Section
              icon={<Security />}
              title="Safety Guidelines"
            >
              {recommendation?.safety?.length ? (
                <Stack spacing={1.5}>
                  {recommendation.safety.map(
                    (safety, index) => (
                      <InsightItem
                        key={index}
                        text={safety}
                      />
                    )
                  )}
                </Stack>
              ) : (
                <Typography color="text.secondary">
                  No specific safety recommendations provided.
                </Typography>
              )}
            </Section>

          </CardContent>
        </Card>
      )}

    </Box>
  );
};


/* SECTION COMPONENT */
const Section = ({ icon, title, children }) => {
  return (
    <Box>
      <Stack
        direction="row"
        spacing={1.2}
        alignItems="center"
        sx={{ mb: 2 }}
      >
        {icon}

        <Typography
          variant="h6"
          fontWeight={800}
        >
          {title}
        </Typography>
      </Stack>

      {children}
    </Box>
  );
};


/* INSIGHT ITEM */
const InsightItem = ({ text }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.2s ease',

        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 2,
        },
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="flex-start">

        <Box
          sx={{
            mt: 0.7,
            width: 7,
            height: 7,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            flexShrink: 0,
          }}
        />

        <Typography
          component="p"
          sx={{
            lineHeight: 1.7,
            color: 'text.secondary',
          }}
        >
          {text}
        </Typography>

      </Stack>
    </Paper>
  );
};


export default ActivityDetail;