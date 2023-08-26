import { Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Gear, HCircle, InfoCircle, Bullseye, PlusCircle } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Eye } from "react-bootstrap-icons/dist";

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }}  placement="left-start"/>
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(14),
      border: '1px solid #dadde9',
    },
  }));

function RouteManagement(props) {

    const navigate = useNavigate();




    const newIssuerSetup = (
        <>
            <CardHeader title="New Route Setup"></CardHeader>
            <CardContent md={{p:4}}>
            <Grid container item={true} spacing={2}>
            <Grid xs={12} item={true} sm={4}>
                
                <Button  component={Link} to="/routemanagement/addnewroute" fullWidth className="button-1 large-button" variant="contained">
                <HtmlTooltip title={<span>Add New Route: Click this button to add new Route</span>}><InfoCircle className="btnTooltip" color="#fff" size={20}/></HtmlTooltip>
                    <PlusCircle size={40}/>
                    <div>Add New Route</div>
                </Button>
                </Grid>
                <Grid xs={12} item={true} sm={4}>
                <Button component={Link} to="/issuermanagement/managecontent" fullWidth className="button-1 large-button" variant="contained">
                <HtmlTooltip title={<span>Update Route: Click this button to update Route</span>}><InfoCircle className="btnTooltip" color="#fff" size={20}/></HtmlTooltip>

                    <Gear size={40}/>
                    <div>Update Route</div>
                </Button>
                </Grid>

                <Grid xs={12} item={true} sm={4}>
                <Button component={Link} to="/issuermanagement/providermanagement" fullWidth className="button-1 large-button" variant="contained">
                <HtmlTooltip title={<span>View Routes: Click this button to View Route List</span>}><InfoCircle className="btnTooltip" color="#fff" size={20}/></HtmlTooltip>

                    <Eye size={40}/>
                    <div>View Route List</div>
                </Button>
                </Grid>
                
                </Grid>
            </CardContent>
        </>
    )



    const handleEditSubmit = () => {
        navigate("/healthadminplan/planbenefits")
    }

    return (
        <div className="pageWrapper">
            <div className="pageHeader">
                <h2>Route Management</h2>
            </div>
            
            <Card sx={{ mt: 2 }} className="tilesButton">{newIssuerSetup}</Card>


        </div>
    );
}

export default RouteManagement;