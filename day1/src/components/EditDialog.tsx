import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox
} from "@mui/material"

import { useData } from "../store/zustand"

const EditDialog = ({ open, setOpen, user }) => {
  const { editUser } = useData()

  const [fullname, setFullname] = useState("")
  const [avatar, setAvatar] = useState("")
  const [age, setAge] = useState("")
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (user) {
      setFullname(user.fullname)
      setAvatar(user.avatar)
      setAge(user.age)
      setStatus(user.status)
    }
  }, [user])

  const handleEdit = async (e) => {
    e.preventDefault()

    const updatedUser = {
      fullname,
      avatar,
      age: Number(age),
      status
    }

    const success = await editUser(user.id, updatedUser)

    if (success) {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <form onSubmit={handleEdit}>
        <DialogTitle>Edit User</DialogTitle>

        <DialogContent>
          <TextField
            label="Fullname"
            fullWidth
            margin="dense"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />

          <TextField
            label="Avatar"
            fullWidth
            margin="dense"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />

          <TextField
            label="Age"
            type="number"
            fullWidth
            margin="dense"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <FormControlLabel
            label="Active"
            control={
              <Checkbox
                checked={status}
                onChange={(e) => setStatus(e.target.checked)}
              />
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default EditDialog