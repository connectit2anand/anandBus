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

function BusManagement(props) {

    const navigate = useNavigate();




    const newIssuerSetup = (
        <>
            <CardHeader title="New Bus Setup"></CardHeader>
            <CardContent md={{p:4}}>
            <Grid container item={true} spacing={2}>
            <Grid xs={12} item={true} sm={4}>
                
                <Button  component={Link} to="/busmanagement/addnewbus" fullWidth className="button-1 large-button" variant="contained">
                <HtmlTooltip title={<span>Add New Bus: Click this button to add new Bus</span>}><InfoCircle className="btnTooltip" color="#fff" size={20}/></HtmlTooltip>
                    <PlusCircle size={40}/>
                    <div>Add New Bus</div>
                </Button>
                </Grid>
                <Grid xs={12} item={true} sm={4}>
                <Button component={Link} to="/issuermanagement/managecontent" fullWidth className="button-1 large-button" variant="contained">
                <HtmlTooltip title={<span>Update Bus: Click this button to update Bus</span>}><InfoCircle className="btnTooltip" color="#fff" size={20}/></HtmlTooltip>

                    <Gear size={40}/>
                    <div>Update Bus</div>
                </Button>
                </Grid>

                <Grid xs={12} item={true} sm={4}>
                <Button component={Link} to="/issuermanagement/providermanagement" fullWidth className="button-1 large-button" variant="contained">
                <HtmlTooltip title={<span>Manage Provider: Click this button to <br/>Upload Provider List<br/>Configure List</span>}><InfoCircle className="btnTooltip" color="#fff" size={20}/></HtmlTooltip>

                    <Eye size={40}/>
                    <div>View Bus List</div>
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
                <h2>Bus Management</h2>
            </div>
            
            <Card sx={{ mt: 2 }} className="tilesButton">{newIssuerSetup}</Card>


        </div>
    );
}

export default BusManagement;