import React, { EventHandler, FormEvent, useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { trpc } from "../../utils/trpc";

const UserProfileInfoCard: React.FC<{
  userName: string;
  userEmail: string;
}> = ({ userName, userEmail }) => {
  const [openPw, setOpenPw] = useState(false);
  const [openEp, setOpenEp] = useState(false);
  const selfId = localStorage.getItem("token");
  if (typeof selfId === 'undefined' || selfId === null) {}
  const getUserProfileAPI = trpc.user.getUserProfile.useQuery({
    token: selfId as string
  },{
    staleTime: Infinity
  });
  
  const [newUserName, setNewUserName] = useState("");
  const [newDegree, setNewDegree] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAbout, setNewAbout] = useState("");
  const [newDOB, setNewDOB] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updateUserPasswordAPI: any = trpc.user.updateUserPassword.useMutation()
  const updateUserProfileAPI: any = trpc.user.updateUserProfile.useMutation()

  useEffect(() => {
    if (getUserProfileAPI.isSuccess) {
      const userInfo: any =  getUserProfileAPI.data
      setNewUserName(userInfo.name);
      setNewDegree(userInfo.degree);
      setNewPhone(userInfo.phone);
      setNewAbout(userInfo.aboutMe);
      setNewDOB(userInfo.dob.split("T")[0]);
      setNewStatus(userInfo.status);
    }
  }, [getUserProfileAPI.isSuccess, openEp, openPw, updateUserProfileAPI.isSuccess])

  const handleEditProfile = () => {
    setOpenEp(true);
  };

  const handleEditPassword = () => {
    setOpenPw(true);
  };

  const handleClosePw = () => {
    setOpenPw(false);
  };

  const handleCloseEp = () => {
    setOpenEp(false);
  };

  const handleSavePw: EventHandler<FormEvent> = useCallback((e) => {
    e.preventDefault();

    updateUserPasswordAPI.mutate({
      token: selfId,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    }, {
      onSuccess: () => {
        handleClosePw();
      },
      onError: (err: any) => {
        alert(err);
      }
    })
  }, [newPassword, confirmPassword])


  const handleSaveEp: EventHandler<FormEvent> = useCallback((e) => {
    e.preventDefault();

    updateUserProfileAPI.mutate({
      token: selfId,
      name: newUserName,
      degree: newDegree,
      phone: newPhone,
      aboutMe: newAbout,
      status: newStatus,
      dob: newDOB
    }, {
      onSuccess: () => {
        handleCloseEp();
      },
      onError: (err: any) => {
        alert(err);
      }
    })
  }, [newUserName, newDegree, newPhone, newAbout, newDOB, newStatus])
      
  return (
    <>
        <img className="mt-[40px] w-40 h-40 rounded-full"
        src={getUserProfileAPI.data?.profileImg}
        alt="Rounded avatar" />
      <p
        className="not-italic font-semibold leading-9
                     lg:mt-[22px] lg:text-[40px]
                     md:mt-[13.5px] md:text-[22.5px]"
      >
        {userName}
      </p>
      <p
        className="not-italic font-normal leading-[22px] opacity-70 pb-2
                      lg:mt-[22px] lg:text-[20px]
                      md:mt-[13.5px] md:text-[11.25px]"
      >
        {userEmail}
      </p>
      <hr
        className="border-1 border-black w-[80%] opacity-30
                      lg:my-4"
      />
      <div className="flex flex-row items-center justify-between py-2">
        <p
          className="not-italic font-normal leading-[19px] tracking-[-0.02em]
                       text-[20px] pr-[10px]"
        >
          Edit Profile
        </p>
        <button
          type="button" onClick={handleEditProfile}     
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 lg:w-5 lg:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </div>
      <hr
        className="border-1 border-black w-[80%] opacity-30
                      lg:my-4"
      />
      <div className="flex flex-row items-center justify-between pt-2">
        <p
          className="not-italic font-normal leading-[19px] tracking-[-0.02em]
                       text-[20px] pr-[10px]"
        >
          Edit Password
        </p>
        <button type="button" onClick={handleEditPassword}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 lg:w-5 lg:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </button>
      </div>
      
      {/* Password Edit Popup */}
      <Dialog open={openPw} onClose={handleClosePw}>
        <DialogTitle>Edit Password</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleClosePw}>
            Cancel
          </Button>
          <Button color="info" onClick={handleSavePw}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* User Profile Edit Popup */}
      <Dialog open={openEp} onClose={handleCloseEp}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="User Name"
            type="text"
            fullWidth
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="DOB"
            type="date"
            fullWidth
            value={newDOB}
            onChange={(e) => setNewDOB(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Degree"
            type="text"
            fullWidth
            value={newDegree}
            onChange={(e) => setNewDegree(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Phone"
            type="text"
            fullWidth
            defaultValue={newPhone}
            onChange={(e) => setNewPhone(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Bio"
            type="text"
            fullWidth
            value={newAbout}
            onChange={(e) => setNewAbout(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Status"
            type="text"
            fullWidth
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={handleCloseEp}>
            Cancel
          </Button>
          <Button color="info" onClick={handleSaveEp}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserProfileInfoCard;
