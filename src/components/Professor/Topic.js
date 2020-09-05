import  React from React
import Typography from '@material-ui/core/Typography';
export const topic = (props)=>(
        <div>
            <Typography variant="h4">
                    { props.name }
            </Typography>                
        </div>
)