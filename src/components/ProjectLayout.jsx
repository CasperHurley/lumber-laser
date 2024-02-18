import {useState} from 'react'
import {PropTypes} from 'prop-types'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DangerousIcon from '@mui/icons-material/Dangerous'

function ProjectLayout({cutPlans, mixedPlan}) {
    const [showMixed, setShowMixed] = useState(false)

    const handleSwitchChange = ({target: {name, checked}}) => {
        switch(name) {
            case "mix-board-lengths":
                setShowMixed(checked)
                break;
            default:
                break;
        }
    }

    return ( 
        <Grid container>
            <Grid item>
                <FormGroup>
                    <FormControlLabel control={<Switch onChange={handleSwitchChange} name="mix-board-lengths"/>} label="Mix board lengths" />
                </FormGroup>
            </Grid>
            {
                showMixed ?
                <Grid container>
                    <Grid item>
                        <Card>
                            <CardHeader title="Mixed Stock Lengths" />
                            <CardContent>
                                {
                                    [...mixedPlan.keys()].sort((a, b) => parseInt(a) - parseInt(b)).map(stockLength => (
                                        <Grid container direction="column" key={stockLength}>
                                            <Grid item>
                                                <Typography>{stockLength}&quot; Boards</Typography>
                                            </Grid>
                                            <Grid item>
                                                <List>
                                                    {mixedPlan.get(stockLength).map((board, index) => (
                                                        <ListItem key={`${stockLength}-${index}`}>
                                                            <ListItemText 
                                                                primary={`Board ${index+1}`}
                                                                secondary={board.join('" ')+'"'}
                                                            />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Grid>
                                        </Grid>
                                    ))
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                :
                <Grid item>
                    <Grid container spacing={2}>
                        {cutPlans.map(({stockBoardLength, boards}) => (
                            <Grid item xs={4} key={stockBoardLength}>
                                <Card>
                                    <CardHeader 
                                        title={`${stockBoardLength}" Stock Length`}
                                        avatar={boards ? <CheckCircleIcon color="success" /> : <DangerousIcon color="disabled" />}
                                    />
                                    <CardContent>
                                        {
                                            boards ?
                                            <List>
                                                {boards.map((board, index) => (
                                                    <ListItem key={`${stockBoardLength}-${index}`}>
                                                        <ListItemText 
                                                            primary={`Board ${index+1}`}
                                                            secondary={board.join('" ')+'"'}
                                                        />
                                                    </ListItem>
                                                ))}
                                            </List>
                                            :
                                            <Typography>{stockBoardLength}&quot; boards are too short for this project.</Typography>
                                        }
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            }
        </Grid> 
    );
}

ProjectLayout.propTypes = {
    cutPlans: PropTypes.array,
    mixedPlan: PropTypes.map
}

export default ProjectLayout;