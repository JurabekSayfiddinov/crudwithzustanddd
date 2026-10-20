import React, { useEffect, useState } from 'react'
import { useData } from './store/zustand'
import { Button, CircularProgress, TablePagination, TextField } from '@mui/material'
import AddDialog from './components/AddDialog'
import EditDialog from './components/EditDialog'

const App = () => {
  let {data,loading,get,deleteUser}=useData()
    const [editOpen, setEditOpen] = useState(false)
const [selectedUser, setSelectedUser] = useState(null)
  const [open, setOpen] = useState(false);
    let [page, setPage] = useState(0)
    let [rowsPerPage, setRowsPerPage] = useState(5)
  let [search,setSearch]=useState('')
  useEffect(()=>{
    let timer=setTimeout(() => {
      get(search)
    }, 800);
    return ()=>{
      clearTimeout(timer)
    }

  },[search])

    let handleAdd = () => {
    setSelectedUser(null);
    setOpen(true);
  };

  let  handleEdit = (user) => {
    setSelectedUser(user);
    setEditOpen(true);
  };
   let handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  let  handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  let paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )
  return (
    <>
        <TextField size='small' label="Search..." onChange={(e)=>setSearch(e.target.value)}/>
          <Button onClick={handleAdd}>Add User</Button>
    <div>
      {loading ? <CircularProgress enableTrackSlot size="3rem" aria-label="Loading…" /> : paginatedData.map((e)=>(
        <div>
       <img width={100} style={{borderRadius:'50%'}} src={e.avatar} alt="" />
       <h2>{e.fullname}</h2>
       <p>{e.age}</p>
       <p>{e.job}</p>
       <p>{e.status?"Online":"Offline"}</p>
       <Button onClick={()=>deleteUser(e.id)}>Delete</Button>
        <Button onClick={() => handleEdit(e)}>
         Edit
          </Button>
        </div>
      ))}
    </div>
      <AddDialog
        open={open}
        setOpen={setOpen}
        selectedUser={selectedUser}
      />
          <EditDialog
  open={editOpen}
  setOpen={setEditOpen}
  user={selectedUser}
/>
  <TablePagination
        component="div"
        count={data.length}
        page={Math.min(
          page,
          Math.max(0, Math.ceil(data.length / rowsPerPage) - 1)
        )}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15, 20]}
      />

    </>
  )
}

export default App