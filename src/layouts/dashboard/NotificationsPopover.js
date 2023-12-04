// NotificationsPopover.js
import React, { useEffect } from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import io from "socket.io-client"
import { CancelOutlined } from '@mui/icons-material';

const NotificationsPopover = ({ anchorEl, open, onClose }) => {


    const {loading,notification,error}=useSelector((state)=>state.notificationData)
    const {socket}=useSelector((state)=>state.socketData)


   const generateColor=(type)=>{
    if(type=="Update"){
      return '3px solid #968570'

    }else if(type=="Add"){
      return '3px solid #ada8a5'

    }
    else if(type=="Enable"){
      return '3px solid #4f4cb0'
    }
    else if(type=="Disable"){
      return ' 3px solid #F56416'
    }
    else{
      return '3px solid #EA7383'
    }
   }  
   const generateColorBackground=(type)=>{
    if(type=="Update"){
      return '#f6ddbd'

    }else if(type=="Add"){
      return '#e7e8ec'

    }
    else if(type=="Enable"){
      return '#e9eff9'
    }
    else if(type=="Disable"){
      return '#ECCF93 '
    }
    else{
      return '#E8A7AF'
    }

   }
   const dispatch=useDispatch()

useEffect(()=>{
  console.log(socket)
  if(socket!==null){
    socket.on('getProducts', (updatedProducts) => {
      // setProducts(updatedProducts);
      dispatch({ type: "LOAD_NOTIFICATION_SUCCESS", payload: updatedProducts });
    });
  }

},[socket])

const removeNotification=(product)=>{
  socket.emit("deleteNotification",product)

}
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <List style={{overflowY:'auto',height:'400px',width:'400px'}}>
        {/* {JSON.stringify(notification)} */}
        {notification!==null && notification.length>0 && notification.map((notification, index) => (
          
          <ListItem key={index} button>
            
            <ListItemText primary={  
               <div className=''
                style={{display:'flex',flexDirection:'row', 
                border:generateColor(notification.actionType),
                padding:"3px",
                background:generateColorBackground(notification.actionType),
                borderRadius:"6px"
                }} >
                <div>
               {notification.image_url && <img
                  src={notification.image_url}
                  alt={notification.title}
                  style={{ width: '50px', height: '50px', margin: '10px' }}
                />}
                </div>
                <div >
                  <Typography variant="body1" className="product-id" style={{paddingTop:"20px"}}>
                   {notification.actionType} <b>{  notification.title?notification.title:notification.id}</b>
                  </Typography>
               
                 
                </div>
                <div style={{marginLeft:'150px'}}>
                  <span  onClick={()=>removeNotification(notification)}>
                  <CancelOutlined/>
                  </span>
              
                </div>
              </div>} />
          </ListItem>
        ))}
      </List>
    </Popover>
  );
};

export default NotificationsPopover;
