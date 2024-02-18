import {useState} from 'react'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CarpenterIcon from '@mui/icons-material/Carpenter'

function MeasurementsForm({getProjectPlans}) {
    const [cutLengthsInput, setCutLengthsInput] = useState("")

    const getListFromInput = () => {
        return cutLengthsInput.split(", ").map(x => parseFloat(x))
    }

    const handleClickGo = () => {
        const cutLengthsList = getListFromInput()
        getProjectPlans(cutLengthsList)
    }

    return (
        <Grid
            container
            direction={"column"}
            spacing={2}
        >
            <Grid item xs={12}>
                <TextField 
                    fullWidth
                    id="cut-lengths-input"
                    label="Enter each measurement to cut"
                    multiline
                    value={cutLengthsInput}
                    placeholder="Enter every length you need to cut separated by commas or spaces"
                    onChange={e => setCutLengthsInput(e.target.value)}
                />
            </Grid>
            <Grid item>
                <Grid
                    container
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"flex-end"}
                    spacing={2}
                >
                    <Grid item>
                        <Button 
                            variant={"contained"}
                            size={"large"}
                            startIcon={<CarpenterIcon />}
                            onClick={handleClickGo}
                        >Go</Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

MeasurementsForm.propTypes = {
    getProjectPlans: Function
}

export default MeasurementsForm