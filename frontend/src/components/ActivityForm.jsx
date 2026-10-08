// import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
// import React, { useState } from 'react'
// import { addActivity } from '../services/api'


// const ActivityForm = ({ onActivityAdded }) => {

//     // const [activity, setActivity] = useState({
//     //     type: "RUNNING", duration: '', caloriesBurned: '',
//     //     additionalMetrics: {}
//     // });


//     const [activity, setActivity] = useState({
//         type: "RUNNING",
//         duration: '',
//         caloriesBurner: '',
//         additionalMetrics: {}
//     });



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await addActivity(activity);
//             if (onActivityAdded) {
//                 onActivityAdded();
//             }
//             setActivity({ type: "RUNNING", duration: '', caloriesBurner: '' });
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     return (
//         <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
//             <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Activity Type</InputLabel>
//                 <Select
//                     value={activity.type}
//                     onChange={(e) => setActivity({ ...activity, type: e.target.value })}>
//                     <MenuItem value="RUNNING">Running</MenuItem>
//                     <MenuItem value="WALKING">Walking</MenuItem>
//                     <MenuItem value="CYCLING">Cycling</MenuItem>
//                 </Select>
//             </FormControl>
//             <TextField fullWidth
//                 label="Duration (Minutes)"
//                 type='number'
//                 sx={{ mb: 2 }}
//                 value={activity.duration}
//                 onChange={(e) => setActivity({ ...activity, duration: e.target.value })} />

//             <TextField fullWidth
//                 label="Calories Burned"
//                 type='number'
//                 sx={{ mb: 2 }}
//                 value={activity.caloriesBurner}
//                 onChange={(e) => setActivity({ ...activity, caloriesBurner: e.target.value })} />

//             <Button type='submit' variant='contained'>
//                 Add Activity
//             </Button>
//         </Box>
//     )
// }

// export default ActivityForm




import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  InputAdornment,
} from '@mui/material';

import {
  Add,
  DirectionsRun,
  DirectionsWalk,
  DirectionsBike,
  Timer,
  LocalFireDepartment,
  FitnessCenter,
} from '@mui/icons-material';

import { addActivity } from '../services/api';


const ActivityForm = ({ onActivityAdded }) => {

  const [activity, setActivity] = useState({
    type: 'RUNNING',
    duration: '',
    caloriesBurner: '',
    additionalMetrics: {},
  });

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!activity.duration || !activity.caloriesBurner) {
      return;
    }

    try {
      setLoading(true);

      await addActivity({
        ...activity,
        duration: Number(activity.duration),
        caloriesBurner: Number(activity.caloriesBurner),
      });

      if (onActivityAdded) {
        onActivityAdded();
      }

      setActivity({
        type: 'RUNNING',
        duration: '',
        caloriesBurner: '',
        additionalMetrics: {},
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const getActivityIcon = () => {
    switch (activity.type) {
      case 'WALKING':
        return <DirectionsWalk />;
      case 'CYCLING':
        return <DirectionsBike />;
      default:
        return <DirectionsRun />;
    }
  };


  return (
    <Card
      elevation={0}
      sx={{
        maxWidth: 650,
        mx: 'auto',
        borderRadius: 5,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
      }}
    >

      {/* HEADER */}
      <Box
        sx={{
          px: { xs: 2.5, md: 4 },
          py: 3,
          background:
            'linear-gradient(135deg, rgba(99,102,241,0.16), rgba(168,85,247,0.08))',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >

          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'primary.main',
              color: 'white',
              boxShadow: '0 8px 20px rgba(99,102,241,0.3)',
            }}
          >
            <FitnessCenter />
          </Box>

          <Box>
            <Typography
              variant="h5"
              fontWeight={800}
            >
              Track Your Activity
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 0.5 }}
            >
              Record your workout and get AI-powered insights.
            </Typography>
          </Box>

        </Stack>
      </Box>


      {/* FORM */}
      <CardContent
        component="form"
        onSubmit={handleSubmit}
        sx={{
          p: { xs: 2.5, md: 4 },
        }}
      >

        <Stack spacing={2.5}>

          {/* ACTIVITY TYPE */}
          <FormControl fullWidth>
            <InputLabel>Activity Type</InputLabel>

            <Select
              value={activity.type}
              label="Activity Type"
              onChange={(e) =>
                setActivity({
                  ...activity,
                  type: e.target.value,
                })
              }
              startAdornment={
                <InputAdornment position="start">
                  {getActivityIcon()}
                </InputAdornment>
              }
              sx={{
                borderRadius: 3,
              }}
            >
              <MenuItem value="RUNNING">
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <DirectionsRun />
                  <span>Running</span>
                </Stack>
              </MenuItem>

              <MenuItem value="WALKING">
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <DirectionsWalk />
                  <span>Walking</span>
                </Stack>
              </MenuItem>

              <MenuItem value="CYCLING">
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                >
                  <DirectionsBike />
                  <span>Cycling</span>
                </Stack>
              </MenuItem>
            </Select>
          </FormControl>


          {/* DURATION */}
          <TextField
            fullWidth
            label="Duration"
            placeholder="Enter workout duration"
            type="number"
            value={activity.duration}
            onChange={(e) =>
              setActivity({
                ...activity,
                duration: e.target.value,
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Timer />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  min
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />


          {/* CALORIES */}
          <TextField
            fullWidth
            label="Calories Burned"
            placeholder="Enter calories burned"
            type="number"
            value={activity.caloriesBurner}
            onChange={(e) =>
              setActivity({
                ...activity,
                caloriesBurner: e.target.value,
              })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocalFireDepartment />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  kcal
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />


          {/* SUBMIT */}
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={
              loading ||
              !activity.duration ||
              !activity.caloriesBurner
            }
            startIcon={
              loading ? null : <Add />
            }
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 3,
              fontSize: '1rem',
              fontWeight: 700,
              textTransform: 'none',
              background:
                'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow:
                '0 8px 20px rgba(99,102,241,0.25)',
              '&:hover': {
                background:
                  'linear-gradient(135deg, #4f46e5, #7c3aed)',
                boxShadow:
                  '0 10px 25px rgba(99,102,241,0.35)',
              },
            }}
          >
            {loading ? 'Adding Activity...' : 'Add Activity'}
          </Button>

        </Stack>

      </CardContent>

    </Card>
  );
};


export default ActivityForm;