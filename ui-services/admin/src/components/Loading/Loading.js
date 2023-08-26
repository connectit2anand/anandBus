import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";

function Loading(props) {
    
    // const [open, setOpen] = useState(false);
    // const handleClose = () => {
    //   setOpen(false);
    // };
 

    return ( 
        <>
       <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={props.open}
  //onClick={handleClose}
>
  <CircularProgress color="inherit" />
        <div>Loading ...</div>
</Backdrop>
        </>
     );
}

export default Loading;