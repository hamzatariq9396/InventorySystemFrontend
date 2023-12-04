import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card, CardContent
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactTable from './ReactTable';
import { del, get, post, put } from 'src/api/routes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from "react-toastify";
import io from "socket.io-client"
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { styled } from '@mui/system';
const style ={
  container: {
    marginTop: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap:'5px',
  },
  formControl: {
    minWidth: 100,
  },
  accordion: {
    border: '1px solid lightgray',

  },
  badgeDanger: {
    backgroundColor: " #FFE7E7",
    color: "#F93232",
    textAlign: "center",
    borderRadius: "32px",
    width: "100px",
    padding: " 5px 0"
  },

  badgePlan: {
    backgroundColor: " #F5E5D7 ",
    color: "#F29546",
    textAlign: "center",
    borderRadius: " 32px",
    width: "100px",
    padding: "5px 0",
  }
};

const initialState = {
  TITLE: "",
  PRICE: "",
  CATEGORY: "",
  DESCRIPTION: "",
  IMAGE_URL: ""
}
const socket = io.connect("http://localhost:8080");
const AddProductPage = () => {


  const [feildState, setFeildState] = useState(initialState)
  const [tableState, setTableState] = useState([])
  const [isEdit, setIsEdit] = useState(
    {
      ID: "",
      edit: false
    }
  )

  const [loading,setLoading]=useState(false)
const dispatch=useDispatch()

  const [deleteModal, setDeleteModal] = useState({
    ID: "",
    MODAL: false,
    TITLE:"",
    PRICE:"",
    IMAGE_URL:""
  })

  const handleInputChange = (event) => {

    setFeildState({ ...feildState, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
setLoading(true)
    event.preventDefault();
    const data = {
      title: feildState.TITLE,
      price: feildState.PRICE,
      category: feildState.CATEGORY,
      description: feildState.DESCRIPTION,
      image_url: feildState.IMAGE_URL,
      status: "active"
    }

    const result = await post(`${process.env.BACKEND_URL}product/new`, data)
    if (result.status === 200) {
      data.actionType="Add"
      data.date= new Date()
      socket.emit('addProduct', data )
       setLoading(false)
      prepareTableData()
      setFeildState(initialState)

      return toast.success(result.message)
    } else {
      setLoading(false)
      return toast.error(result.message)
    }
  };

  const cols = React.useMemo(
    () => [
      {
        Header: "Sr.No",
        accessor: "SR",
      },

      {
        Header: "title",
        accessor: "col_title",
      },
      {
        Header: "price",
        accessor: "col_price",
      },
      {
        Header: "description",
        accessor: "col_description",
      },
      {
        Header: "category",
        accessor: "col_category",
      },
      {
        Header: "status",
        accessor: "col_status",
      },
      {
        Header: "image",
        accessor: "col_image_url",
      },

      {
        Header: "Action",
        accessor: "col_actions",
      }


    ],

  );
  useEffect(() => { prepareTableData() }, [])

  const handleEdit = async (
    title,
    price,
    description,
    category,
    status,
    image_url,
    id
  ) => {
    setIsEdit({ ID: id, edit: true })
    setFeildState({
      TITLE: title,
      PRICE: price,
      DESCRIPTION: description,
      CATEGORY: category,
      STATUS: status,
      IMAGE_URL: image_url,
    })

    window.scrollTo({ top: 50, left: 0, behavior: "smooth" });
  };
  const handleUpdateSubmit = async (event) => {

    event.preventDefault();
    const data = {
      title: feildState.TITLE,
      price: feildState.PRICE,
      category: feildState.CATEGORY,
      description: feildState.DESCRIPTION,
      image_url: feildState.IMAGE_URL,
      status: "active"
    }
 setLoading(true)
    const result = await put(`${process.env.BACKEND_URL}/product/${isEdit.ID}`, data)

    if (result.status === 200) {
      data.id=isEdit.ID
      data.actionType="Update"
      data.date= new Date()
      socket.emit('updateProduct', data )
      prepareTableData()
 setLoading(false)
      setFeildState(initialState)
      setIsEdit({ ID: "", edit: false })
      return toast.success(result.message)
    } else {
      setLoading(false)
      return toast.error(result.message)
    }

  };
  const handleDel = async (id,title,price,image_url) => {
    setDeleteModal({ MODAL: true, ID: id,TITLE:title,PRICE:price,IMAGE_URL:image_url })
  }
  const handleEnable = async (id,title,price,image_url) => {

    event.preventDefault();
    const data = {
      status: "active"
    }
setLoading(true)
    const result = await put(`${process.env.BACKEND_URL}/product/${id}`, data)
    if (result.status === 200) {
      data.id=id
      data.title=title
      data.price=price
      data.image_url=image_url
      data.actionType="Enable",
      data.date= new Date()
      socket.emit('updateProduct', data )
      prepareTableData()
setLoading(false)
      // setFeildState(initialState)
      return toast.success(result.message)
    } else {
      setLoading(false)
      return toast.error(result.message)
    }


    // Add your logic to submit the form data to the server

    // Add your API call or state management logic here
  };
  const handleDisable = async (id,title,price,image_url) => {

    event.preventDefault();
    const data = {
      status: "disable"
    }
setLoading(true)
    const result = await put(`${process.env.BACKEND_URL}/product/${id}`, data)
    if (result.status === 200) {
      data.id=id
      data.title=title
      data.price=price
      data.image_url=image_url
      data.actionType="Disable"
      data.date= new Date()
      socket.emit('updateProduct', data )
      prepareTableData()
setLoading(false)
      // setFeildState(initialState)
      return toast.success(result.message)
    } else {
      setLoading(false)
      return toast.error(result.message)
    }


    // Add your logic to submit the form data to the server

    // Add your API call or state management logic here
  };
  const prepareTableData = async () => {

    let response =
      await get(`${process.env.BACKEND_URL}/products`)
    if (response.status == 200) {
      let data = [];

      response.products.forEach((element, i) => {
        const prorataBadgeClass1 =
          element.status === "active" ? style.badgePlan : element.status === "disable" ? style.badgeDanger : "";
        data.push({
          SR: i + 1,
          id: element._id,
          col_title: element.title,
          col_price: element.price,
          col_description: element.description,
          col_category: element.category,
          col_status: <div style={`${prorataBadgeClass1}`}>{element.status}</div>,
          col_image_url: <div style={{ width: '80px', height: '50px' }}>
            <img
              src={element.image_url}
              alt="Small Image"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>,


          col_actions: (
            <div style={{ whiteSpace: "nowrap" }}>

              <>
                <a
                  className="text-dark p-0"
                  onClick={() =>
                    handleEdit(
                      element.title,
                      element.price,
                      element.description,
                      element.category,
                      element.status,
                      element.image_url,
                      element._id,
                    )
                  }
                >
                  <EditIcon fontSize="small" 
                  color='primary'
                   style={{ fontSize: "18px" }} />

                  {/* <i className="fa fa-edit"></i> */}
                  {/* <Image src={Edit}></Image> */}
                </a>
                &nbsp;
              </>


              <>
                <a
                  className="text-danger p-0"
                  onClick={() => handleDel(element._id,element.title,element.price,element.image_url)}
                >
                  <DeleteIcon style={{ color: "red", fontSize: "18px" }} />
                  {/* <i className="fa fa-trash"></i> */}
                  {/* <Image src={Trash}></Image> */}
                </a>
                &nbsp;
              </>


              {element.status == "active" &&
                <>
                  <a
                    className="text-warning p-0"

                    onClick={() => handleDisable(element._id,element.title,element.price,element.image_url)}

                  >
                    <BlockIcon color='warning' style={{ fontSize: "18px" }} />
                    {/* <i className="fa fa-ban"></i> */}
                    {/* <Image src={Disable}></Image> */}
                  </a>
                  &nbsp;
                </>}


              {element.status !== "active" &&
                <a
                  className="text-success p-0"
                  disabled={element.status === "active"}
                  onClick={() => handleEnable(element._id,element.title,element.price,element.image_url)}

                >
                  <CheckCircleIcon style={{ fontSize: "18px" }} color='success' />

                  {/* <Image src={Enable}></Image> */}
                </a>}

            </div>
          ),
        });
      });
      setTableState(data);
    }
    else {
      setTableState([])
    }

  };
  const deleteProduct = async () => {
    setLoading(true)
    const result = await del(`${process.env.BACKEND_URL}/product/${deleteModal.ID}`)
    if (result.status === 200) {
      let data={}
      data.id=deleteModal.ID,
      data.title=deleteModal.TITLE,
      data.price=deleteModal.PRICE
      data.actionType="Delete"
      data.date= new Date()
      socket.emit('updateProduct', data )
      prepareTableData()
        setLoading(false)            
      setFeildState(initialState)
      setDeleteModal({ ID: "", MODAL: false })
      return toast.success(result.message)
    } else {
      setLoading(false)
      return toast.error(result.message)
    }
  }

 

  useEffect(() => {
    const socket = io(`${process.env.BACKEND_URL_SOCKET}`); // Replace with your server URL
    dispatch({ type: "LOAD_SOCKET_SUCCESS", payload: socket });
    // Listen for socket events
    socket.on('getProducts', (updatedProducts) => {
      // setProducts(updatedProducts);
      dispatch({ type: "LOAD_NOTIFICATION_SUCCESS", payload: updatedProducts });
    });

    // Cleanup socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []); 


if(loading){
  return <>
  <Loader/>
  </>
}

  return (
    <>
      <div style={{ display: "flex", flexDirection: 'column', width: "80%" }}>
        <div style={{ marginBottom: "30px" }} >

          <Typography 
          variant="h4" 
          align="center"
           gutterBottom>
            Enter the product Details
          </Typography>

          <form style={style.form} 
          onSubmit={isEdit.edit == true ? handleUpdateSubmit : handleSubmit}>
            <TextField
              label="Product Name"
              // variant="outlined"
              name='TITLE'
              value={feildState.TITLE}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Amount"
              // variant="outlined"
              type="number"
              name='PRICE'
              value={feildState.PRICE}
              onChange={handleInputChange}
              required
            />
            <FormControl style={style.formControl}>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name='CATEGORY'
                value={feildState.CATEGORY}
                onChange={handleInputChange}
                // label="Category"
                required
              >
                <MenuItem value="Electronics">Electronics</MenuItem>
                <MenuItem value="Clothing">Clothing</MenuItem>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
            <TextField
              label="Description"

              multiline
              rows={4}
              name='DESCRIPTION'
              value={feildState.DESCRIPTION}
              onChange={handleInputChange}
              required
            />
            <TextField
              label="Image URL"

              name='IMAGE_URL'
              value={feildState.IMAGE_URL}
              onChange={handleInputChange}
              required
            />
            <Button type="submit"
             variant="contained"
              color="primary">
              {isEdit.edit === true ? "Update product" : "Add Product"}
            </Button>
          </form>

        </div>
        <Accordion style={style.accordion}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" 
            align="center" gutterBottom>
              Tab To view The Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>

            <div style={{ padding: '40px', background: '#ffff' }}>
              <ReactTable columns={cols} 
              data={tableState} />
            </div>

          </AccordionDetails>
        </Accordion>



      </div>


      <Dialog open={deleteModal.MODAL} >
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal({ MODAL: false, ID: "" })} color="primary">
            Cancel
          </Button>
          <Button color="primary" autoFocus onClick={() => deleteProduct()}>
            OK
          </Button>
        </DialogActions>
      </Dialog>


    </>

  );
};

export default AddProductPage;
